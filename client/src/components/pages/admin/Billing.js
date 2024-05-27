import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import CreateInvoiceForm from "./forms/CreateInvoiceForm";
import { QUERY_OPEN_INVOICES } from "../../../utils/queries";
export default function Billing() {
  const { loading, data, error, refetch } = useQuery(QUERY_OPEN_INVOICES, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const invoices = data?.openInvoices || [];

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    const sortedInvoices = [...invoices].sort((a, b) =>
      a.dateOfCleaning > b.dateOfCleaning ? 1 : -1
    );
    console.log(invoices);
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
                </tr>
              </thead>
              <tbody>
                {sortedInvoices.map((invoice) => (
                  <tr>
                    <td>
                      {invoice.client.firstName + " " + invoice.client.lastName}
                    </td>
                    <td>{invoice.amount}</td>
                    <td>{invoice.dateOfCleaning}</td>
                  </tr>
                ))}
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
}
