import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main"
import CategoryWiseProducts from "../Pages/CategoryWiseProducts/CategoryWiseProducts";
import AddProduct from "../Pages/Dashboard/Sellers/AddProduct";
import MyBuyers from "../Pages/Dashboard/Sellers/MyBuyers";
import MyOrder from "../Pages/Dashboard/Buyers/MyOrderd";
import MyProducts from "../Pages/Dashboard/Sellers/MyProducts";
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers";
import AllSeller from "../Pages/Dashboard/Admin/AllSeller";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems";
import Dashboard from "../Pages/Dashboard/Dashboard";

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
                loader: ({ params }) => fetch(`http://localhost:5000/categories?category_id=${params.id}`),
                element: <PrivateRoute><CategoryWiseProducts></CategoryWiseProducts></PrivateRoute>
            },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/my-order',
                element: <MyOrder></MyOrder>
            },
            {
                path: '/dashboard/add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/my-products',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/my-buyers',
                element: <MyBuyers></MyBuyers>
            },
            {
                path: '/dashboard/all-buyers',
                element: <AllBuyers></AllBuyers>
            },
            {
                path: '/dashboard/all-sellers',
                element: <AllSeller></AllSeller>
            },
            {
                path: '/dashboard/reported-items',
                element: <ReportedItems></ReportedItems>
            }
        ]
    }
])

export default router;