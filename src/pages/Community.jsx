import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Community = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get('/getAll')
            .then(response => {
                setReviews(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the reviews!', error);
            });
    }, []);

    return (
        <div className="container dark:bg-primaryDark m-48 mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Game Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Game ID: {review.gameId}</h2>
                        <p className="text-gray-700 mb-2">{review.content}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-green-500">Upvotes: {review.upvotes}</span>
                            <span className="text-red-500">Downvotes: {review.downvotes}</span>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">Posted on: {new Date(review.postedTime).toLocaleDateString()}</p>
                        <p className="text-gray-500 text-sm">Last edited: {new Date(review.lastEdit).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;
