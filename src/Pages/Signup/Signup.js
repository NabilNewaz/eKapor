import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Authprovider/Authprovider';
import { Helmet } from 'react-helmet-async';

const Signup = () => {
    const [checked, setChecked] = useState(false);
    const { providerLogin, createUser, updateUserProfile, errorMsgToast, setLoading, logOut } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                const currentUser = {
                    uid: user.uid
                }
                fetch('https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('token', data.token);
                        const userData = {
                            uid: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                            img: user.photoURL,
                            role: 'buyer',
                            isVerified: false
                        }
                        fetch('https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/create-user', {
                            method: 'POST',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`,
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        })
                            .then((response) => {
                                if (response.status === 401 || response.status === 403) {
                                    logOut();
                                    toast.error('Token Invalid! Login Again')
                                }
                                return response.json();
                            })
                            .then(data => {
                                toast.success('Successfully Sign In')
                                navigate(from, { replace: true });
                            })
                    })
            })
            .catch(error => errorMsgToast(error));
    }

    const handleGithubSignIn = () => {
        providerLogin(githubProvider)
            .then(result => {
                const user = result.user;
                const currentUser = {
                    uid: user.uid
                }
                fetch('https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('token', data.token);
                        const userData = {
                            uid: user.uid,
                            displayName: user.displayName,
                            email: user.email,
                            img: user.photoURL,
                            role: 'buyer',
                            isVerified: false
                        }
                        fetch('https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/create-user', {
                            method: 'POST',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`,
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(userData)
                        })
                            .then((response) => {
                                if (response.status === 401 || response.status === 403) {
                                    logOut();
                                    toast.error('Token Invalid! Login Again')
                                }
                                return response.json();
                            })
                            .then(data => {
                                toast.success('Successfully Sign In')
                                navigate(from, { replace: true });
                            })
                    })
            })
            .catch(error => errorMsgToast(error));
    }

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const fullName = form.fullname.value;
        const userRole = form.userrole.value;
        const email = form.email.value;
        const password = form.password.value;
        const rePassword = form.repassword.value;

        if (password !== rePassword) {
            toast.error("Your Password Doesn't Match!")
        }
        else {
            createUser(email, password)
                .then(result => {
                    const user = result.user;
                    form.reset();
                    const currentUser = {
                        uid: user.uid
                    }
                    fetch('https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(currentUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            handleUpdateUserProfile(fullName);
                            localStorage.setItem('token', data.token);
                            console.log(user.displayName);
                            const userData = {
                                uid: user.uid,
                                displayName: fullName,
                                email: user.email,
                                img: user.photoURL,
                                role: userRole,
                                isVerified: false
                            }
                            fetch('https://b612-used-products-resale-server-side-nabil-newaz.vercel.app/create-user', {
                                method: 'POST',
                                headers: {
                                    authorization: `Bearer ${localStorage.getItem('token')}`,
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(userData)
                            })
                                .then((response) => {
                                    if (response.status === 401 || response.status === 403) {
                                        logOut();
                                        toast.error('Token Invalid! Login Again')
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    toast.success('Successfully Sign In')
                                    navigate(from, { replace: true });
                                })
                        })
                })
                .catch(error => errorMsgToast(error));
        }
    }

    const handleUpdateUserProfile = (name) => {
        const profile = {
            displayName: name,
        }
        updateUserProfile(profile)
            .then(() => {
                setLoading(false);
            })
            .catch(error => errorMsgToast(error));
    }

    return (
        <div className='px-2 md:px-0'>
            <Helmet>
                <title>Sign Up - eKapor</title>
            </Helmet>
            <h1 className='text-3xl text-center font-semibold uppercase'>Signup</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Full Name</span>
                    </label>
                    <input id="fullname" name='fullname' required type="text" placeholder="Enter Your Name" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Your Email</span>
                    </label>
                    <input type="text" id="email2" name='email' required placeholder="name@gmail.com" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Your Password</span>
                    </label>
                    <input type="text" id="password" name='password' required placeholder="************" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Repeat Password</span>
                    </label>
                    <input type="text" id="repassword" name='repassword' required placeholder="************" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full mx-auto max-w-md">
                    <label className="label">
                        <span className="label-text font-semibold">Select Your Role</span>
                    </label>
                    <select required id="userrole" name='userrole' className="select select-bordered">
                        <option value={'buyer'} selected>Buyer</option>
                        <option value={'seller'}>Seller</option>
                    </select>
                </div>
                <div className="form-control  mx-auto max-w-md mt-3">
                    <label className="flex items-center cursor-pointer">
                        <input required type="checkbox" onChange={() => checked ? setChecked(false) : setChecked(true)} name='agreeterms' className="checkbox" /><span className="label-text ml-2">I agree with the <Link to='/' className='font-bold'>terms and conditions</Link></span>
                    </label>
                </div>
                <div className='mt-3 flex justify-center'>
                    <button disabled={!checked} type="submit" className="btn w-full max-w-md bg-base-300 hover:bg-base-content hover:text-base-200 btn-ghost">signup</button>
                </div>
            </form>
            <div className='max-w-md mx-auto'>
                <hr className='border mt-3 border-base-300'></hr>
                <p className='text-1xl font-semibold text-center mt-2 text-gray-400'>OR SignUP With</p>
                <hr className='border mt-2 border-base-300'></hr>
            </div>
            <div className='flex mt-3 max-w-md mx-auto'>
                <button onClick={handleGoogleSignIn} type="button" className="text-white flex justify-center w-full bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
                    <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Sign up with Google
                </button>
                <button onClick={handleGithubSignIn} type="button" className="text-white w-full flex justify-center bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mb-2">
                    <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0    496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                    Sign up with Github
                </button>
            </div>
        </div>
    );
};

export default Signup;