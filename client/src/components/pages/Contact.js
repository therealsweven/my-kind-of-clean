import React from "react";
import QuoteForm from "../forms/QuoteForm";
import { ElfsightWidget } from "react-elfsight-widget";

const Contact = () => {
  return (
    <>
      <h1
        className="text-info text-4xl py-3 text-center border-b-2 mb-3"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        Contact
      </h1>
      <div className="flex flex-wrap justify-center items-center px-1">
        <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
          <div className="border border-info rounded-lg overflow-hidden">
            <div className="bg-primary text-info font-semibold text-2xl p-1 text-center">
              <h2 className="my-3">
                Call Us:{" "}
                <a
                  href="tel:7208463205"
                  className="ml-3 underline transform transition duration-500 hover:scale-125 hover:text-white"
                >
                  (720) 846-3205
                </a>
              </h2>
              <h2 className="my-3">
                Email Us:{" "}
                <a
                  href="mailto:support@mykindofclean.net"
                  className="ml-3 underline transform transition duration-500 hover:scale-125 hover:text-white"
                >
                  support@mykindofclean.net
                </a>
              </h2>
            </div>
            <div className="bg-primary pb-6">
              <h3 className="text-info text-xl font-semibold text-center mb-3">
                or
              </h3>
              <h2 className="text-info text-2xl font-bold text-center mb-6">
                Send us a message:
              </h2>
              <div className="flex justify-center">
                <QuoteForm className="w-full lg:w-2/3" />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full lg:w-1/2 px-4">
          <div className="w-full h-full flex justify-center items-center">
            <ElfsightWidget widgetID="ab084af9-3d1d-4b48-913c-d4cc294715e5" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Contact;
