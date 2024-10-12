import React from "react";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';
import ReferralForm from "../forms/ReferralForm";

const Refer = () => {
  return (
    <>
      <h1
        className="text-info text-4xl py-3 text-center border-b-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        Refer a Friend
      </h1>
      <ReferralForm />
    </>
  );
};

export default Refer;
