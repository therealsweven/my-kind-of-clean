import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

const Settings = () => {
  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">Settings</h1>
      <h2>Account Info:</h2>
      <div className="flex">
        <h3>First Name</h3>
        <p></p>
      </div>
      <div className="flex">
        <h3>Last Name</h3>
        <p></p>
      </div>
      <div className="flex">
        <h3>Email</h3>
        <p></p>
      </div>
      <div className="flex">
        <h3>Phone</h3>
        <p></p>
      </div>
      <div className="flex">
        <h3>Preffered Communication Method</h3>
        <p></p>
      </div>
      <div className="flex">
        <h3>Mailing Address</h3>
        <p></p>
        <p></p>
      </div>
    </>
  );
};

export default Settings;
