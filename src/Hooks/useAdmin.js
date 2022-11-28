import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useAdmin = uid => {
    const { data: userData = [], isLoading: isaAminLoading } = useQuery({
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
    if (userData.role === 'admin') {
        return [true, isaAminLoading];
    }
    else {
        return [false, isaAminLoading];
    }
};

export default useAdmin;