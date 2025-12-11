import React, { useState } from 'react';
import { FaTimes, FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
       const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [category, setCategory] = useState("");

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

    const handleSearch = () => {
        onSearch(searchText, category);
        setIsSearchOpen(false);
        setIsOpen(false);
    };

    return (
        <nav className='fixed top-0 left-0 w-full border-b border-gray-700 z-50 bg-gray-900'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16 items-center'>

          
                    <a href="/" className='text-2xl font-bold bg-clip-text text-transparent bg-emerald-400'>
                        LibraWeb
                    </a>

               
                    <div className='hidden md:flex items-center space-x-16'>

                 
                        <button
                            onClick={toggleSearch}
                            className='text-white text-xl hover:text-indigo-400 transition'
                        >
                            <CiSearch />
                        </button>

                      
                        <a 
                            href="https://wa.me/6282162488554" 
                            target="_blank" 
                            rel="noreferrer noopener"
                            className="ml-8"
                        >
                            <button className='text-sm bg-gradient-to-r from-green-400 to-red-500 text-white
                            px-4 py-2 rounded-full hover:opacity-90 shadow-lg transition'>
                                Contact Us
                            </button>
                        </a>
                    </div>

                  
                    <button className='md:hidden text-white text-2xl' onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                </div>

               
                {isSearchOpen && (
                    <div className="hidden md:block bg-gray-800 mt-2 p-4 rounded-lg shadow-xl border border-gray-700">

                        <div className="flex flex-col space-y-4">

                            <input
                                type="text"
                                placeholder="Nama buku..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-sm text-white"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-sm text-white"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="Novel">Novel</option>
                                <option value="Komik">Komik</option>
                                <option value="Edu">Edu</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                            </select>

                            <div className="flex space-x-4">
                                <button
                                    onClick={handleSearch}
                                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded text-white"
                                >
                                    Search
                                </button>

                                <a href="https://wa.me/6282162488554" target="_blank" className="flex-1">
                                    <button className='w-full bg-gradient-to-r from-green-400 to-red-500 text-white
                                    px-4 py-2 rounded-lg hover:opacity-90 shadow-lg transition'>
                                        Contact Us
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {/* MOBILE MENU */}
                {isOpen && (
                    <div className="md:hidden bg-gray-800 mt-2 p-4 rounded-lg border border-gray-700 space-y-4">

                     
                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Nama Buku..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-sm text-white"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 rounded bg-gray-700 text-sm text-white"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="Novel">Novel</option>
                                <option value="Komik">Komik</option>
                                <option value="Edu">Edu</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                            </select>

                            <button
                                onClick={handleSearch}
                                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2"
                            >
                                Search
                            </button>
                        </div>

                    
                        <a href="https://wa.me/6282162488554" target="_blank">
                            <button 
                                className='w-full bg-gradient-to-r from-green-400 to-red-500 text-white
                                px-4 py-2 rounded-full hover:opacity-90 shadow-lg transition mt-4'
                            >
                                Contact Us
                            </button>
                        </a>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
