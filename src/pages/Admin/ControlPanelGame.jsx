import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ControlPanelGame() {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(10); // Number of games per page

    useEffect(() => {
        axios.get("/api/Game/GetGames").then((response) => {
            setGames(response.data);
        });
    }, []);

    const handleRemove = (id) => {
        setGames(games.filter(game => game.id !== id));
    };

    // Get current games
    const indexOfLastGame = currentPage * gamesPerPage;
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
    const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='items-center mb-10 flex flex-col h-full mt-16'>
            <div className="max-w-7xl relative overflow-x-auto overflow-hidden shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs items-center justify-center font-poppins text-center flex-auto text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Game</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Release Date</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGames.map(game => (
                            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 font-poppins" key={game.id}>
                                <td className="py-2 px-4">
                                    <img className="w-fit" src={game.image || "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"} alt="" />
                                </td>
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{game.name}</th>
                                <td className="py-2 px-4">{game.description}</td>
                                <td className="py-2 px-4">{new Date(game.releaseDate).toLocaleDateString()}</td>
                                <td className="py-2 px-4">${game.price}</td>
                                <td className="py-2 px-4">
                                    <div className="px-6 py-4 flex flex-col gap-3">
                                        <Link to="/game" state={{ id: game.id }} className="font-medium text-green-600 hover:underline">View</Link>
                                        <Link onClick={() => handleRemove(game.id)} href="#" className="font-medium text-red-600 hover:underline">Remove</Link>
                                        <Link to="/admin/games/edit" state={{ id: game.id }} className="font-medium text-blue-600 hover:underline">Edit</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
                <Pagination gamesPerPage={gamesPerPage} totalGames={games.length} paginate={paginate} />
        </div>
    );
};

const Pagination = ({ gamesPerPage, totalGames, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center mt-4">
            <ul className="inline-flex items-center -space-x-px">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)} href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
