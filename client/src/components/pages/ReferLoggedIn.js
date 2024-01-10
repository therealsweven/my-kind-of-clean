import React from "react";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';
import ReferralFormLoggedIn from "../forms/ReferralFormLoggedIn";

const ReferLoggedIn = () => {
  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">Refer A Friend</h1>
      <ReferralFormLoggedIn />
    </>
  );
};

export default ReferLoggedIn;
