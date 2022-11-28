import React, { useContext, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper";
import "swiper/css/bundle";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MdVerified } from "react-icons/md";
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import toast from 'react-hot-toast';

const AdvertiseSection = () => {
    const { user } = useContext(AuthContext);
    const [productDetails, setPeoductDetails] = useState({});
    let closeModalBtn = document.getElementById('modal-close');
    const closeMOdal = () => {
        closeModalBtn.click();
    }
    const { data: advertiseProducts = [], refetch } = useQuery({
        queryKey: ['sellers'],
        queryFn: () => axios
            .get(`http://localhost:5000/advertise-product`)
            .then((res) => res.data)
            .catch(function (error) {
                console.log(error.response.status);
            })
    })

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
                    // toast.error('Token Invalid! Login Again')
                }
            })
    })

    const hadelUserNotLogin = () => {
        if (!user) {
            closeMOdal();
            toast.error('Login First');
        }
    }

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
        closeMOdal();
    }

    return (
        <div className='px-2 mx-auto'>
            <div className={advertiseProducts.length <= 0 ? 'hidden' : 'mb-3'}>
                <h1 className='text-3xl uppercase font-bold mt-8'>Advertise Products</h1>
                <p className='text-md'>Find Your Needed Clothes From Those</p>
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
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={13}
                    freeMode={true}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                    }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[FreeMode, Autoplay]}
                    className="mySwiper"
                >
                    {advertiseProducts.map(advertiseProduct =>
                        <div>
                            <SwiperSlide>
                                <div className="card w-90 bg-base-100 shadow-xl image-full">
                                    <figure><img src={advertiseProduct.product_img} alt="Shoes" /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title text-2xl">{advertiseProduct.product_name}</h2>
                                        <p className='grow-0 font-bold text-lg mb-2 mt-2'><span className='font-semibold'>Resell Price: </span>{advertiseProduct.product_resellPrice}</p>
                                        <p className='grow-0'><span>Original Price: </span>{advertiseProduct.product_originalPrice}</p>
                                        <p className='grow-0'><span>Use Time: </span>{advertiseProduct.product_useTime}</p>
                                        <p className='grow-0'><span>Location: </span>{advertiseProduct.product_location}</p>
                                        <p className='grow-0 flex items-center'><span className='mr-1'>Seller: </span>{(advertiseProduct?.seller_details[0]?.displayName) ? advertiseProduct?.seller_details[0]?.displayName : 'No Seller Details'}<span className={(advertiseProduct?.seller_details[0]?.isVerified) ? 'block' : 'hidden'}><MdVerified className='ml-1 text-white' /></span></p>
                                        <p className='grow-0'><span>Description: </span>{advertiseProduct.product_description ? advertiseProduct.product_description : 'No Description Added'}</p>
                                        <div className="card-actions justify-end">
                                            <label onClick={() => { setPeoductDetails(advertiseProduct); hadelUserNotLogin() }} htmlFor="booknow-modal" className="btn btn-primary">Book Now</label>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default AdvertiseSection;