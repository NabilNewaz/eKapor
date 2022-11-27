import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import useAdmin from '../../Hooks/useAdmin';
import useBuyer from '../../Hooks/useBuyer';
import useSeller from '../../Hooks/useSeller';

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
        isBuyer && navigateBuyerRoute();
        isSeller && navigateSellerRoute();
        isAdmin && navigateAdminRoute();
    });
};

export default Dashboard;