import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";

const Dashboard = () => {
  const { loading, data, error, refetch } = useQuery(QUERY_ME, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const me = data?.me || [];

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    console.log(me);
    const invoices = me.invoices.filter(function (obj) {
      return obj.paid !== true;
    });
    console.log(invoices);

    // Calculate total due
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
                <a href="/portal/transactionHistory">
                  View Transaction History
                </a>
              </li>
              <li>
                <a href="/portal/referral">Refer a Friend</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col-reverse">
            <div id="accountStatement">
              <h2 className="text-center text-xl">Account Statement</h2>
              <div className="m-3 bg-accent border rounded-3xl p-4">
                <table className="w-full text-center">
                  <thead>
                    <tr className="border-b">
                      <th>Date of Service</th>
                      <th>Services</th>
                      <th>Amount</th>
                      <th>Deposit Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) =>
                      !invoice.paid ? (
                        <tr>
                          <td className="border-b py-3">
                            {invoice.dateOfCleaning}
                          </td>
                          <td className="border-b py-3">{invoice.services}</td>
                          <td className="border-b py-3">
                            {"$" + invoice.amount}
                          </td>
                          <td className="border-b py-3">
                            <p>{"$" + invoice.depositAmount}</p>
                            <p>
                              {invoice.depositPaid ? (
                                <p>✅</p>
                              ) : (
                                <p>
                                  <Link
                                    className="btn btn-xs btn-primary text-white"
                                    to={"/portal/pay/" + invoice._id}
                                  >
                                    PAY DEPOSIT
                                  </Link>
                                </p>
                              )}
                            </p>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div id="schedule">
              <h2 className="text-center text-xl">Upcoming Cleanings</h2>
              <div className="bg-accent p-10 rounded-3xl border border-white m-3">
                <p className="text-center">You have no scheduled cleanings.</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Dashboard;
