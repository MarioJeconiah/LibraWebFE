import React from 'react'
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className=' bg-gradient-to-r from-gray-800  to-teal-900 text-white py-10 px-4 md:px-8'>
            <div className=' border-t border-gray-600 mt-8 pt-4'>
                <div className='flex flex-col items-center justify-between mx-auto container md:flex-row'>
                    <p className='text-gray-400 text-sm text-center md:text-left'>
                        Copyright © 2025. All Rights Reserved <br />
                        <a href="LibraWeb" className='text-white hover:text-purple-500'>
                            LibraWeb
                        </a>
                    </p>
                    <div className='flex space-x-4 mt-4 md:mt-0'>
                        <a href="LibraWeb"
                            className='text-gray-400 rounded-md bg-white/10 py-1 px-1 hover:text-white 
                            transition duration-300 ease-in-out'>
                            <FaTwitter />
                        </a>
                        <a href="https://www.linkedin.com/company/hexagondigtial-services/"
                            className='text-gray-400 rounded-md bg-white/10 py-1 px-1 hover:text-white 
                          transition duration-300 ease-in-out'>
                            <FaLinkedinIn />
                        </a>
                        <a href="https://github.com/HexagonDService"
                            className='text-gray-400 rounded-md bg-white/10 py-1 px-1 hover:text-white 
                          transition duration-300 ease-in-out'>
                            <FaGithub />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer