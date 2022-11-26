import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 lg:bg-transparent text-base-content gap-2">
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/my-order'>My Orders</NavLink></li>
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/add-product'>Add Product</NavLink></li>
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/my-products'>My Products</NavLink></li>
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/my-buyers'>My Buyers</NavLink></li>
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/all-buyers'>All Buyers</NavLink></li>
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/all-sellers'>All Sellers</NavLink></li>
                        <li className="bg-base-300 rounded-lg"><NavLink to='/dashboard/reported-items'>Reported Items</NavLink></li>
                    </ul>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;