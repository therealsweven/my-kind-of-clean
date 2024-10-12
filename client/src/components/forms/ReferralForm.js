import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_INQUIRY } from "../../utils/mutations";
import * as Yup from "yup";

export default function ReferralForm() {
  const [createInquiry] = useMutation(CREATE_INQUIRY);
  const [successOpen, setSuccessOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  function showSuccessMessage() {
    setSuccessOpen((successOpen) => !successOpen);
    setFormOpen((formOpen) => !formOpen);
  }

  const initialValues = {
    name: "",
    email: "",
    friendName: "",
    friendEmail: "",
    friendPhone: "",
    message: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    friendName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
    friendEmail: Yup.string().email("Email address not formatted correctly"),
    message: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      await createInquiry({
        variables: {
          name: values.name,
          email: values.email,
          friendEmail: values.friendEmail,
          friendName: values.friendName,
          friendPhone: values.friendPhone,
          message: values.message,
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
    <div className="bg-primary p-10 min-w-[50%] rounded-lg m-6 border border-accent">
      {formOpen && (
        <Formik
          id="referralForm"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Your Name */}
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text text-xl text-info ">
                    Your Name
                  </span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              {/* Your Email */}
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text text-xl text-info ">
                    Your Email
                  </span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              {/* Friend Name */}
              <div className="form-control">
                <label className="label" htmlFor="friendName">
                  <span className="label-text text-xl text-info ">
                    Friend's Name
                  </span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="friendName"
                />
                <ErrorMessage
                  name="friendName"
                  component="div"
                  className="error"
                />
              </div>
              <p className="text-lg text-info mt-5">
                Please provide either a phone number or an email address (or
                both) for the person you are referring.
              </p>
              {/* Friend Email */}
              <div className="form-control">
                <label className="label" htmlFor="friendEmail">
                  <span className="label-text text-xl text-info ">
                    Friend's Email
                  </span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="friendEmail"
                />
                <ErrorMessage
                  name="friendEmail"
                  component="div"
                  className="error"
                />
              </div>
              {/* Friend Phone */}
              <div className="form-control">
                <label className="label" htmlFor="friendPhone">
                  <span className="label-text text-xl text-info">
                    Friend's Phone
                  </span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="friendPhone"
                />
                <ErrorMessage
                  name="friendPhone"
                  component="div"
                  className="error"
                />
              </div>
              {/* Message */}
              <div className="form-control">
                <label className="label" htmlFor="message">
                  <span className="label-text text-xl text-info">Message</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  as="textarea"
                  name="message"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  className="btn btn-lg btn-accent mx-auto"
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
        <p className="max-w-md my-6 text-lg">
          Thank you for reaching out! Please check your email for confirmation,
          and we will get back to you as soon as possible.
        </p>
      )}
    </div>
  );
}
