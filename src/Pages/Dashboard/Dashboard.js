import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useSeller from '../../Hooks/useSeller';
import { Helmet } from 'react-helmet-async';


const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.uid)
    const [isSeller] = useSeller(user.uid)
    const [isBuyer] = useBuyer(user.uid)
    const navigateBuyerRoute = () => {
        navigate('/dashboard/my-order')
    }
    const navigateSellerRoute = () => {
        navigate('/dashboard/add-product')
    }
    const navigateAdminRoute = () => {
        navigate('/dashboard/all-buyers')
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            isBuyer && navigateBuyerRoute();
            isSeller && navigateSellerRoute();
            isAdmin && navigateAdminRoute();
        }, 50);
        return () => clearTimeout(timer);
    });
    <div>
        <Helmet>
            <title>Dashboard - eKapor</title>
        </Helmet>
    </div>
};

export default Dashboard;