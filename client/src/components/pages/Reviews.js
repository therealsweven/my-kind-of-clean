import React from "react";
import { ElfsightWidget } from "react-elfsight-widget";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Reviews = () => {
  return (
    <>
      <h1
        className="text-info text-4xl py-3 text-center border-b-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        Reviews
      </h1>
      <div className="bg-info p-6 mb-6">
        <ElfsightWidget widgetId="f08f864f-78f4-44e3-b53d-15236a657641" />
      </div>
    </>
  );
};

export default Reviews;
