import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Contexts/Authprovider/Authprovider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);

    const imageHostKey = process.env.REACT_APP_imgbb_Key;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;

        const formData = new FormData()
        const image = form.productImage.files[0]
        formData.append("image", image)
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        const fetchImgData = async () => await fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imagedata => {
                if (imagedata.success) {
                    const productname = form.productName.value;
                    const productprice = form.productPrice.value;
                    const productoriginalprice = form.productoriginalPrice.value;
                    const productcondition = form.productCondition.value;
                    const usetime = form.useTime.value;
                    const mobilenumber = form.mobileNumber.value;
                    const location = form.location.value;
                    const productcategory = form.productCategory.value;
                    const description = form.description.value;

                    axios.post(`http://localhost:5000/add-product`, {
                        "product_category": productcategory,
                        "product_name": productname,
                        "product_img": imagedata.data.url,
                        "product_resellPrice": productprice,
                        "product_originalPrice": productoriginalprice,
                        "product_condition": productcondition,
                        "product_useTime": usetime,
                        "product_mobilenumber": mobilenumber,
                        "product_location": location,
                        "product_description": description,
                        "product_sellerID": user.uid,
                        "product_postTime": new Date().getTime()
                    },
                        {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    )
                        .then(function () {
                            toast.success('Product Added Successfully')
                        })
                        .catch(function () {
                            toast.error('Something Went Wrong')
                        });
                }

            })
        fetchImgData(() => { })

    }

    const { data: catagorisName = [] } = useQuery({
        queryKey: ['products'],
        queryFn: () => axios
            .get(`http://localhost:5000/categories-name`)
            .then((res) => res.data)
            .catch(function (error) {
                toast.error('Something Went To Worng');
            })
    })

    return (
        <div className='pt-2 px-2'>
            <div>
                <p className='text-2xl uppercase font-semibold'>Add product</p>
                <p className='mb-4 uppercase text-sm'>add your new items for sell</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='gap-3 lg:flex'>
                    <div className='w-full'>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Name</span>
                            </label>
                            <input name='productName' type="productName" required placeholder="Enter Product Name" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Selling Price</span>
                            </label>
                            <input name='productPrice' type="productPrice" required placeholder="Enter Product Selling Price" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Original Price</span>
                            </label>
                            <input name='productoriginalPrice' type="productPrice" required placeholder="Enter Product Original Price" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Condition Type</span>
                            </label>
                            <select required id="productCondition" name='productCondition' className="select select-bordered">
                                <option value={'excellent'} selected>Excellent</option>
                                <option value={'good'}>Good</option>
                                <option value={'fair'}>Fair</option>
                            </select>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Year Of Uses</span>
                            </label>
                            <input name='useTime' id='useTime' type="location" required placeholder="Enter Year Of Uses" className="input input-bordered w-full" />
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Mobile Mumber</span>
                            </label>
                            <input name='mobileNumber' type="mobileNumber" required placeholder="Enter Mobile Number" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input name='location' type="location" required placeholder="Enter Location" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Category</span>
                            </label>
                            <select required id="productCategory" name='productCategory' className="select select-bordered">
                                {catagorisName.map(catagoryName =>
                                    <option value={catagoryName._id}>{catagoryName.category_name}</option>
                                )}
                            </select>
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Product Image</span>
                            </label>
                            <input name='productImage' type="file" required placeholder="Enter Mobile Number" className="input pt-2 input-bordered w-full" />
                        </div>
                        <div className="form-control w-full ">
                            <label className="label">
                                <span className="label-text font-semibold">Description</span>
                            </label>
                            <input name='description' required id='description' type="text" placeholder="Type here" className="input input-bordered w-full" />
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <button type="submit" className="btn w-full  bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;