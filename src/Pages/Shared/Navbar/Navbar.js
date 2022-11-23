import React from 'react';
import { Link } from 'react-router-dom';
import { GiLoincloth } from "react-icons/gi";

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-outline btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to='/'>Homepage</Link></li>
                            <li><Link to='/'>Portfolio</Link></li>
                            <li><Link to='/'>About</Link></li>
                        </ul>
                    </div>
                    <Link to='/' className="ml-1 text-2xl md:hidden font-bold flex items-center normal-case"><GiLoincloth />eKapor</Link>
                </div>
                <div className="navbar-center hidden md:block">
                    <Link to='/' className="font-bold text-3xl flex items-center normal-case"><GiLoincloth />eKapor</Link>
                </div>
                <div className="navbar-end">
                    <button className="btn btn-outline mr-1 btn-circle hidden md:flex">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <div className="dropdown dropdown-end hidden">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://placeimg.com/80/80/people" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                    <div className='flex'>
                        <div>
                            <Link to='/login' className="btn btn-outline">Login</Link>
                        </div>
                        <div className='ml-1'>
                            <Link className="btn btn-outline">SignUP</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;