import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GameEdit() {
    const [game, setGame] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = location.state;

    useEffect(() => {
        axios.get("/api/Game/GetGame", {
            params: {
                id: id
            }
        }).then((res) => setGame(res.data));
    }, [id]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        image: '',
        price: 0,
        earlyAccess: false,
        recentReviews: 0,
        recentRating: 0,
        allReviews: 0,
        historicalRating: 0,
        achievements: 0,
        releaseDate: '',
        trailerUrl: ''
    });

    useEffect(() => {
        if (game) {
            setFormData({
                id: game.id,
                name: game.name || '',
                description: game.description || '',
                image: game.image || '',
                price: game.price || 0,
                earlyAccess: game.earlyAccess || false,
                recentReviews: game.recentReviews || 0,
                recentRating: game.recentRating || 0,
                allReviews: game.allReviews || 0,
                historicalRating: game.historicalRating || 0,
                achievements: game.achievements || 0,
                releaseDate: game.releaseDate ? game.releaseDate.split('T')[0] : '',
                trailerUrl: game.trailerUrl ? game.trailerUrl : ''
            });
        }
    }, [game]);

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
            const response = await axios.put(`/api/Game/UpdateGame`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 200) {
                console.log('Item updated successfully');
                navigate(-1);
            } else {
                console.error('Failed to update item');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="m-8">
            {game &&
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 shadow-md rounded-md">
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border  dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            ></textarea>
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Image</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4 flex items-center">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300 mr-2">Early Access</label>
                            <input
                                type="checkbox"
                                name="earlyAccess"
                                checked={formData.earlyAccess}
                                onChange={handleChange}
                                className="dark:bg-gray-700 dark:border-gray-600"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Recent Reviews</label>
                            <input
                                type="number"
                                name="recentReviews"
                                value={formData.recentReviews}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Recent Rating</label>
                            <input
                                type="number"
                                name="recentRating"
                                value={formData.recentRating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">All Reviews</label>
                            <input
                                type="number"
                                name="allReviews"
                                value={formData.allReviews}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Historical Rating</label>
                            <input
                                type="number"
                                name="historicalRating"
                                value={formData.historicalRating}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Achievements</label>
                            <input
                                type="number"
                                name="achievements"
                                value={formData.achievements}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Release Date</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-2 mb-4">
                            <label className="block text-gray-700 font-poppins dark:text-gray-300">Trailer URL</label>
                            <input
                                type="text"
                                name="trailerUrl"
                                value={formData.trailerUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-3 py-2 rounded-md"
                    >
                        Update Item
                    </button>
                </form>
            }
        </div>
    );
}
