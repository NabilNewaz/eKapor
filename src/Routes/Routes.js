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
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import BuyerRoute from "./BuyerRoute";
import Blogs from "../Pages/Blogs/Blogs";
import Notfound from "../Pages/Notfound/Notfound";

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
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/category/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/categories?category_id=${params.id}`),
                element: <PrivateRoute><CategoryWiseProducts></CategoryWiseProducts></PrivateRoute>
            },
            {
                path: "*",
                element: <Notfound></Notfound>
            }
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
                element: <BuyerRoute><MyOrder></MyOrder></BuyerRoute>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path: '/dashboard/my-products',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/my-buyers',
                element: <SellerRoute><MyBuyers></MyBuyers></SellerRoute>
            },
            {
                path: '/dashboard/all-buyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/all-sellers',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/reported-items',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: "*",
                element: <Notfound></Notfound>
            }
        ]
    }
])

export default router;