import React from "react";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Dashboard = () => {
  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">Dashboard</h1>
      <div className="flex justify-between">
        <div id="quickLinks">
          <h2 className="text-center text-xl">Quick Links</h2>
          <ul>
            <li>
              <a href="/portal/scheduler">Schedule a Cleaning</a>
            </li>
            <li>
              <a href="/portal/transactionHistory">View Transaction History</a>
            </li>
            <li>
              <a href="/portal/referral">Refer a Friend</a>
            </li>
          </ul>
        </div>
        <div id="accountStatement" className="border border-secondary">
          <h2 className="text-center text-xl">Account Statement</h2>
        </div>
        <div id="schedule">
          <h2 className="text-center text-xl">Upcoming Cleanings</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
