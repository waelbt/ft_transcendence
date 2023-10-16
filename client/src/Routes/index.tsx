import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from '../Pages/Registration';
import Confirmation from '../Pages/Confirmation';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration/>
    },
    {
        path: '/Confirm',
        element: <Confirmation/>
    }
]);


// path: "/",
// lazy: async () => {
//   let { Login } = await import("../Components/Login");
//   return { Component: Login };
// },

export default function AllRoutes() {
    return (<RouterProvider router={router} />);
}
