import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from '../Components/Registration';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration/>
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
