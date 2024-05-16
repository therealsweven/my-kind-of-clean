import React from "react";
import { Link } from "react-router-dom";
import Inquiries from "./Inquiries";
import { useState } from "react";
export default function AdminNavBar() {
  // console.log(document.location.pathname);
  // const [path,setPath] = document.location.pathname;
  return (
    <>
      <div
        className="flex justify-between border-b"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1585933646706-7b629be871aa?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
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
          className="p-2 w-full text-center hover:bg-accent hover:bg-opacity-30"
        >
          Inquiries
        </Link>
        {/* )} */}
        <Link
          to="/admin/scheduling"
          className="p-2 w-full text-center hover:bg-accent hover:bg-opacity-30"
        >
          Scheduling
        </Link>
        <Link
          to="/admin/billing"
          className="p-2 w-full text-center hover:bg-accent hover:bg-opacity-30"
        >
          Billing
        </Link>
        <Link
          to="/admin/clients"
          className="p-2 w-full text-center hover:bg-accent hover:bg-opacity-30"
        >
          Clients
        </Link>
        <Link
          to="/admin/settings"
          className="p-2 w-full text-center hover:bg-accent hover:bg-opacity-30"
        >
          Settings
        </Link>
      </div>
    </>
  );
}
