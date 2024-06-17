import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SettingsButton = ({ logout, userName, isAdmin, isLogged }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        setShowDropdown(false);
    };


    return (
        <div>

            {isLogged && (

                <div className="relative inline-block text-left">
                    <button
                        onClick={toggleDropdown}
                        className=" bg-transparent border-none text-md dark:bg-gray-800 rounded-full p-2 focus:outline-none"
                    >
                        {userName}
                    </button>
                    {showDropdown && (
                        <div className="absolute  right-0 mt-2 w-48 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                            <div
                                className="py-2"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="options-menu"
                            >
                                {
                                    isAdmin &&
                                    <>
                                        <Link
                                            to="/admin/games"
                                            className="block px-4 py-2 text-sm dark:text-white text-gray-700 hover:bg-gray-100 w-full text-left"
                                            role="menuitem"
                                        >
                                            Game Panel
                                        </Link>
                                        <Link
                                            to="/admin/users"
                                            className="block px-4 py-2 text-sm dark:text-white text-gray-700 hover:bg-gray-100 w-full text-left"
                                            role="menuitem"
                                        >
                                            User Panel
                                        </Link>
                                    </>
                                }
                                <button
                                    to="/admin/games"
                                    className=" block px-4 py-2 text-sm dark:text-white text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                >
                                    Profile
                                </button>
                                <button
                                    to="/admin/games"
                                    onClick={logout}
                                    className=" block px-4 py-2 text-sm dark:text-white text-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100 w-full text-left"
                                    role="menuitem"
                                >
                                    Logout
                                </button>


                            </div>
                        </div>
                    )}
                </div>
            )
            }
        </div>
    );
};

export default SettingsButton;
