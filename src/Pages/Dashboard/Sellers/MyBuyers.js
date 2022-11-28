import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const MyBuyers = () => {
    const { data: mybuyer = [] } = useQuery({
        queryKey: ['my-buyers'],
        queryFn: () => axios
            .get(`http://localhost:5000/my-buyers`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then((res) => res.data)
            .catch(function (error) {
                console.log(error.response.status);
            })
    })
    return (
        <PhotoProvider>
            <div className='pt-2 px-2'>
                <Helmet>
                    <title>My Buyer - Seller Dashboard - eKapor</title>
                </Helmet>
                <div>
                    <p className='text-2xl uppercase font-semibold'>my Buyers</p>
                    <p className='mb-4 uppercase text-sm'>sew all of your buyers for product</p>
                </div>
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Index</th>
                                <th>Buyer Name</th>
                                <th>item purchased</th>
                                <th>Status</th>
                                <th>meeting Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={(mybuyer.length <= 0) ? '' : 'hidden'}>
                                <th colSpan="5" className='py-10'>
                                    <p className='text-center text-xl text-gray-400'>No Products Details</p>
                                </th>
                            </tr>
                            {mybuyer.map((product, index) =>
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
                                                            <img src={product?.bookedData?.userImg} alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </PhotoView>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product?.bookedData?.userName}</div>
                                                    <div className="text-sm opacity-50">{product?.bookedData?.userEmail}</div>
                                                    <div className="text-sm opacity-50">{product?.bookedData?.userPhoneNumber}</div>
                                                </div>
                                            </div>
                                        </td>
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
                                                    <div className="text-sm opacity-50">Resell Price: {product.product_resellPrice}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={(!product.isBooked) ? 'badge badge-success text-white badge-sm' : 'hidden'}>Available</span>
                                            <span className={(product.isBooked && !product.bookedData?.isPayment) ? 'badge badge-sm' : 'hidden'}>Booked</span>
                                            <span className={(product.bookedData?.isPayment) ? 'badge badge-error text-white badge-sm' : 'hidden'}>Sold</span>
                                        </td>
                                        <td>{product?.bookedData?.meetingLocation}</td>
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

export default MyBuyers;