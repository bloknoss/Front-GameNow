// src/components/Store.js
import React, { useEffect, useState } from 'react';
import GameCard from './GameCard';
import axios from 'axios';

const Store = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Number of games per page

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const { data } = await axios.get("/api/Game/GetGames");
                setGames(data);
            } catch (error) {
                console.error("Error fetching games", error);
            }
        };

        fetchGames();
    }, []);

    const totalPages = Math.ceil(games.length / itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const paginatedGames = games.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <section id="store" className="p-8 dark:bg-secondaryDark m-5 bg-gray-100">
            <h2 className="text-3xl font-bold text-center text-white font-duru mb-8">Store</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {paginatedGames.map(game => (
                    <GameCard key={game.Id} game={game} />
                ))}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 m-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Previous
                </button>
                <span className="px-4 py-2 m-1 bg-gray-200 rounded">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 m-1 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </section>
    );
}

export default Store;
