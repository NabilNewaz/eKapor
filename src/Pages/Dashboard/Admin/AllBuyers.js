import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/Authprovider/Authprovider';

const AllBuyers = () => {
    const { logOut } = useContext(AuthContext);
    const { data: allBuyers = [] } = useQuery({
        queryKey: ['buyers'],
        queryFn: () => axios
            .get(`http://localhost:5000/buyers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.data)
            .catch(function (error) {
                console.log(error.response.status);
                if (error.response.status === 401 || error.response.status === 403) {
                    toast.error('Token Invalid! Login Again')
                    logOut();
                }
            })
    })

    const handleUserDelete = (userID) => {
        console.log(userID)
    }

    return (
        <div className='pt-2 px-2'>
            <div>
                <p className='text-2xl uppercase font-semibold'>All Buyers</p>
                <p className='mb-4 uppercase text-sm'>manage your buyers from here</p>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBuyers.map(buyer =>
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="rounded-full w-12 h-12">
                                                <img src={(buyer.img) ? buyer.img : 'https://i.ibb.co/X2xMzwL/defultuser.png'} alt=" " />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{buyer.displayName}</div>
                                            <div className="text-sm opacity-50">{buyer.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {buyer.phone ? buyer.phone : 'XXXXXXXXXX'}
                                </td>
                                <td>{buyer.location ? buyer.location : 'Not Set Yet'}</td>
                                <th>
                                    <button onClick={() => handleUserDelete(buyer.uid)} className="btn btn-error btn-xs text-white">Delete</button>
                                </th>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;