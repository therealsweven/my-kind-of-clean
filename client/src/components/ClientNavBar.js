import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import headerLogo from "./images/textonly_nobuffer_pixian_ai.png";
import headerIcon from "./images/icononly_transparent_nobuffer.png";
//import { useQuery } from '@apollo/client';

const ClientNavBar = () => {
  return (
    <>
      <div
        className="navbar"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="flex-1">
          <img className="h-8" src={headerIcon}></img>
          <Link
            to="/portal/dashboard"
            className="headerLogo btn btn-ghost p-2 m-1 font-bold text-info w-5/6 lg:w-1/4"
          >
            <img src={headerLogo}></img>
          </Link>
        </div>
        <p></p>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className="text-info">Menu</summary>
                <ul className="p-2 rounded-t-none">
                  <li>
                    <Link to="/portal/dashboard" className="text-info">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/portal/scheduler" className="text-info">
                      Schedule a Cleaning
                    </Link>
                  </li>
                  <li>
                    <Link to="/portal/settings" className="text-info">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/portal/referral" className="text-info">
                      Refer a Friend
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={() => Auth.logout()}
                      className="text-info"
                    >
                      Log Out
                    </Link>
                  </li>
                  <li className="flex justify-center">
                    <></>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ClientNavBar;
