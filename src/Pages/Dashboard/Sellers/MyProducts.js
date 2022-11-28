import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Helmet } from 'react-helmet-async';

const MyProducts = () => {
    const [productDetails, setPeoductDetails] = useState({});
    let isAdvertised;
    let closeDeleteModalBtn = document.getElementById('delete-modal-close');
    const closeDeleteModal = () => {
        closeDeleteModalBtn.click();
    }
    let closeAdvertiseModalBtn = document.getElementById('advertise-modal-close');
    const closeAdvertiseModal = () => {
        closeAdvertiseModalBtn.click();
    }
    const { data: myproducts = [], refetch } = useQuery({
        queryKey: ['my-products'],
        queryFn: () => axios
            .get(`http://localhost:5000/my-products`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.data)
            .catch(function (error) {
                console.log(error.response.status);
            })
    })


    const handleProductDelete = (productID) => {
        axios.delete(`http://localhost:5000/product/${productID}`,
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(function () {
                refetch();
                closeDeleteModal()
                toast.success('Product Deleted')
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });
    }
    let msg;
    const handleAdvertiseData = (productID, prodactAdvertised) => {
        if (prodactAdvertised) {
            isAdvertised = false;
            msg = 'Unadvertised'
        }
        else {
            isAdvertised = true;
            msg = 'Advertised'
        }
        axios.patch(`http://localhost:5000/peoduct-advertise/${productID}`, {
            isAdvertised: isAdvertised
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(function () {
                refetch();
                closeAdvertiseModal();
                toast.success(`Product ${msg}`)
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });
    }

    return (
        <PhotoProvider>
            <div className='pt-2 px-2'>
                <Helmet>
                    <title>My Products - Seller Dashboard - eKapor</title>
                </Helmet>
                <div>
                    <p className='text-2xl uppercase font-semibold'>my product</p>
                    <p className='mb-4 uppercase text-sm'>sell all of your product for sell</p>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Product Name</th>
                                <th>Status</th>
                                <th>Resell Price</th>
                                <th>Original Price</th>
                                <th>User Time</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <div>
                            <input type="checkbox" id="productdeleteConferm-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <label id="delete-modal-close" htmlFor="productdeleteConferm-modal" type="button" className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </label>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                        <button onClick={() => handleProductDelete(productDetails._id)} htmlFor="productdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <label htmlFor="productdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" id="productadvertiseConferm-modal" className="modal-toggle" />
                            <div className="modal">
                                <div className="modal-box">
                                    <label id="advertise-modal-close" htmlFor="productadvertiseConferm-modal" type="button" className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </label>
                                    <div className="p-6 text-center">
                                        <svg aria-hidden="true" className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to advertise this product?</h3>
                                        <button onClick={() => handleAdvertiseData(productDetails._id, productDetails?.isAdvertised)} htmlFor="productdeleteConferm-modal" data-modal-toggle="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                            Yes, I'm sure
                                        </button>
                                        <label htmlFor="productadvertiseConferm-modal" data-modal-toggle="popup-modal" type="button" className="cursor-pointer text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <tbody>
                            <tr className={(myproducts.length <= 0) ? '' : 'hidden'}>
                                <th colSpan="8" className='py-10'>
                                    <p className='text-center text-xl text-gray-400'>No Products Details</p>
                                </th>
                            </tr>
                            {myproducts.map((product, index) =>
                                <>
                                    <tr>
                                        <th>
                                            {index + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <PhotoView key={index} src={product.product_img}>
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={product.product_img} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </PhotoView>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.product_name}</div>
                                                    <div className="text-sm opacity-50">{new Date(parseInt(product.product_postTime)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={(!product.isBooked) ? 'badge badge-success text-white badge-sm' : 'hidden'}>Available</span>
                                            <span className={(product.isBooked && !product.bookedData?.isPayment) ? 'badge badge-sm' : 'hidden'}>Booked</span>
                                            <span className={(product.bookedData?.isPayment) ? 'badge badge-error text-white badge-sm' : 'hidden'}>Sold</span>
                                            <br />
                                            <span className={(!product.isBooked) ? 'hidden' : ' '}><span className='uppercase text-sm text-gray-600'>By <span>{product.bookedData?.userName}</span></span></span>
                                        </td>
                                        <td>{product.product_resellPrice}</td>
                                        <td>{product.product_originalPrice}</td>
                                        <td>{product.product_useTime}</td>
                                        <td>{product.product_location}</td>
                                        <th>
                                            <th>
                                                <label onClick={() => setPeoductDetails(product)} htmlFor="productadvertiseConferm-modal" disabled={product.isBooked ? 'disabled' : null} className={product?.isAdvertised ? 'btn badge-warning btn-xs text-white' : 'btn badge-info btn-xs text-white'}>{(product?.isAdvertised) ? 'unavertised' : 'advertise'}</label>
                                                <label onClick={() => setPeoductDetails(product)} htmlFor="productdeleteConferm-modal" className="btn btn-error btn-xs text-white ml-2">Delete</label>
                                            </th>
                                        </th>
                                    </tr>
                                </>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </PhotoProvider>
    );
};

export default MyProducts;