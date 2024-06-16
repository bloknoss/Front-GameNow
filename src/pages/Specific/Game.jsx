import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Game() {
  const location = useLocation();
  const { id } = location.state;

  const [game, setGame] = useState();

  useEffect(() => {
    axios
      .get("/api/Game/GetGame", {
        params: {
          id: id,
        },
      })
      .then((data) => setGame(data.data))
      .catch();
  }, [id]);

  function getReviewSummary(rating, reviews) {
    if (rating >= 95 && reviews >= 500) {
      return "Overwhelmingly positive";
    } else if (rating >= 85 && reviews >= 50) {
      return "Very positive";
    } else if (rating >= 80 && reviews >= 1) {
      return "Positive";
    } else if (rating >= 70 && rating <= 79 && reviews >= 1) {
      return "Mostly positive";
    } else if (rating >= 40 && rating <= 69 && reviews >= 1) {
      return "Mixed";
    } else if (rating >= 20 && rating <= 39 && reviews >= 1 && reviews < 50) {
      return "Mostly negative";
    } else if (rating >= 0 && rating <= 19 && reviews >= 1 && reviews < 50) {
      return "Negative";
    } else if (rating >= 0 && rating <= 19 && reviews >= 50 && reviews < 500) {
      return "Very negative";
    } else if (rating >= 0 && rating <= 19 && reviews >= 500) {
      return "Overwhelmingly negative";
    } else {
      return "No reviews";
    }
  }

  return (
    <div className="flex items-center p-4">
      {game ? (
        <div className="text-white text-center flex flex-col gap-4 max-w-4xl mx-auto">
          <h1 className="mt-5 text-2xl font-poppins font-bold mb-4">{game.name}</h1>
          <img src={game.image} alt={game.name} className="w-full mb-4" />
          <div className="container rounded-xl p-5 dark:bg-primaryDark">
            <h1 className="mb-2 font-bold font-poppins">Description</h1>
            <p className="mb-2">{game.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 text-sm text-nowrap gap-3">
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins">Price</h1>
              <p className="font-semibold mb-2">${game.price}</p>
            </div>
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins text-nowrap">Recent Reviews</h1>
              <p className="font-semibold mb-2">{game.recentReviews.toLocaleString()}</p>
            </div>
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins text-nowrap">All Reviews</h1>
              <p className="font-semibold mb-2">{game.allReviews.toLocaleString()}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 text-sm text-nowrap gap-3">
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins text-nowrap">Achievements</h1>
              <p className="font-semibold mb-2">{game.achievements}</p>
            </div>
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins">Recent Rating</h1>
              <p className="font-semibold mb-2">{getReviewSummary(game.recentRating, game.recentReviews)}</p>
            </div>
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins text-nowrap">Historical Rating</h1>
              <p className="font-semibold mb-2">
                {getReviewSummary(game.historicalRating, game.allReviews)} <span className="text-gray-300">({game.historicalRating})</span>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 text-sm text-nowrap gap-3">
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins">Release Date</h1>
              <p className="mb-2">{new Date(game.releaseDate).toLocaleDateString()}</p>
            </div>
            <div className="container rounded-xl p-5 dark:bg-primaryDark">
              <h1 className="mb-2 font-bold font-poppins text-nowrap">Early Access</h1>
              <p className="mb-2">{game.earlyAccess ? 'Yes' : 'No'}</p>
            </div>

          </div>
          <div className="w-full flex flex-col md:flex-row gap-5">
            <button className="font-poppins bg-red-500 text-md rounded-xl w-[95%] py-2 text-white hover:bg-red-600 transition duration-300">
              Comprar ahora
            </button>
            <button className="relative flex items-center justify-center  bg-gray-800 text-white rounded-xl p-2 w-[50%] md:w-20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </button>
          </div>
          <div className="rounded-xl w-full mt-8 mb-8">
            <h1 className="text-xl font-bold mb-8"> Trailer</h1>
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={"https://www.youtube.com/embed/" + game.trailerUrl.split('=')[1]}
                title="YouTube video player"
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white justify-center mt-10 mb-10">
          <h1 className="text-7xl">No game found</h1>
        </div>
      )}
    </div>
  );
}
