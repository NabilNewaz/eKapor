import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/Authprovider/Authprovider';
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";

const AllSeller = () => {
    const { logOut } = useContext(AuthContext);
    const { data: allSellers = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => axios
            .get(`http://localhost:5000/sellers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.data)
            .catch(function (error) {
                console.log(error.response.status);
                if (error.response.status === 401 || error.response.status === 403) {
                    logOut();
                    toast.error('Token Invalid! Login Again')
                }
            })
    })

    const handleUserDelete = (userID) => {
        axios.delete(`http://localhost:5000/sellers/${userID}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(function () {
                refetch();
                toast.success('Seller Deleted')
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });
    }

    const handleUserVerify = (userID) => {
        axios.patch(`http://localhost:5000/verify-seller/${userID}`, {
            isVerified: true
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(function () {
                refetch();
                toast.success('Seller Verified')
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });
    }

    return (
        <div className='pt-2 px-2'>
            <div>
                <p className='text-2xl uppercase font-semibold'>All Sellers</p>
                <p className='mb-4 uppercase text-sm'>manage your sellers from here</p>
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
                        <tr className={(allSellers.length <= 0) ? ' ' : 'hidden'}>
                            <th colSpan="4" className='py-10'>
                                <p className='text-center text-xl text-gray-400'>No Seller Details</p>
                            </th>
                        </tr>
                        {allSellers.map(seller =>
                            <tr>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="rounded-full w-12 h-12">
                                                <img src={(seller.img) ? seller.img : 'https://i.ibb.co/X2xMzwL/defultuser.png'} alt=" " />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold flex items-center">{seller.displayName} <span className={(seller?.isVerified) ? 'block' : 'hidden'}><MdVerified className='ml-1 text-blue-600' /></span> <span className={(seller?.isVerified) ? 'hidden' : 'block'}><GoUnverified className='ml-1 text-amber-500' /></span></div>
                                            <div className="text-sm opacity-50">{seller.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {seller.phone ? seller.phone : 'XXXXXXXXXX'}
                                </td>
                                <td>{seller.location ? seller.location : 'Not Set Yet'}</td>
                                <th>
                                    <button disabled={seller.isVerified ? 'disabled' : null} onClick={() => handleUserVerify(seller.uid)} className='btn btn-error btn-xs text-white'>{(seller?.isVerified) ? 'Verified' : 'Verify'}</button>
                                    <button onClick={() => handleUserDelete(seller.uid)} className="btn btn-error btn-xs text-white ml-2">Delete</button>
                                </th>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;