import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_INVOICE } from "../../../../utils/mutations";
import { QUERY_ACTIVE_CLIENTS } from "../../../../utils/queries";
import * as Yup from "yup";

export default function CreateInvoiceForm() {
  const [createInvoice] = useMutation(CREATE_INVOICE);
  const { loading, data, error, refetch } = useQuery(QUERY_ACTIVE_CLIENTS, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const clients = data?.activeClients || [];

  // showing successful creation of invoice
  const [successOpen, setSuccessOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  function showSuccessMessage() {
    setSuccessOpen((successOpen) => !successOpen);
    setFormOpen((formOpen) => !formOpen);
    setTimeout(() => {
      setSuccessOpen((successOpen) => !successOpen);
      setFormOpen((formOpen) => !formOpen);
    }, 5000);
  }

  const initialValues = {
    dateOfCleaning: "",
    client: "Please Select Client",
    cleaning: "",
    amount: "0",
    discount: "0",
    services: "",
    notes: "",
    paid: false,
    paymentMethod: "N/A",
    deposit: true,
    depositAmount: "0",
    depositPaid: false,
    depositPaymentMethod: "N/A",
  };

  const validationSchema = Yup.object().shape({
    dateOfCleaning: Yup.date().required("This field is required"),
    client: Yup.string().required("This field is required"),
    cleaning: Yup.string(),
    amount: Yup.number().required("This field is required"),
    discount: Yup.number(),
    services: Yup.string().required("This fiel id required"),
    notes: Yup.string(),
    paid: Yup.bool().required("This field is required"),
    paymentMethod: Yup.string(),
    deposit: Yup.bool().required("This field is required"),
    depositAmount: Yup.number(),
    depositPaid: Yup.bool(),
    depositPaymentMethod: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      await createInvoice({
        variables: {
          dateOfCleaning: values.dateOfCleaning,
          client: values.client,
          cleaning: values.cleaning,
          amount: Number(values.amount),
          discount: Number(values.discount),
          services: values.services,
          notes: values.notes,
          paid: values.paid,
          paymentMethod: values.paymentMethod,
          deposit: values.deposit,
          depositAmount: Number(values.depositAmount),
          depositPaid: values.depositPaid,
          depositPaymentMethod: values.depositPaymentMethod,
        },
      });
      resetForm();
      console.log("submitted");
      showSuccessMessage();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };
  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    // sort clients
    const clientsLastAscending = [...clients].sort((a, b) =>
      a.lastName > b.lastName ? 1 : -1
    );
    console.log(clientsLastAscending);
    return (
      <div className="bg-accent p-10 min-w-[50%] rounded-lg m-6 border border-accent">
        {formOpen && (
          <Formik
            id="createInvoiceForm"
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                {/* Date of Cleaning */}
                <div className="form-control">
                  <label className="label" htmlFor="discount">
                    <span className="label-text text-xl ">
                      Date of Cleaning
                    </span>
                  </label>
                  <Field
                    className="input input-bordered"
                    type="date"
                    name="dateOfCleaning"
                  />
                  <ErrorMessage
                    name="dateOfCleaning"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Clients populated from query and selected by admin user */}
                <div className="form-control">
                  <label className="label" htmlFor="client">
                    <span className="label-text text-xl ">Client</span>
                  </label>
                  <Field
                    name="client"
                    as="select"
                    className="input input-bordered"
                  >
                    <option value="">Please Select Client</option>
                    {clientsLastAscending.map((client) => (
                      <option key={client._id} value={client._id}>
                        {client.lastName}, {client.firstName}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="client"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Charge Amount before discount in an integer */}
                <div className="form-control">
                  <label className="label" htmlFor="amount">
                    <span className="label-text text-xl ">Amount</span>
                  </label>
                  <Field
                    className="input input-bordered"
                    type="text"
                    name="amount"
                  />
                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Discount percentage in integer for */}
                <div className="form-control">
                  <label className="label" htmlFor="discount">
                    <span className="label-text text-xl ">Discount (%)</span>
                  </label>
                  <Field
                    className="input input-bordered"
                    type="text"
                    name="discount"
                  />
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="error"
                  />
                  <p className="text-s">(Optional)</p>
                </div>

                {/* Services provided to be put on invoice */}
                <div className="form-control">
                  <label className="label" htmlFor="services">
                    <span className="label-text text-xl ">Services</span>
                  </label>
                  <Field
                    name="services"
                    type="text"
                    className="input input-bordered"
                  />
                  <ErrorMessage
                    name="services"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Notes */}
                <div className="form-control">
                  <label className="label" htmlFor="notes">
                    <span className="label-text text-xl ">Notes</span>
                  </label>
                  <Field
                    className="input input-bordered"
                    type="text"
                    name="notes"
                  />
                  <ErrorMessage
                    name="notes"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Has the bill already been paid? */}
                <div role="group" aria-labelledby="paid">
                  <label className="label" htmlFor="paid">
                    <span className="label-text text-xl ">
                      Has this bill already been paid?
                    </span>
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="paid"
                      // need to mark paid as true if paid
                      value={true}
                      onChange={() => setFieldValue("paid", true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="ml-6">
                    <Field
                      type="radio"
                      name="paid"
                      //mark paid as false if not paid yet
                      value={false}
                      onChange={() => setFieldValue("paid", false)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                {/* Is deposit paid? */}
                <div role="group" aria-labelledby="depositPaid">
                  <label className="label" htmlFor="depositPaid">
                    <span className="label-text text-xl ">
                      Has the deposit been paid?
                    </span>
                  </label>
                  <label>
                    <Field
                      type="radio"
                      name="depositPaid"
                      // need to mark as true if paid
                      value={true}
                      onChange={() => setFieldValue("depositPaid", true)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="ml-6">
                    <Field
                      type="radio"
                      name="depositPaid"
                      //mark active as false if not paid yet
                      value={false}
                      onChange={() => setFieldValue("depositPaid", false)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
                {/* Deposit Amount */}
                <div className="form-control">
                  <label className="label" htmlFor="depositAmount">
                    <span className="label-text text-xl ">Deposit Amount</span>
                  </label>
                  <Field
                    className="input input-bordered"
                    type="text"
                    name="depositAmount"
                  />
                  <ErrorMessage
                    name="depositAmount"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-control mt-6">
                  <button
                    className="btn btn-lg btn-secondary mx-auto"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
        {successOpen && (
          <p className="max-w-md my-6 text-lg">Invoice Successfully Created</p>
        )}
      </div>
    );
  }
}
