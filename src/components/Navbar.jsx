import React, { useState } from 'react'
import { FaTimes, FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <nav className='fixed top-0 left-0 w-full border-b border-gray-600 z-50 bg-gray-800'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16 items-center'>
                    
                    {/* BRAND = HOME */}
                    <a href="/" className='text-2xl font-bold bg-clip-text text-transparent bg-emerald-400'>
                        LibraWeb
                    </a>

                    {/* MOBILE TOGGLE */}
                    <div className='md:hidden flex items-center'>
                        <button className='text-white text-2xl' onClick={toggleMenu}>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                    {/* DESKTOP ICONS */}
                    <div className='hidden md:flex items-center space-x-4'>
                        <CiSearch className='text-white text-xl cursor-pointer hover:text-purple-500 transition duration-300' />

                        <a href="https://hexagondigitalservices.com/contact" target='blank'>
                            <button className='ml-4 text-sm bg-gradient-to-r from-green-400 to-red-500 text-white
                                px-4 py-2 rounded-full hover:opacity-90 shadow-lg transition duration-300'>
                                Contact Us
                            </button>
                        </a>
                    </div>
                </div>

                {/* MOBILE MENU */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700`}>
                    <div className='space-y-4 py-4'>

                        {/* SEARCH ICON */}
                        <div className='flex justify-center'>
                            <CiSearch className='text-white text-xl cursor-pointer hover:text-purple-500 transition duration-300' />
                        </div>

                        {/* CONTACT US BUTTON */}
                        <div className='text-center'>
                            <a href="https://hexagondigitalservices.com/contact" target='blank'>
                                <button className='text-sm bg-gradient-to-r from-green-400 to-red-500 text-white px-4 py-2 
                                rounded-full hover:opacity-90 shadow-lg transition duration-300'>
                                    Contact Us
                                </button>
                            </a>
                        </div>

                    </div>
                </div>

            </div>

        </nav>
    )
}

export default Navbar;
