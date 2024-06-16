import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SettingsButton = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleOptionClick = (option) => {
        console.log(`${option} clicked`);
        setShowDropdown(false);
    };


    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className=" bg-transparent border-none text-2xl p-2 focus:outline-none"
            >
                ⚙️
            </button>
            {showDropdown && (
                <div className="absolute  right-0 mt-2 w-48 dark:bg-gray-800 dark:border-gray-700 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div
                        className="py-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
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
                        <button
                            onClick={() => handleOptionClick('Option 3')}
                            className="block px-4 py-2 text-sm dark:text-white text-gray-700 hover:bg-gray-100 w-full text-left"
                            role="menuitem"
                        >
                            Option 3
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SettingsButton;
