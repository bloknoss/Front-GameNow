import axios from "axios";
import React, { useEffect, useState } from "react"
import Button from "../components/Button";
import { Link } from "react-router-dom";
import GameCard from "./GameCard";




export default function Library() {

    const [games, setGames] = useState([]);


    useEffect(() => {
        axios.get("/api/Game/GetGames").then((data) => setGames(data.data))
    }, [])


    return (
        <div className="flex flex-col justify-center m-5 ">
            <section id="library" className="p-8 dark:bg-secondaryDark bg-gray-100">
                <h2 className="text-3xl dark:text-white font-duru font-bold text-center mb-8">Biblioteca</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {games.map(game => (
                        <GameCard key={game.id} owned={true} game={game} />
                    ))}
                </div>
            </section>

        </div>
    )
}