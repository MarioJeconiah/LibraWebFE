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
    };

    return (
        <nav className='fixed top-0 left-0 w-full border-b border-gray-600 z-50 bg-gray-800'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16 items-center'>

                    {/* BRAND */}
                    <a href="/" className='text-2xl font-bold bg-clip-text text-transparent bg-emerald-400'>
                        LibraWeb
                    </a>

                    {/* SEARCH (Desktop) */}
                    <div className='hidden md:flex items-center space-x-4 relative'>
                        <CiSearch
                            className='text-white text-xl cursor-pointer hover:text-purple-500 transition'
                            onClick={toggleSearch}
                        />

                        {isSearchOpen && (
                            <div className="absolute top-10 right-0 bg-gray-900 p-4 rounded-lg shadow-xl w-64 space-y-2 border border-gray-600">
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

                                <button
                                    onClick={handleSearch}
                                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-md py-2"
                                >
                                    Search
                                </button>
                            </div>
                        )}

                        <a href="https://wa.me/6282162488554" target="blank">
                            <button className='ml-4 text-sm bg-gradient-to-r from-green-400 to-red-500 text-white
                                px-4 py-2 rounded-full hover:opacity-90 shadow-lg transition'>
                                Contact Us
                            </button>
                        </a>
                    </div>

                    {/* MOBILE MENU TOGGLE */}
                    <div className='md:hidden flex items-center'>
                        <button className='text-white text-2xl' onClick={toggleMenu}>
                            {isOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>

                </div>

                {/* MOBILE MENU */}
                <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700`}>
                    <div className='space-y-4 py-4 text-center'>
                        <CiSearch
                            className='text-white text-xl cursor-pointer hover:text-purple-500 transition'
                            onClick={toggleSearch}
                        />

                        {isSearchOpen && (
                            <div className="space-y-3 px-6">
                                <input
                                    type="text"
                                    placeholder="Nama Buku..."
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-800 text-sm text-white"
                                />

                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full p-2 rounded bg-gray-800 text-sm text-white"
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
                        )}

                        
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
