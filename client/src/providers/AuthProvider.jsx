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

  const authInfo = {
    user,
    role,
    setRole,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}
