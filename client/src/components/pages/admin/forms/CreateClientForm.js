import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CLIENT } from "../../../../utils/mutations";
import * as Yup from "yup";

export default function CreateClientForm() {
  const [createClient] = useMutation(CREATE_CLIENT);
  // showing successful creation of client
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
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    commMethod: "",
    password: "password",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      await createClient({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          commMethod: values.commMethod,
          password: "password",
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

  return (
    <div className="bg-accent p-10  rounded-lg m-6 border border-accent">
      {formOpen && (
        <Formik
          id="createClientForm"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-control">
                <label className="label" htmlFor="firstName">
                  <span className="label-text text-xl ">First</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="firstName"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="lastName">
                  <span className="label-text text-xl ">Last</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text text-xl ">Email</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="phone">
                  <span className="label-text text-xl ">Phone</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="phone"
                />
                <ErrorMessage name="phone" component="div" className="error" />
                <p className="text-s">(Optional)</p>
              </div>
              <div role="group" aria-labelledby="commMethod">
                <label className="label" htmlFor="messageBody">
                  <span className="label-text text-xl ">
                    Preferred Contact Method
                  </span>
                </label>
                <label>
                  <Field
                    type="radio"
                    name="commMethod"
                    value="Email"
                    className="mr-2"
                  />
                  Email
                </label>
                <label className="ml-6">
                  <Field
                    type="radio"
                    name="commMethod"
                    value="Phone"
                    className="mr-2"
                  />
                  Phone
                </label>
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
        <p className="max-w-md my-6 text-lg">Client Successfully Created</p>
      )}
    </div>
  );
}
