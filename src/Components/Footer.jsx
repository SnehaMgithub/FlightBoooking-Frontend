import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-100 to-indigo-50 pt-10">
            {/* Main Footer Content */}
            <div className="flex flex-wrap justify-around px-4">
                {/* Connect Section */}
                <div className="ml-5 gap-4">
                    <h1 className="text-gray-700 text-lg font-bold pb-2">Connect</h1>
                    <p className="text-gray-600 text-sm">
                        Flight Booking Headquarters,<br />
                        123 Innovation Drive,<br />
                        Tech City, Code State, 56789
                    </p>
                    <p className="text-gray-600 text-sm mt-3">
                        Email: <a href="mailto:snehamathes2000@gmail.com" className="text-blue-500 underline">snehamathes2000@gmail.com</a>
                    </p>
                     {/* Social Links */}
            <div className="flex  gap-2 p-2 mt-2">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm hover:text-blue-500">
                <FaFacebook /> 
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm hover:text-blue-500">
                <FaXTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 text-sm hover:text-blue-500">
                <FaInstagram />
                </a>
            </div>
                </div>

                {/* Quick Links Section */}
                <div>
                    <h1 className="text-lg font-bold text-gray-700 mt-2">Quick Links</h1>
                    <ul className="text-sm font-semibold text-gray-600">
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Home</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">About Us</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Pricing</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Contact Us</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Careers</li>
                    </ul>
                </div>

                {/* Policies Section */}
                <div>
                    <h1 className="text-lg font-bold text-gray-700">Policies</h1>
                    <ul className="text-sm font-semibold text-gray-600">
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Terms of Service</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Privacy Policy</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Cookie Policy</li>
                        <li className="cursor-pointer mt-1 hover:text-blue-500">Help Center</li>
                    </ul>
                </div>
            </div>

           

            {/* Copyright Section */}
            <div>
                <p className="text-xs text-gray-600  tracking-wider font-normal text-center pt-2 bg-indigo-50">
                    Copyright ©  Sneha 2024. All rights reserved.. 
                </p>
            </div>
        </footer>
    );
};

export default Footer;
