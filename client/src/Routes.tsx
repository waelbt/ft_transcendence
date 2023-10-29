import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from './pages/Auth';
import Confirmation from './pages/ProfileCompletion';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration />
    },
    {
        path: '/Confirm',
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
