import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import useBuyer from '../Hooks/useBuyer';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const BuyerRoute = ({ children }) => {

    const { user, loading, logOut } = useContext(AuthContext);
    const [isBuyer] = useBuyer(user.uid)
    const navigate = useNavigate();

    if (loading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (user && isBuyer) {
        return children;
    }
    else {
        toast.error('You Are Not Buyer User');
        logOut();
        navigate('/login');
    }
};

export default BuyerRoute;