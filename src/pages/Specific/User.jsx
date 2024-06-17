import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function User() {

    const location = useLocation();
    const [user, setUser] = useState(null);

    const { id } = location.state;


    useEffect(() => {
        axios.get("/api/User/GetUser", {
            params: { id: id }
        }).then((res) => {
            setUser(res.data)
            console.log(res.data)
        });
    }, []);





    return (
        <>
            {user && (
                <div className="container mx-auto p-6 mt-10 mb-10 max-w-screen bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Details</h2>
                    <div className="grid grid-cols-1 gap-4 w-fit sm:grid-cols-2 lg:grid-cols-3">
                        {Object.keys(user).map((item) => (
                            <div key={item} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{item}:</h3>
                                <p className="text-gray-600 text-ellipsis overflow-hidden dark:text-gray-400">{user[item] ?? 'none'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

