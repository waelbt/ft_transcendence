import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import ProfileCompletion from './pages/ProfileCompletion';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />
    },
    {
        path: '/Confirm',
        element: <ProfileCompletion />
    },
    {
        path: '*',
        element: <div>not found</div>
    }
]);

// path: "/",
// lazy: async () => {
//   let { Login } = await import("../Components/Login");
//   return { Component: Login };
// },

export default function AllRoutes() {
    return <RouterProvider router={router} />;
}
