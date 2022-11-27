import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AllBuyers = () => {
    const [buyerDetails, setBuyerDetails] = useState({});
    let closeModalBtn = document.getElementById('modal-close');
    const closeMOdal = () => {
        closeModalBtn.click();
    }
    const { data: allBuyers = [], refetch } = useQuery({
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
                    // logOut();
                }
            })
    })

    const handleUserDelete = (userID) => {
        axios.delete(`http://localhost:5000/buyers/${userID}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(function () {
                refetch();
                closeMOdal();
                toast.success('Buyer Deleted')
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });
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
                            <th>Index</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <div>
                        <input type="checkbox" id="sellerdeleteConferm-modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <label id="modal-close" htmlFor="sellerdeleteConferm-modal" type="button" className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Close modal</span>
                                </label>
                                <div className="p-6 text-center">
                                    <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this buyer?</h3>
                                    <button onClick={() => handleUserDelete(buyerDetails.uid)} htmlFor="sellerdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                    <label htmlFor="sellerdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <tbody>
                        <tr className={(allBuyers.length <= 0) ? ' ' : 'hidden'}>
                            <th colSpan="4" className='py-10'>
                                <p className='text-center text-xl text-gray-400'>No Seller Details</p>
                            </th>
                        </tr>
                        {allBuyers.map((buyer, index) =>
                            <>
                                <tr>
                                    <th>
                                        {index + 1}
                                    </th>
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
                                        <label onClick={() => setBuyerDetails(buyer)} htmlFor="sellerdeleteConferm-modal" className="btn btn-error btn-xs text-white">Delete</label>
                                    </th>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyers;