import React from "react";
import { Link } from "react-router-dom";
import ClientLoginForm from "./forms/ClientLoginForm";
import headerLogo from "./images/textonly_nobuffer_pixian_ai.png";
import headerIcon from "./images/icononly_transparent_nobuffer.png";
//import { useQuery } from '@apollo/client';

const NavBar = () => {
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
            to="/"
            className="headerLogo btn btn-ghost p-2 m-1 font-bold text-info w-5/6 lg:w-1/4"
          >
            <img src={headerLogo}></img>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/contact" className="text-info">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-info">
                Services
              </Link>
            </li>
            <li>
              <details>
                <summary className="text-info">More</summary>
                <ul className="p-2 rounded-t-none">
                  <li>
                    <Link to="/about" className="text-info">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/gallery" className="text-info">
                      Gallery
                    </Link>
                  </li>
                  <li>
                    <Link to="/reviews" className="text-info">
                      Reviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/referral" className="text-info">
                      Refer a Friend
                    </Link>
                  </li>
                  {/* <li className="flex justify-center">
                    <ClientLoginForm />
                  </li> */}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
