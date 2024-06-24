import { useState, useEffect } from 'react';
import CarouselData from '../carousel-slides.json';

function Carousel() {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = CarouselData.carousel;

    const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 5000);
        return () => clearInterval(slideInterval);
    }, []);

    return (
        <div className='relative m-4 p-8 h-[500px] w-full max-w-screen-lg rounded-lg overflow-hidden flex items-center justify-center shadow-xl'>
            <button onClick={prevSlide} className="absolute left-0 z-10 bg-white bg-opacity-70 rounded-full shadow p-3 hover:bg-opacity-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                </svg>
            </button>
            {slides.map((slide, index) => (
                <div key={slide.id} className={`absolute transition-opacity duration-700 ease-in-out ${index === activeSlide ? 'opacity-100' : 'opacity-0'} h-full w-full flex items-center justify-center`}>
                    <img src={slide.image} alt={slide.alt} className="h-full w-full object-cover" />
                </div>
            ))}
            <button onClick={nextSlide} className="absolute right-0 z-10 bg-white bg-opacity-70 rounded-full shadow p-3 hover:bg-opacity-100 transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-8 w-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                </svg>
            </button>
            <div className="absolute bottom-4 flex space-x-2 justify-center w-full">
                {slides.map((_, index) => (
                    <div key={index} className={`h-2 w-2 bg-white rounded-full ${index === activeSlide ? 'bg-opacity-100' : 'bg-opacity-50'} transition-opacity duration-300`}></div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;