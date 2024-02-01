import React, { useState, useEffect } from "react";
import hero1 from "../../assets/desktop_hero/hero1.jpg";
import hero2 from "../../assets/desktop_hero/hero2.jpg";
import hero3 from "../../assets/desktop_hero/hero3.jpg";
import hero4 from "../../assets/desktop_hero/hero4.jpg";

const ImageSlider = () => {
    const images = [hero1, hero2, hero3, hero4];
    const [currentImage, setCurrentImage] = useState(0);

    // -----------------------------------------------------------
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // -----------------------------------------------------------
    // ******************* NAVIGATE SLIDER **********************
    // -----------------------------------------------------------
    const goToPrevious = () => {
        setCurrentImage(
            (prevImage) => (prevImage - 1 + images.length) % images.length,
        );
    };

    const goToNext = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    // -----------------------------------------------------------
    return (
        <>
            <div className="relative w-full h-64 md:h-96 overflow-hidden">
                {images.map((image, index) => (
                    <>
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
                                index === currentImage
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                            }}
                        ></div>
                    </>
                ))}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
                    <button
                        onClick={goToPrevious}
                        className="text-white text-3xl  hover:bg-black hover:bg-opacity-10 p-3 focus:outline-none h-full"
                    >
                        &#8249;
                    </button>
                    <button
                        onClick={goToNext}
                        className="text-white text-3xl  hover:bg-black hover:bg-opacity-10 p-3 focus:outline-none h-full"
                    >
                        &#8250;
                    </button>
                </div>
            </div>
        </>
    );
};

export default ImageSlider;
