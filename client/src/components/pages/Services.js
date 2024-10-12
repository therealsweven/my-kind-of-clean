import React from "react";

const Services = () => {
  return (
    <>
      <div className="bg-base-100">
        <h1
          className="text-info text-4xl py-3 text-center border-b-2"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        >
          Services
        </h1>
        <div className="flex justify-evenly pb-6 flex-wrap">
          {/* House Cleaning */}
          <div
            className=" min-w-1/3 hero hover:scale-105 duration-500"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-40 hover:bg-opacity-20 duration-500 border-y  flex justify-center items-center">
              <div
                id="houseServiceContent"
                className="w-full bg-black bg-opacity-40 text-center shadow-inner shadow-xl h-full align-middle flex flex-col justify-between  "
              >
                <h1 className="mb-5 text-2xl font-bold p-3 bg-black bg-opacity-40 w-full">
                  Residential
                </h1>
                <div className="p-3">
                  <p className="mb-5 p-3 text-xl">
                    Need a one time deep clean or a regular scheduled cleaning?
                    We are here to serve you.
                  </p>
                  {/* <button className="btn btn-base-100 btn-sm mb-3">
                    Inquire
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Post Construction */}
          <div
            className=" min-w-1/3 hero   hover:scale-105 duration-500"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1516880711640-ef7db81be3e1?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-40 hover:bg-opacity-30 duration-500 border-y  flex justify-center items-center">
              <div
                id="houseServiceContent"
                className="w-full bg-black bg-opacity-40 text-center shadow-inner shadow-xl h-full align-middle flex flex-col justify-between  "
              >
                <h1 className="mb-5 text-2xl font-bold p-3 bg-black bg-opacity-40 w-full">
                  Post Construction
                </h1>
                <div className="p-3">
                  <p className="mb-5 p-3 text-xl drop-shadow-2xl">
                    A freshly remodeled space should look shiny and new. We’ll
                    make your site sparkle and shine!
                  </p>
                  {/* <button className="btn btn-base-100 btn-sm mb-3">
                    Inquire
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Commercial Cleaning */}
          <div
            className=" min-w-1/3 hero   hover:scale-105 duration-500"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-30 hover:bg-opacity-0 duration-500 border-y  flex justify-center items-center">
              <div
                id="commercialServiceContent"
                className="w-full bg-black bg-opacity-40 text-center shadow-inner shadow-xl h-full align-middle flex flex-col justify-between  "
              >
                <h1 className="mb-5 text-2xl font-bold p-3 bg-black bg-opacity-40 w-full">
                  Commercial
                </h1>
                <div className="p-3">
                  <p className="mb-5 p-3 text-xl drop-shadow-xl">
                    Whether you have a retail store, restaurant, office, studio,
                    house of worship or an auto shop you can count on us.
                  </p>
                  {/* <button className="btn btn-base-100 btn-sm mb-3">
                    Inquire
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Vacation Rentals */}
          <div
            className=" min-w-1/3 hero   hover:scale-105 duration-500"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1598284261599-a1fe2b2a131e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-40 hover:bg-opacity-10 duration-500 border-y  flex justify-center items-center">
              <div
                id="houseServiceContent"
                className="w-full bg-black bg-opacity-40 text-center shadow-inner shadow-xl h-full align-middle flex flex-col justify-between  "
              >
                <h1 className="mb-5 text-2xl font-bold p-3 bg-black bg-opacity-40 w-full">
                  Vacation Rentals
                </h1>
                <div className="p-3">
                  <p className="mb-5 p-3 text-xl">
                    Let us take the stress of keeping up with your Air BnB off
                    your shoulders!
                  </p>
                  {/* <button className="btn btn-base-100 btn-sm mb-3">
                    Inquire
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Real Estate Cleans */}
          <div
            className=" min-w-1/3 hero   hover:scale-105 duration-500"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-40 hover:bg-opacity-10 duration-500 border-y  flex justify-center items-center">
              <div
                id="houseServiceContent"
                className="w-full bg-black bg-opacity-40 text-center shadow-inner shadow-xl h-full align-middle flex flex-col justify-between  "
              >
                <h1 className="mb-5 text-2xl font-bold p-3 bg-black bg-opacity-40 w-full">
                  Real Estate
                </h1>
                <div className="p-3">
                  <p className="mb-5 p-3 text-xl">
                    When you are ready to market your house we will be ready to
                    clean it.
                  </p>
                  {/* <button className="btn btn-base-100 btn-sm mb-3">
                    Inquire
                  </button> */}
                </div>
              </div>
            </div>
          </div>
          {/* Car Detailing */}
          <div
            className=" min-w-1/3 hero   hover:scale-105 duration-500"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          >
            <div className="hero-overlay bg-black bg-opacity-40 hover:bg-opacity-10 duration-500 border-y  flex justify-center items-center">
              <div
                id="houseServiceContent"
                className="w-full bg-black bg-opacity-40 text-center shadow-inner shadow-xl h-full align-middle flex flex-col justify-between  "
              >
                <h1 className="mb-5 text-2xl font-bold p-3 bg-black bg-opacity-40 w-full">
                  Vehicle Detailing
                </h1>
                <div className="p-3">
                  <p className="mb-5 p-3 text-xl">
                    We are dedicated to helping you get your car, RV,
                    motorcycle, boat, and any other motorized toy detailed!
                  </p>
                  {/* <button className="btn btn-base-100 btn-sm mb-3">
                    Inquire
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
