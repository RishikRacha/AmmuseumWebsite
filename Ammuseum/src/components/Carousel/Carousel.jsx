import React, { useEffect, useRef } from "react";
import "./Carousel.css";
import carousel1 from "../../assets/General/ammuseumLogo.png";
import carousel2 from "../../assets/carousel/botcPic.jpg";
import carousel3 from "../../assets/carousel/event.jpg";

function Carousel() {
    const images = [carousel1, carousel2, carousel3];
    
    const carouselRef = useRef(null);
    const indexRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!carouselRef.current) return;

            const container = carouselRef.current;
            const scrollWidth = container.scrollWidth;
            const itemWidth = container.clientWidth; // because each image is 100% width
            indexRef.current = (indexRef.current + 1) % images.length;

            container.scrollTo({
                left: itemWidth * indexRef.current,
                behavior: 'smooth',
            });
        }, 7000); // changes image every few seconds

        return () => clearInterval(interval);
    }, [images.length]);


    return (
        <div className="carouselDiv">
            <div className="carouselContainer" ref={carouselRef}>
                    {images.map((image, index) => (
                        <div key={index} className="carouselContainerIn">
                            <img src={image} className="carouselImg"/>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Carousel;
