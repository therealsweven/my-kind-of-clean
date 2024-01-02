import React from "react";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';
import QuoteForm from "../forms/QuoteForm";

const Quote = () => {
  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">
        GET A FREE QUOTE TODAY
      </h1>
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
            href="mailto:info@mykindofclean.net"
            className="ml-3 underline transform transition duration-500 hover:scale-125 hover:text-white"
          >
            info@mykindofclean.net
          </a>
        </h2>
      </div>
      <div className="bg-primary pb-3">
        <h3 className="text-info text-xl font-semibold text-center mb-3">or</h3>
        <h2 className="text-info text-2xl font-bold text-center">
          Send us a message:
        </h2>
      </div>
      <div className="flex justify-center">
        <QuoteForm className="w-1/2" />
      </div>
    </>
  );
};

export default Quote;
