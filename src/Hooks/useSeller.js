import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useSeller = uid => {
    const { data: userData = [], isLoading: isSellerLoading } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios
            .get(`https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/users`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.data)
            .catch(function (error) {
                console.log(error)
            })
    })
    if (userData.role === 'seller') {
        return [true, isSellerLoading];
    }
    else {
        return [false, isSellerLoading];
    }
};

export default useSeller;