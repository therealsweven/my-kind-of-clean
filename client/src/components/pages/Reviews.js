import React from "react";
import { ElfsightWidget } from "react-elfsight-widget";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Reviews = () => {
  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">Reviews</h1>
      <div className="bg-info p-6 my-6">
        <ElfsightWidget widgetID="f08f864f-78f4-44e3-b53d-15236a657641" />
      </div>
    </>
  );
};

export default Reviews;
