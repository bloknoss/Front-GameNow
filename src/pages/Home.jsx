import axios from "axios";
import { useState } from "react";
// import Swiper JS
// import Swiper styles
import Button from "../components/Button";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";

export default function Home(props) {

  const [content, setContent] = useState(null);



  const test = () => {
    axios.get("/api/auth/ping", {
    }).then((response) => {
      setContent(response.data);
    });
  };

  const images = [
    'https://via.placeholder.com/800x400?text=Slide+1',
    'https://via.placeholder.com/800x400?text=Slide+2',
    'https://via.placeholder.com/800x400?text=Slide+3',
  ];

  const features = [
    { title: 'Feature One', description: 'Description for feature one.' },
    { title: 'Feature Two', description: 'Description for feature two.' },
    { title: 'Feature Three', description: 'Description for feature three.' },
  ];

  const testimonials = [
    { name: 'Pablo Valladares González', feedback: 'This is an amazing service!' },
    { name: 'Diego André Cadenillas Nájar', feedback: 'Highly recommend to everyone.' },
    { name: 'Antonio Jesus Batista Sánchez', feedback: 'A wonderful experience overall.' },
  ];




  return (
    <>
      <section className="bg-[url('./assets/hero.jpeg')]   bg-no-repeat bg-cover  h-screen flex flex-col justify-center items-center">
        <div className="bg-secondaryDark sm:p-2 md:p-28 flex flex-col opacity-85 rounded-2xl">

          <h1 className="sm:text-xs md:text-5xl font-bold mb-4 opacity-100 text-white font-duru">Bienvenido a GameNow</h1>
          <p className="text-xl mb-8 text-yellow-700 font-poppins">Tenemos las mejores ofertas en videojuegos.</p>
          <Link to="/store" className="bg-white text-blue-600 px-6 py-3 font-poppins< rounded-lg font-semibold">
            Ir a la Tienda
          </Link>
        </div>
      </section>


      <section id="testimonials" className="p-8 dark:text-white bg-white dark:bg-secondaryDark">
        <h2 className="text-3xl font-bold text-center mb-8">Reseñas</h2>
        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-100 dark:bg-primaryDark dark:text-white p-6 rounded-lg shadow-lg">
              <p className="text-lg mb-2">"{testimonial.feedback}"</p>
              <p className="text-right">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>



    </>
  );
}
