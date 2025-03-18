import React from "react";
import Carousel from "react-multi-carousel";

// Import default images
import crypto1 from "../assets/crypto_01.webp";
import crypto2 from "../assets/crypto_02.webp";
import crypto3 from "../assets/crypto_03.webp";
import crypto4 from "../assets/crypto_04.webp";
import crypto5 from "../assets/crypto_05.webp";

interface CarouselItem {
  id: string;
  title: string;
  link: string;
  imageUrl?: string | null;
  source?: string;
  channelTitle?: string;
  publishedAt?: string;
}

interface CarouselProps {
  title: string;
  items: CarouselItem[];
  type: "news" | "video";
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1700 },
    items: 4,
  },
  desktopTwo: {
    breakpoint: { max: 1700, min: 1024 },
    items: 3,
  },
  desktopThree: {
    breakpoint: { max: 1200, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// Random Fallback Image Function
const getRandomFallbackImage = () => {
  const fallbackImages = [crypto1, crypto2, crypto3, crypto4, crypto5];
  return fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
};

const CarouselSection: React.FC<CarouselProps> = ({ title, items, type }) => {
  return (
    <div className="home-container margin-top-8 desktop-width margin-bottom-8">
      <h2 className="home-title">{title}</h2>
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px video-container"
      >
        {items.map((item) => (
          <div key={item.id} className={type === "news" ? "news-item" : "video-item"}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
               <img
                  src={item.imageUrl || getRandomFallbackImage()}
                  alt={item.title}
                  className={type === "news" ? "news-thumbnail" : "video-thumbnail"}
                  onError={(e) => (e.currentTarget.src = getRandomFallbackImage())} // Handle failed image loading
                />
            </a>
            {type === "video" && <div className="play-icon">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                    alt="Play"
                  />
                </div>}
            <div className="content-info">
              <h3>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </h3>
              {type === "news" ? (
                <p>Source: {item.source}</p>
              ) : (
                <p>By {item.channelTitle}</p>
              )}
              {item.publishedAt && <p>Published: {new Date(item.publishedAt).toLocaleDateString()}</p>}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSection;
