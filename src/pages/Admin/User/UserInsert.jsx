import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserInsert() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        discriminator: '',
        address: '',
        gamesPlayed: 0,
        playtimeForever: 0,
        recentPlaytime: 0,
        userName: '',
        normalizedUserName: '',
        email: '',
        normalizedEmail: '',
        emailConfirmed: false,
        passwordHash: '',
        securityStamp: '',
        concurrencyStamp: '',
        phoneNumber: '',
        phoneNumberConfirmed: false,
        twoFactorEnabled: false,
        lockoutEnd: '',
        lockoutEnabled: false,
        accessFailedCount: 0
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/User/InsertUser`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log('User created successfully');
                navigate(-1);
            } else {
                console.error('Failed to create user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="m-8">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
                <div className="flex flex-wrap -mx-2">
                    {Object.keys(formData).map((key) => (

                        <div key={key} className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                            {key === 'emailConfirmed' || key === 'phoneNumberConfirmed' || key === 'twoFactorEnabled' || key === 'lockoutEnabled' ? (
                                <input
                                    type="checkbox"
                                    name={key}
                                    checked={formData[key]}
                                    onChange={handleChange}
                                    className="dark:bg-gray-700 dark:border-gray-600"
                                />
                            ) : (
                                <input
                                    type={key === 'email' ? 'email' : key === 'lockoutEnd' ? 'date' : 'text'}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-3 py-2 rounded-md"
                >
                    Update User
                </button>
            </form>
        </div>
    );
}
