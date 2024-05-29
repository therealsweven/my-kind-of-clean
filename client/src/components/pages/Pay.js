import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useQuery } from "@apollo/client";
import { PAY, QUERY_INVOICE_BY_ID } from "../../utils/queries";
import { useParams } from "react-router-dom";

import CheckoutForm from "./forms/CheckoutForm";
// import "../../App.css";

const stripePromise = loadStripe(
  "pk_test_51PLBqxGSfaj7eX5po3g3pXPSdmr0P7Xv9IPIOgjBrtQEyTM1Oh7ZIWwg6jS044VgsChYdT1qDA2HWzozl0hOZWst00p1Uw89DJ"
);

export default function Pay() {
  const [paymentAmount, setPaymentAmount] = useState({
    amount: 1,
    checked: "payInFull",
  });
  const [checked, setChecked] = useState("payInFull");
  let { invoiceId } = useParams();
  const {
    loading: invoiceLoading,
    data: invoiceData,
    error: invoiceError,
  } = useQuery(QUERY_INVOICE_BY_ID, { variables: { invoiceId: invoiceId } });
  const invoice = invoiceData?.invoiceById || {};

  const {
    loading: payLoading,
    data: payData,
    error: payError,
    refetch,
  } = useQuery(PAY, { variables: { amount: paymentAmount.amount } });

  useEffect(() => {
    if (!invoiceLoading && invoiceData) {
      console.log(invoice);
    }
  }, [invoiceLoading, invoiceData]);

  useEffect(() => {
    if (!payLoading && payData) {
      console.log(payData);
    }
  }, [payLoading, payData]);

  const clientSecret = payData?.createCheckoutSession || "";

  if (invoiceLoading || payLoading) {
    return <h2>...loading</h2>;
  }

  if (invoiceError || payError) {
    return (
      <h2>
        {"Invoice Error: " +
          (invoiceError?.message || "Pay Error: " + payError?.message)}
      </h2>
    );
  }

  const appearance = {
    theme: "night",
    labels: "floating",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Pay">
      <h1 className="text-3xl text-center m-3">PAY NOW</h1>
      <div id="invoiceContainer" className="bg-secondary border border-accent">
        <h3 className="text-xl text-center">Invoice Details</h3>
        <h4 className="text-l">
          {invoice.services}: ${invoice.amount}
        </h4>
        <h4 className="text-l">Deposit: ${invoice.depositAmount}</h4>
        <h4 className="text-l">
          Deposit Status: {invoice.depositPaid === true ? "PAID" : "UNPAID"}
        </h4>
        <div className="flex">
          <form>
            {invoice.depositPaid === false ? (
              <div className="flex">
                <input
                  type="radio"
                  name="paymentAmount"
                  checked={checked === "payDeposit"}
                  onChange={() => {
                    setPaymentAmount({
                      amount: invoice.depositAmount,
                      checked: "payDeposit",
                    });
                    setChecked("payDeposit");
                  }}
                />
                <p>Pay Deposit</p>
                <input
                  type="radio"
                  name="paymentAmount"
                  checked={checked === "payInFull"}
                  onChange={() => {
                    setPaymentAmount({
                      amount:
                        invoice.amount -
                        invoice.depositAmount -
                        (invoice.amount * invoice.discount) / 100,
                      checked: "payInFull",
                    });
                    setChecked("payInFull");
                  }}
                />
                <p>Pay In Full</p>
              </div>
            ) : (
              <div className="flex">
                <input
                  type="checkbox"
                  checked={checked === "payInFull"}
                  onChange={() => {
                    setPaymentAmount({
                      amount:
                        invoice.amount -
                        invoice.depositAmount -
                        (invoice.amount * invoice.discount) / 100,
                      checked: "payInFull",
                    });
                    setChecked("payInFull");
                  }}
                />
                <p>
                  I agree to pay the remaining balance of $
                  {invoice.amount -
                    invoice.depositAmount -
                    (invoice.amount * invoice.discount) / 100}
                </p>
              </div>
            )}
          </form>
        </div>
        <p>Payment Amount: ${paymentAmount.amount}</p>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
