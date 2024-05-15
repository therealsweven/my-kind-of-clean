import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import CreateInvoiceForm from "./forms/CreateInvoiceForm";
export default function Billing() {
  // if (loading) {
  //   return <h2>...loading</h2>;
  // }
  // if (error) {
  //   return <h2>Error: {error.message}</h2>;
  // }

  // if (!loading) {

  return (
    <>
      <h2 className="my-3 text-center text-2xl">Billing</h2>
      <div className="flex flex-col-reverse lg:flex-row justify-center">
        <div className="w-1/2">
          <h3 className="my-2 text-center text-xl">Open Invoices</h3>
          <table className="w-11/12">
            <thead>
              <tr>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Overdue</th>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <div className="w-1/2">
          <h3 className="my-2 text-center text-xl">Create New Invoice</h3>
          <CreateInvoiceForm />
        </div>
      </div>
    </>
  );
}
// }
