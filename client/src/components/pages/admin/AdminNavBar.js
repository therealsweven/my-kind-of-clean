import React from "react";
import { Link } from "react-router-dom";
import Inquiries from "./Inquiries";
import { useState } from "react";
export default function AdminNavBar() {
  // console.log(document.location.pathname);
  // const [path,setPath] = document.location.pathname;
  return (
    <>
      <div className="flex justify-between">
        {/* {path === "/admin/inquiries" ? (
          <Link
            to="/admin/inquiries"
            className="bg-primary border border-accent p-2 w-full text-center"
          >
            Inquiries
          </Link>
        ) : ( */}
        <Link
          to="/admin/inquiries"
          className="bg-accent border border-primary p-2 w-full text-center"
        >
          Inquiries
        </Link>
        {/* )} */}
        <Link
          to="/admin/scheduling"
          className="bg-accent border border-primary p-2 w-full text-center"
        >
          Scheduling
        </Link>
        <Link
          to="/admin/billing"
          className="bg-accent border border-primary p-2 w-full text-center"
        >
          Billing
        </Link>
        <Link
          to="/admin/clients"
          className="bg-accent border border-primary p-2 w-full text-center"
        >
          Clients
        </Link>
        <Link
          to="/admin/settings"
          className="bg-accent border border-primary p-2 w-full text-center"
        >
          Settings
        </Link>
      </div>
    </>
  );
}
