import React from "react";
import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const NavBar = () => {
  return (
    <>
      <div className="navbar bg-accent">
        <div className="flex-1">
          <Link
            id="headerLogo"
            to="/"
            className="btn btn-ghost p-3 font-bold text-info"
          >
            My Kind of Clean
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/quote" className="text-info">
                Quote
              </Link>
            </li>
            <li>
              <details>
                <summary className="text-info">More</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
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
                  <li>
                    <a className="text-info">Client Login</a>
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

export default NavBar;
