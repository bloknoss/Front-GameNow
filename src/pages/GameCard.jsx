// src/components/GameCard.js
import React, { useEffect } from 'react';

const GameCard = ({ game, owned }) => {

    useEffect(() => {
        console.log(game)
    }, [])

    return (
        <div className="bg-white dark:bg-primaryDark p-6 rounded-lg shadow-lg">
            <img src={game.image} alt={game.name} className="w-full object-fillh-48 mb-4 rounded-lg" />
            <h3 className="text-xl dark:text-white font-bold mb-2">{game.name}</h3>
            <p className="text-gray-700 dark:text-gray-200 mb-2">{game.description}</p>
            {
                owned ? <div>
                    <p className='dark:text-gray-300  font-extralight'>You own this game</p>
                </div> :
                    <div>

                        <p className="text-gray-900 dark:text-gray-100 font-semibold mb-2">${game.price}</p>
                        <div className="flex justify-between items-center">
                            <a href={game.trailerUrl} target='_blank' className="text-blue-500 hover:underline">Watch Trailer</a>
                            {game.earlyAccess && <span className="text-red-500 font-semibold">Early Access</span>}
                        </div>
                    </div>
            }
        </div>
    );
}

export default GameCard;
