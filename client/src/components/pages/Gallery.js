import React from "react";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';
import { ElfsightWidget } from "react-elfsight-widget";

const Gallery = () => {
  return (
    <>
      <h1
        className="text-info text-4xl py-3 text-center border-b-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        Gallery
      </h1>
      <div className="px-8">
        <ElfsightWidget
          widgetId="94b15753-f2ca-40b1-b394-4c702a73db5b"
          lazy-modern
        />
        {/* <div
          className="elfsight-app-94b15753-f2ca-40b1-b394-4c702a73db5b"
          data-elfsight-app-lazy
        ></div> */}
      </div>
    </>
  );
};

export default Gallery;
