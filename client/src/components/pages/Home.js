import React from "react";
import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Home = () => {
  return (
    <>
      <div
        className="card w-full shadow-xl image-full h-96 rounded-none"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <figure>
          <img
            src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Vacuuming confetti"
          />
        </figure>
        {/* Carousel */}
        {/* <div className="carousel w-full h-96">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src="https://images.unsplash.com/photo-1642505172378-a6f5e5b15580?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
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
              src="https://daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
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
              src="https://daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
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
              src="https://daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg"
              className="w-full"
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide3" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div> */}
        <div className="card-body">
          <h1
            id="slogan"
            className="text-center text-info font-bold text-3xl mt-28 mb-10"
          >
            "Clean It Like You Mean It"
          </h1>
          <div className="card-actions justify-center">
            <Link to="/quote">
              <button className="btn btn-primary text-info">Get a Quote</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="flex flex-col w-full lg:flex-row m-1">
        <div
          id="residentialCard"
          className="grid flex-grow h-60 card bg-secondary rounded-box place-items-center p-3 m-1 border border-info"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/451/858/non_2x/vector-love-heart-house.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          />
          <h3 className="text-info font-bold text-xl">Residential</h3>
          <h4 className="text-info font-bold text-l">
            We offer cleaning services for residential.{" "}
          </h4>
        </div>

        <div className="grid flex-grow h-60 card  bg-secondary rounded-box place-items-center p-3 m-1 border border-info">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/452/748/non_2x/vector-business-center-building-isometric.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          />
          <h3 className="text-info font-bold text-xl">Business</h3>
          <h4 className="text-info font-bold text-l">
            {" "}
            We offer cleaning services for businesses.{" "}
          </h4>
        </div>
        <div className="grid flex-grow h-60 card  bg-secondary rounded-box place-items-center p-3 m-1 border border-info">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/698/586/non_2x/big-buidling-on-the-island-free-vector.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          />
          <h3 className="text-info font-bold text-xl">Vacation Rentals</h3>
          <h4 className="text-info font-bold text-l">
            We offer cleaning services for condos Air BnBs and more.{" "}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Home;
