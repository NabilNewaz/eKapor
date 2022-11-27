import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Authprovider/Authprovider';
import useAdmin from '../Hooks/useAdmin';
import Spinner from '../Pages/Shared/Spinner/Spinner';

const AdminRoute = ({ children }) => {

    const { user, loading, logOut } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user.uid)
    const navigate = useNavigate();

    if (loading) {
        return <div className="text-center">
            <Spinner />
        </div>
    }

    if (user && isAdmin) {
        return children;
    }
    else {
        toast.error('You Are Not Admin User');
        logOut();
        navigate('/login');
    }
};

export default AdminRoute;