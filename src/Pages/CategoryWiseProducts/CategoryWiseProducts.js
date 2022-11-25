import React from 'react';
import { useLoaderData } from 'react-router-dom';

const CategoryWiseProducts = () => {
    const CategoryDetails = useLoaderData();

    return (
        <div className='px-2'>
            <div className='mb-5'>
                <h1 className='text-2xl font-semibold uppercase'>Products For</h1>
                <h1 className='font-bold text-3xl uppercase'>{CategoryDetails[0].category_name}</h1>
                <p>{CategoryDetails[0].category_discription}</p>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-3'>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-base-200">Book Now</button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-base-200">Book Now</button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://placeimg.com/200/280/arch" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-base-200">Book Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryWiseProducts;