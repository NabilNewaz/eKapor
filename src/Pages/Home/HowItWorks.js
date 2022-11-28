import React from 'react';
import { FaUserAlt, FaPencilAlt } from "react-icons/fa";
import { AiTwotoneSound } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const HowItWorks = () => {
    return (
        <div className='px-2 mt-8 mx-auto'>
            <div className='mb-3'>
                <h1 className='text-3xl uppercase font-bold'>How it Works</h1>
                <p className='text-md'>How Our System Works</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <div className='text-6xl text-gray-700'><FaUserAlt /></div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl text-gray-700">Create Account</h2>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <div className='text-6xl text-gray-700'><FaPencilAlt /></div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl text-gray-700">Post Your Ad</h2>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <div className='text-6xl text-gray-700'><AiTwotoneSound /></div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl text-gray-700">Get Offers</h2>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <div className='text-6xl text-gray-700'><RiMoneyDollarCircleFill /></div>
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xl text-gray-700">Sell Your Item</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;