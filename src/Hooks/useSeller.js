import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useSeller = uid => {
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
    if (userData.role === 'seller') {
        return [true];
    }
    else {
        return [false];
    }
};

export default useSeller;