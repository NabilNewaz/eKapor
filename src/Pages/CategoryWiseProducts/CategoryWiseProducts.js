import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { MdVerified } from "react-icons/md";
import axios from 'axios';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import toast from 'react-hot-toast';

const CategoryWiseProducts = () => {
    const { logOut } = useContext(AuthContext);
    const CategoryDetails = useLoaderData();
    const { data: products = [] } = useQuery({
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
            <div className='mb-8'>
                <h1 className='text-2xl font-semibold uppercase'>Products For</h1>
                <h1 className='font-bold text-3xl uppercase'>{CategoryDetails[0].category_name}</h1>
                <p>{CategoryDetails[0].category_discription}</p>
            </div>
            <div className={(products.length <= 0) ? 'block' : 'hidden'}>
                <p className='text-2xl font-semibold text-center text-slate-400 py-56'>No Products Found</p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3'>
                {products.map(product =>
                    <>
                        <div className="card bg-base-100 shadow-xl">
                            <figure><img className='w-64 rounded-xl' src={product.product_img} alt=" " /></figure>
                            <div className="card-body">
                                <p className='grow-0 text-sm'>{new Date(parseInt(product.product_postTime)).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <h2 className="card-title text-3xl">{product.product_name}</h2>
                                <div className='flex flex-col gap-0'>
                                    <p className='grow-0 font-bold text-xl mb-2 mt-2'><span className='font-semibold'>Resell Price: </span>{product.product_resellPrice}</p>
                                    <p className='grow-0'><span>Original Price: </span>{product.product_originalPrice}</p>
                                    <p className='grow-0'><span>Use Time: </span>{product.product_useTime}</p>
                                    <p className='grow-0'><span>Location: </span>{product.product_location}</p>
                                    <p className='grow-0 flex items-center'><span className='mr-1'>Seller: </span>{(product?.seller_details[0]?.displayName) ? product?.seller_details[0]?.displayName : 'No Seller Details'}<span className={(product?.seller_details[0]?.isVerified) ? 'block' : 'hidden'}><MdVerified className='ml-1 text-blue-600' /></span></p>
                                </div>
                                <div className="card-actions justify-end mt-5">
                                    <button className="btn btn-base-200 w-full">Book Now</button>
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