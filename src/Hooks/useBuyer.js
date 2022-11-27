import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useBuyer = uid => {
    const { data: userData = [] } = useQuery({
        queryKey: ['users'],
        queryFn: () => axios
            .get(`http://localhost:5000/users`, {
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
        return [true];
    }
    else {
        return [false];
    }
};

export default useBuyer;