import React from "react";
import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Home = () => {
  return (
    <>
      <div
        className="hero min-h-[300px] border-y"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1496198388318-c31659bd4113?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-5"></div>
        <div
          className="hero sm:w-5/6 lg:w-1/3 h-full rounded-full shadow-2xl "
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          <div className="hero-overlay bg-opacity-5 rounded-full drop-shadow-2xl "></div>
          <div className="hero-content text-center text-neutral-content">
            <div className=" flex flex-col justify-center h-1/2">
              <h1
                id="slogan"
                className="text-center text-info font-bold text-3xl mt-10 mb-10"
              >
                "We Clean It Like We Mean It"
              </h1>
              {/* <div className="card-actions justify-center">
                <Link to="/quote">
                  <button className="btn btn-primary text-info">
                    Get a Quote
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <h3 className="text-center font-bold text-3xl py-3 italic">
          OUR CORE VALUES
        </h3>
        <div className="flex flex-col w-full lg:flex-row p-1 italic">
          <div
            id="residentialCard"
            className="grid flex-grow h-80  place-items-center p-3 px-10 m-1 border-x border-info lg:w-1/4"
          >
            <h3 className="text-info font-bold tracking-[.4em] text-2xl italic">
              TRUST
            </h3>
            <h4 className="text-info font-bold text-l text-center">
              We operate with honesty and transparency, building TRUST with
              clients through reliable and ethical practices.{" "}
            </h4>
          </div>

          <div className="grid flex-grow h-80  place-items-center p-3 px-10 m-1  border-x border-info lg:w-1/4">
            {/* <img
            src="https://static.vecteezy.com/system/resources/previews/000/452/748/non_2x/vector-business-center-building-isometric.jpg"
            className="w-32 h-32 object-cover rounded-full border border-info"
          /> */}
            <h3 className="text-info font-bold tracking-[.4em] text-2xl italic">
              SATISFACTION
            </h3>
            <h4 className="text-info font-bold text-l text-center">
              {" "}
              Our focus is always on the client's SATISFACTION by understanding
              and meeting their specific needs and preferences.{" "}
            </h4>
          </div>
          <div className="grid flex-grow h-80  place-items-center p-3 px-10 m-1  border-x border-info lg:w-1/4">
            <h3 className="text-info font-bold tracking-[.4em] text-2xl italic">
              EXCELLENCE
            </h3>
            <h4 className="text-info font-bold text-l text-center">
              We strive for the highest standards of EXCELLENCE in every aspect
              of our service, ensuring thorough and meticulous cleaning.{" "}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
