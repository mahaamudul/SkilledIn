import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import Home from '../pages/Home';
import AllClasses from '../pages/AllClasses';
import ClassDetails from '../pages/ClassDetails';
import Teach from '../pages/Teach';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/dashboard/Profile';
import MyEnroll from '../pages/dashboard/MyEnroll';
import MyEnrollDetails from '../pages/dashboard/MyEnrollDetails';
import MyOrders from '../pages/dashboard/MyOrders';
import AddClass from '../pages/dashboard/teacher/AddClass';
import MyClasses from '../pages/dashboard/teacher/MyClasses';
import ClassProgress from '../pages/dashboard/teacher/ClassProgress';
import TeacherRequests from '../pages/dashboard/admin/TeacherRequests';
import UsersManagement from '../pages/dashboard/admin/UsersManagement';
import AllClassesAudit from '../pages/dashboard/admin/AllClassesAudit';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  // Public Routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'all-classes', element: <AllClasses /> },
      { path: 'class/:id', element: <ClassDetails /> },
      { path: 'teach', element: <Teach /> },
    ],
  },
  // Standalone Auth Routes (without main header/footer)
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  // Dashboard / Private Routes
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: 'profile', element: <Profile /> },
      { path: 'my-enroll', element: <MyEnroll /> },
      { path: 'myenroll-class/:id', element: <MyEnrollDetails /> },
      { path: 'my-orders', element: <MyOrders /> },
      { path: 'add-class', element: <AddClass /> },
      { path: 'my-classes', element: <MyClasses /> },
      { path: 'my-class/:id', element: <ClassProgress /> },
      { path: 'admin/teacher-requests', element: <TeacherRequests /> },
      { path: 'admin/users', element: <UsersManagement /> },
      { path: 'admin/all-classes', element: <AllClassesAudit /> },
    ],
  },
  // Catch-All 404 Route
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
