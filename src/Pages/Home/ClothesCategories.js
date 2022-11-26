import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Shared/Spinner/Spinner';

const ClothesCategories = () => {

    const { isLoading, data: categories = [] } = useQuery({
        queryKey: ['categories'],
        meta: { headers: { authorization: `Bearer ${localStorage.getItem('token')}` } },
        queryFn: () => fetch('http://localhost:5000/categories')
            .then(res => res.json())
    })

    return (
        <div className='px-2 mt-8 mx-auto'>
            <div className='mb-3'>
                <h1 className='text-3xl uppercase font-bold'>Clothes Categories</h1>
                <p className='text-md'>Find Your Needed Clothes From Categories</p>
            </div>
            <div className={isLoading ? 'block' : 'hidden'}>
                <Spinner></Spinner>
            </div>
            <div className='grid gap-3 lg:grid-cols-4 md:grid-cols-2'>
                {categories.map(category =>
                    <>
                        <Link to={`/category/${category._id}`}>
                            <div className="card bg-base-100 shadow-xl">
                                <figure><img src={category?.category_img} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {category.category_name}
                                        <div className={(category?.category_arrive === 'new' ? 'block badge badge-secondary' : 'hidden')}>NEW</div>
                                    </h2>
                                    <p>{category?.category_discription}</p>
                                    <div className="card-actions justify-end">
                                        {category?.category_uses.map(use =>
                                            <div className="badge badge-outline">{use}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </>
                )}
            </div >
        </div >
    );
};

export default ClothesCategories;