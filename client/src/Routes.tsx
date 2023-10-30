import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import Confirmation from './pages/ProfileCompletion';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />
    },
    {
        path: '/Confirm',
        element: <Confirmation />
    }
    {
        path: '*',
        element: <Confirmation />
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
