import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UserEdit() {
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;

    useEffect(() => {
        axios.get("/api/User/GetUser", {
            params: { email: id }
        }).then((res) => setUser(res.data));
    }, [id]);

    const [formData, setFormData] = useState({
        id: '',
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

    useEffect(() => {
        if (user) {
            setFormData({
                id: user.id,
                discriminator: user.discriminator || '',
                address: user.address || '',
                gamesPlayed: user.gamesPlayed || 0,
                playtimeForever: user.playtimeForever || 0,
                recentPlaytime: user.recentPlaytime || 0,
                userName: user.userName || '',
                normalizedUserName: user.normalizedUserName || '',
                email: user.email || '',
                normalizedEmail: user.normalizedEmail || '',
                emailConfirmed: user.emailConfirmed || false,
                passwordHash: user.passwordHash || '',
                securityStamp: user.securityStamp || '',
                concurrencyStamp: user.concurrencyStamp || '',
                phoneNumber: user.phoneNumber || '',
                phoneNumberConfirmed: user.phoneNumberConfirmed || false,
                twoFactorEnabled: user.twoFactorEnabled || false,
                lockoutEnd: user.lockoutEnd || '',
                lockoutEnabled: user.lockoutEnabled || false,
                accessFailedCount: user.accessFailedCount || 0
            });
        }
    }, [user]);

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
            const response = await axios.put(`/api/User/UpdateUser`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log('User updated successfully');
                navigate(-1);
            } else {
                console.error('Failed to update user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="m-8">
            {user &&
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
                                        type={key === 'email' ? 'email' : key === 'releaseDate' ? 'date' : 'text'}
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
            }
        </div>
    );
}
