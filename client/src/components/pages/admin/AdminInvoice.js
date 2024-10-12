import { React, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import CreateInvoiceForm from "./forms/CreateInvoiceForm";
import { QUERY_INVOICE_BY_ID } from "../../../utils/queries";
import logo from "../../images/fulllogo_transparent_nobuffer.png";
export default function AdminInvoice() {
  const invoiceId = useParams().invoiceId;
  console.log(invoiceId);
  const { loading, data, error, refetch } = useQuery(QUERY_INVOICE_BY_ID, {
    variables: { invoiceId },
  });
  const invoice = data?.invoiceById || [];

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    console.log(invoice);
    const date = new Date(Number(invoice.createdAt));
    console.log(date);
    return (
      <>
        <div className="bg-primary">
          <div className="bg-accent h-4"></div>
          <div className="flex justify-between flex-col md:flex-row lg:flex-row align-middle">
            <div className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 text-center">
              <img src={logo}></img>
              <p className="mt-2">My Kind of Clean, LLC</p>
              <p>8300 Sheridan Blvd, 17J</p>
              <p>Westminster, CO 80003</p>
              <p>(720) 846-3205</p>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 text-center justify-evenly flex flex-col">
              <h1 className="text-2xl">INVOICE</h1>
              <div className="flex justify-between">
                <h2 className="font-bold text-lg">Date:</h2>
                <p className="text-center">{date.toString().slice(0, 15)}</p>
              </div>
              <div className="flex justify-between">
                <h2 className="font-bold text-lg">Invoice No:</h2>
                <p>xxxx</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:flex-row justify-center">
          <div className="w-1/2">
            <div className="flex justify-between  border-b">
              <h2 className="text-xl">BILL TO</h2>
              <Link to={"/admin/clients/" + invoice.client._id}>
                {" "}
                View Client
              </Link>
            </div>
            <p>{invoice.client.firstName + " " + invoice.client.lastName}</p>
            <p>{invoice.client.street}</p>
            <p>
              {invoice.client.city +
                ", " +
                invoice.client.state +
                " " +
                invoice.client.zip}
            </p>
          </div>
        </div>
      </>
    );
  }
}
