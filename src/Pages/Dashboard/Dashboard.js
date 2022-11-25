import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();
    const navigateDashboardRoute = () => {
        navigate('/dashboard/my-order')
        console.log('hello')
    }
    useEffect(() => {
        navigateDashboardRoute();
    });
};

export default Dashboard;