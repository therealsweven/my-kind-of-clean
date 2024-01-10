import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
//import { useQuery } from '@apollo/client';

const ClientNavBar = () => {
  return (
    <>
      <div className="navbar bg-accent">
        <div className="flex-1">
          <Link
            to="/portal/dashboard"
            className="headerLogo btn btn-ghost p-3 font-bold text-info"
          >
            My Kind of Clean
          </Link>
        </div>
        <p>
          {/* 
          
          template <class C>
          class board implements piece {
            piece* = malloc(sizeof(C)^2);





          } ;
          
          
          
          
          
          
          */}
        </p>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary className="text-info">Menu</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
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
                      Settings
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
