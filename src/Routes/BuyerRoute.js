import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const BuyerRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isBuyer, isBuyerLoading] = useBuyer(user.uid)
    const [isAdmin] = useAdmin(user.uid)
    const [isSeller] = useSeller(user.uid)
    const navigate = useNavigate();

    if (loading || isBuyerLoading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (user && isBuyer) {
        return children;
    }
    else {
        if (isAdmin) {
            navigate('/dashboard/all-buyers')
        }
        if (isSeller) {
            navigate('/dashboard/add-product')
        }
    }
};

export default BuyerRoute;