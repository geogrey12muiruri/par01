import React from "react";

const Carousel = () => {
  return (
    <div className="carousel w-full relative">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1718737985/alexander-naglestad-RFhq0SrrgEg-unsplash_eovprh.jpg"
          alt="Slide 1"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1718737961/bundo-kim-ClvwtweQGB8-unsplash_ktnieu.jpg"
          alt="Slide 2"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1714993048/image2_l4qa43.jpg"
          alt="Slide 3"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://res.cloudinary.com/dws2bgxg4/image/upload/v1670350536/samples/ecommerce/leather-bag-gray.jpg"
          alt="Slide 4"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
