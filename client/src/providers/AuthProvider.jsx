import React, { createContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL
    }).then(() => {
      // Update state user profile properties
      setUser({ ...auth.currentUser });
    });
  };

  // Monitor auth state changes and manage JWT + Role handshakes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // 1. Fetch JWT token
          const jwtRes = await axios.post('http://localhost:5000/jwt', {
            email: currentUser.email
          });
          if (jwtRes.data.token) {
            localStorage.setItem('access-token', jwtRes.data.token);
          }

          // 2. Fetch User Database Role
          const roleRes = await axios.get(`http://localhost:5000/users/role/${currentUser.email}`);
          if (roleRes.data.role) {
            setRole(roleRes.data.role);
          } else {
            setRole('student');
          }
        } catch (error) {
          console.error("JWT or Role Handshake failed:", error);
          setRole('student');
        }
      } else {
        localStorage.removeItem('access-token');
        setRole('student');
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sync active persona role changes to localStorage for headers authentication
  useEffect(() => {
    if (role) {
      localStorage.setItem('active-role', role.toLowerCase());
    }
  }, [role]);

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`skilledin-profile-${user.email}`);
      setProfileData(saved ? JSON.parse(saved) : {});
    } else {
      setProfileData({});
    }
  }, [user]);

  const updateProfileData = (newData) => {
    if (user?.email) {
      const updated = { ...profileData, ...newData };
      setProfileData(updated);
      localStorage.setItem(`skilledin-profile-${user.email}`, JSON.stringify(updated));
    }
  };

  const getProfileCompletion = () => {
    let score = 0;
    
    // Personal Details (60%)
    if (profileData.name || user?.displayName) score += 15;
    if (profileData.phone) score += 20;
    if (profileData.additionalEmail) score += 15;
    if (profileData.avatar || user?.photoURL) score += 10;
    
    // Academic History (20%)
    if (Array.isArray(profileData.academicHistory) && profileData.academicHistory.length > 0) {
      const hasAcademic = profileData.academicHistory.some(item => item.institution || item.degree);
      if (hasAcademic) score += 20;
    }
    
    // Professional Profiles (20%)
    if (profileData.currentJob || (Array.isArray(profileData.skills) && profileData.skills.length > 0) || profileData.bio) {
      score += 20;
    }
    
    return score;
  };

  const profileCompletion = getProfileCompletion();

  const authInfo = {
    user,
    role,
    setRole,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    profileData,
    updateProfileData,
    profileCompletion
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
