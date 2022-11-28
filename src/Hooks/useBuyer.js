import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBuyer = uid => {
    const { data: userData = [], isLoading: isBuyerLoading } = useQuery({
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
    if (userData.role === 'buyer') {
        return [true, isBuyerLoading];
    }
    else {
        return [false, isBuyerLoading];
    }
};

export default useBuyer;