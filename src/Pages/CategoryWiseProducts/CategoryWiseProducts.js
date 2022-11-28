import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { MdVerified } from "react-icons/md";
import axios from 'axios';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import toast from 'react-hot-toast';
import { IoCall } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const CategoryWiseProducts = () => {
    const { logOut } = useContext(AuthContext);
    const [productDetails, setPeoductDetails] = useState({});
    let closeModalBtn = document.getElementById('modal-close');
    const closeMOdal = () => {
        closeModalBtn.click();
    }
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
                console.log(error.response.status);
                if (error.response.status === 401 || error.response.status === 403) {
                    logOut();
                    toast.error('Token Invalid! Login Again')
                }
            })
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const userID = userData.uid;
        const userImg = userData.img;
        const userName = form.userName.value;
        const userEmail = form.userMail.value;
        const userPhoneNumber = form.userPhoneNumber.value;
        const meetingLocation = form.meetingLocation.value;

        const bookedData = {
            userID: userID,
            userName: userName,
            userEmail: userEmail,
            userPhoneNumber: userPhoneNumber,
            userImg: userImg,
            meetingLocation: meetingLocation,
            bookedTime: new Date().getTime(),
            isPayment: false
        }

        axios.patch(`http://localhost:5000/product-booked/${productDetails._id}`, {
            isBooked: true,
            bookedData
        },
            {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
            .then(function () {
                refetch();
                toast.success('Product Booked')
            })
            .catch(function () {
                toast.error('Something Went Wrong')
            });

        console.log(bookedData);
        closeMOdal();
    }

    const CategoryDetails = useLoaderData();
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', CategoryDetails[0]._id],
        queryFn: () => axios
            .get(`http://localhost:5000/products/${CategoryDetails[0]._id}`, {
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

    return (
        <div className='px-2'>
            <Helmet>
                <title>{CategoryDetails[0].category_name} Category - eKapor</title>
            </Helmet>
            <div className='mb-8'>
                <h1 className='text-2xl font-semibold uppercase'>Products For</h1>
                <h1 className='font-bold text-3xl uppercase'>{CategoryDetails[0].category_name}</h1>
                <p>{CategoryDetails[0].category_discription}</p>
            </div>
            <div className={(products.length <= 0) ? 'block' : 'hidden'}>
                <p className='text-2xl font-semibold text-center text-slate-400 py-56'>No Products Found</p>
            </div>
            <div>
                <input type="checkbox" id="booknow-modal" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box">
                        <label id="modal-close" htmlFor="booknow-modal" type="button" className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </label>
                        <form onSubmit={handleSubmit}>
                            <p className='bg-gray-800 px-2 py-1 text-white font-semibold w-fit rounded-lg'>Product Details</p>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text font-semibold">Product Name</span>
                                </label>
                                <input name='productName' value={productDetails.product_name} disabled type="productName" required className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text font-semibold">Product Selling Price</span>
                                </label>
                                <input name='productPrice' disabled value={productDetails.product_resellPrice} type="productPrice" required className="input input-bordered w-full" />
                            </div>
                            <p className='bg-gray-800 px-2 py-1 text-white font-semibold w-fit rounded-lg mt-5'>User Details</p>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text font-semibold">User Name</span>
                                </label>
                                <input name='userName' value={userData.displayName} disabled type="productName" required className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text font-semibold">User Mail</span>
                                </label>
                                <input name='userMail' disabled value={userData.email} type="productPrice" required className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text font-semibold">User Phone</span>
                                </label>
                                <input name='userPhoneNumber' type="text" defaultValue={userData?.phoneNumber} required placeholder='Your Phone Number' className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text font-semibold">Meeting Location</span>
                                </label>
                                <input name='meetingLocation' type="text" defaultValue={userData?.userLocation} placeholder='Meeting Location' required className="input input-bordered w-full" />
                            </div>
                            <div className='mt-3'>
                                <button type="submit" className="btn w-full bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3'>
                {products.map(product =>
                    <>
                        <div className="card bg-base-100 shadow-xl">
                            <figure className='h-96'><img className='w-64 rounded-xl' src={product.product_img} alt=" " /></figure>
                            <div className="card-body">
                                <div className='flex justify-between'>
                                    <p className='grow-0 text-sm'>{new Date(parseInt(product.product_postTime)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <a href={`tel:${product?.product_mobilenumber}`}><button className="btn btn-success btn-xs flex text-white items-center"><span className='mr-1'><IoCall /></span>Call Now</button></a>
                                </div>
                                <h2 className="card-title text-3xl">{product.product_name}</h2>
                                <div className='flex flex-col gap-0'>
                                    <p className='grow-0 font-bold text-xl mb-2 mt-2'><span className='font-semibold'>Resell Price: </span>{product.product_resellPrice}</p>
                                    <p className='grow-0'><span>Original Price: </span>{product.product_originalPrice}</p>
                                    <p className='grow-0'><span>Use Time: </span>{product.product_useTime}</p>
                                    <p className='grow-0'><span>Location: </span>{product.product_location}</p>
                                    <p className='grow-0 flex items-center'><span className='mr-1'>Seller: </span>{(product?.seller_details[0]?.displayName) ? product?.seller_details[0]?.displayName : 'No Seller Details'}<span className={(product?.seller_details[0]?.isVerified) ? 'block' : 'hidden'}><MdVerified className='ml-1 text-blue-600' /></span></p>
                                    <p className='grow-0'><span>Description: </span>{product.product_description ? product.product_description : 'No Description Added'}</p>

                                </div>
                                <div className='mt-1 flex justify-end'>
                                    <button className="btn btn-xs btn-ghost btn-active flex items-center"><span className='text-lg'><MdReport /></span>Reported Item</button>
                                </div>
                                <div className="card-actions justify-end">
                                    <label onClick={() => setPeoductDetails(product)} htmlFor="booknow-modal" className="btn btn-base-200 w-full">Book Now</label>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryWiseProducts;