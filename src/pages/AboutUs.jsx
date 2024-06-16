import React from 'react';
import ContactForm from '../components/ContactForm';


const AboutUs = () => {
    return (
        <div className="bg-white dark:bg-primaryDark p-8 rounded-lg shadow-md mb-8">
            <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-gray-700">
                Somos una empresa dedicada a proporcionar soluciones tecnológicas innovadoras.
                Nuestro equipo está compuesto por expertos en diversas áreas de la tecnología,
                comprometidos con la excelencia y la satisfacción del cliente.
            </p>
            <ContactForm></ContactForm>
        </div>
    );
}

export default AboutUs;