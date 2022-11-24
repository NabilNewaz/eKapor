import { createBrowserRouter } from "react-router-dom"
import Main from "../Layout/Main"
import CategoryWiseProducts from "../Pages/CategoryWiseProducts/CategoryWiseProducts";
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><CategoryWiseProducts></CategoryWiseProducts></PrivateRoute>
            }
        ]
    }
])

export default router;