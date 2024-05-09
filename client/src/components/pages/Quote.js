import React from "react";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';
import QuoteForm from "../forms/QuoteForm";
import { useEffect } from "react";
import { ElfsightWidget } from "react-elfsight-widget";

const Quote = () => {
  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">
        GET A FREE QUOTE TODAY
      </h1>
      <div className="flex flex-wrap justify-center align-middle">
        <div className="lg:w-1/2">
          <div className="border border-info mx-6">
            <div className="flex flex-wrap justify-center bg-primary text-info font-semibold text-2xl p-3">
              <h2 className="m-3">
                Call Us:{" "}
                <a
                  href="tel:7208463205"
                  className="ml-3 underline transform transition duration-500 hover:scale-125 hover:text-white"
                >
                  (720) 846-3205
                </a>
              </h2>
              <h2 className="m-3">
                Email Us:
                <a
                  href="mailto:support@mykindofclean.net"
                  className="ml-3 underline transform transition duration-500 hover:scale-125 hover:text-white"
                >
                  support@mykindofclean.net
                </a>
              </h2>
            </div>
            <div className="bg-primary pb-3">
              <h3 className="text-info text-xl font-semibold text-center mb-3">
                or
              </h3>
              <h2 className="text-info text-2xl font-bold text-center">
                Send us a message:
              </h2>
              <div className="flex justify-center">
                <QuoteForm className="w-1/2" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-full md:w-full px-6">
          <ElfsightWidget widgetID="ab084af9-3d1d-4b48-913c-d4cc294715e5" />
          {/* <div
            className="elfsight-app-ab084af9-3d1d-4b48-913c-d4cc294715e5 w-full"
            data-elfsight-app-lazy
          ></div> */}
        </div>
      </div>
    </>
  );
};

export default Quote;
