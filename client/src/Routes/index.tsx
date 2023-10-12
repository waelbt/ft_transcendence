import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from '../Components/Registration';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Registration/>
    }
]);


export default function AllRoutes() {
    return (<RouterProvider router={router} />);
}
