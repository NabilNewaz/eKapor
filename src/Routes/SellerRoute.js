import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const SellerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isSeller, isSellerLoading] = useSeller(user.uid)
    const [isBuyer] = useBuyer(user.uid)
    const [isAdmin] = useAdmin(user.uid)
    const navigate = useNavigate();

    if (loading || isSellerLoading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (user && isSeller) {
        return children;
    }
    else {
        if (isBuyer) {
            navigate('/dashboard/my-order')
        }
        if (isAdmin) {
            navigate('/dashboard/all-buyers')
        }
    }
};

export default SellerRoute;