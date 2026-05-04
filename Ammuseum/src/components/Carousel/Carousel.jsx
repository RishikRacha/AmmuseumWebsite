import React, { useEffect, useRef } from "react";
import "./Carousel.css";
import carousel3 from "../../assets/General/AmmuseumLogoTransparent.png";
import carousel2 from "../../assets/carousel/event.jpg";
import carousel1 from "../../assets/carousel/GameOfTheMonth.jpg";
import carousel4 from "../../assets/carousel/whatisammuseum.png";

function Carousel() {
    const images = [carousel4, carousel1, carousel2];

    const carouselRef = useRef(null);
    const indexRef = useRef(0);
    let timer = useRef(10000);      //initial scroll time for carousel first page
    useEffect(() => {
        let timeoutId;

        const scrollNext = () => {
            if (!carouselRef.current) return;

            const container = carouselRef.current;
            const scrollWidth = container.scrollWidth;
            const itemWidth = container.clientWidth;
            indexRef.current = (indexRef.current + 1) % images.length;

            container.scrollTo({
                left: itemWidth * indexRef.current,
                behavior: "smooth",
            });

            // After the first scroll, change future delay to 5s
            timer.current = 5000;

            timeoutId = setTimeout(scrollNext, timer.current);
        };

        timeoutId = setTimeout(scrollNext, timer.current);

        return () => clearTimeout(timeoutId);
    }, [images.length]);

    return (
        <div className="carouselDiv">
            <div className="carouselContainer" ref={carouselRef}>
                {images.map((image, index) => (
                    <div key={index} className="carouselContainerIn">
                        <img src={image} className="carouselImg" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Carousel;
