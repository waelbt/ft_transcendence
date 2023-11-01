import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './pages/Auth';
import ProfileCompletion from './pages/ProfileCompletion';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Auth />
    },
    {
        path: '/',
        children: [
            {
                path: '/Confirm',
                element: <ProfileCompletion />
            },
            {
                path: '/Home',
                element: <div>div</div>
            }
        ]
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
