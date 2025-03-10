import React from "react";
import Carousel from "react-multi-carousel";

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
  responsive: any;
}

const CarouselSection: React.FC<CarouselProps> = ({ title, items, type, responsive }) => {
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
                src={item.imageUrl || "https://via.placeholder.com/100"}
                alt={item.title}
                className={type === "news" ? "news-thumbnail" : "video-thumbnail"}
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
