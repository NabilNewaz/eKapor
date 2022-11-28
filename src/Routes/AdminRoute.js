import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import useAdmin from '../Hooks/useAdmin';
import useBuyer from '../Hooks/useBuyer';
import useSeller from '../Hooks/useSeller';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const AdminRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isaAminLoading] = useAdmin(user.uid)
    const [isBuyer] = useBuyer(user.uid)
    const [isSeller] = useSeller(user.uid)


    const navigate = useNavigate();

    if (loading || isaAminLoading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (user && isAdmin) {
        return children;
    }
    else {
        if (isBuyer) {
            navigate('/dashboard/my-order');
        }
        if (isSeller) {
            navigate('/dashboard/add-product')
        }
    }
};

export default AdminRoute;