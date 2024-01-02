import React from "react";
import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Home = () => {
  return (
    <>
      <div
        className="card w-full shadow-xl image-full h-96 rounded-none border-t border-info"
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
          className="grid flex-grow h-80 card bg-secondary rounded-box place-items-center p-3 px-10 m-1 border border-info lg:w-1/4"
        >
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/451/858/non_2x/vector-love-heart-house.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          />
          <h3 className="text-info font-bold text-xl">Residential</h3>
          <h4 className="text-info font-bold text-l text-center">
            Whether you have messy kids or an older relative that needs a little
            extra help around the house, we've got you covered!{" "}
          </h4>
        </div>

        <div className="grid flex-grow h-80 card  bg-secondary rounded-box place-items-center p-3 px-10 m-1 border border-info lg:w-1/4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/452/748/non_2x/vector-business-center-building-isometric.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          />
          <h3 className="text-info font-bold text-xl">Business</h3>
          <h4 className="text-info font-bold text-l text-center">
            {" "}
            Does your office need a deep cleaning? Our cleaning experts will
            cover every crack and crevice in your place of business.{" "}
          </h4>
        </div>
        <div className="grid flex-grow h-80 card  bg-secondary rounded-box place-items-center p-3 px-10 m-1 border border-info lg:w-1/4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/003/698/586/non_2x/big-buidling-on-the-island-free-vector.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          />
          <h3 className="text-info font-bold text-xl">Vacation Rentals</h3>
          <h4 className="text-info font-bold text-l text-center">
            Does your AirBnB need a deep clean? Regular cleaning after having
            guests? We are happy to help!{" "}
          </h4>
        </div>
      </div>
    </>
  );
};

export default Home;
