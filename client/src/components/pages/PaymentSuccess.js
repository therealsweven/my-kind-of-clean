import { React, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_INVOICE } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

export default function PaymentSuccess() {
  const { paymentAmount, invoiceId } = useParams();
  const [updateInvoice] = useMutation(UPDATE_INVOICE);

  const updateDB = async () => {
    const invoice = await updateInvoice({
      variables: { invoiceId: invoiceId, paymentAmount: Number(paymentAmount) },
    });
    if (invoice) {
      console.log(invoice);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    updateDB();
  }, []);

  if (updateDB) {
    return (
      <>
        <h1 className="text-4xl text-center my-6">PAYMENT SUCCESSFUL</h1>
      </>
    );
  } else {
    return (
      <>
        <p>...Loading</p>
      </>
    );
  }
}
