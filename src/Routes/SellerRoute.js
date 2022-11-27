import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import useSeller from '../Hooks/useSeller';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const SellerRoute = ({ children }) => {

    const { user, loading, logOut } = useContext(AuthContext);
    const [isSeller] = useSeller(user.uid)
    const navigate = useNavigate();

    if (loading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (user && isSeller) {
        return children;
    }
    else {
        toast.error('You Are Not Seller User');
        logOut();
        navigate('/login');
    }
};

export default SellerRoute;