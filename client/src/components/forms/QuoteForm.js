import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_INQUIRY } from "../../utils/mutations";
import * as Yup from "yup";

export default function QuoteForm() {
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
    phone: "",
    message: "",
    location: "",
    commMethod: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
    message: Yup.string().required("This field is required"),
    location: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      await createInquiry({
        variables: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          message: values.message,
          location: values.location,
          commMethod: values.commMethod,
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
          id="contactForm"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* Name */}
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text text-xl text-info ">Name</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="name"
                />
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              {/* Email */}
              <div className="form-control">
                <label className="label" htmlFor="email">
                  <span className="label-text text-xl text-info ">Email</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="error" />
                <p className="text-s text-info">
                  We'll never share your information with anyone else.
                </p>
              </div>
              {/* Phone */}
              <div className="form-control">
                <label className="label" htmlFor="phone">
                  <span className="label-text text-xl text-info">Phone</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="phone"
                />
                <ErrorMessage name="phone" component="div" className="error" />
                <p className="text-s text-info">(Optional)</p>
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
              {/* Location */}
              <div className="form-control">
                <label className="label" htmlFor="location">
                  <span className="label-text text-xl text-info ">Zipcode</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="location"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="error"
                />
              </div>
              {/* Comm Pref */}
              <div role="group" aria-labelledby="commMethod">
                <label className="label" htmlFor="messageBody">
                  <span className="label-text text-xl text-info">
                    How would you like us to contact you?
                  </span>
                </label>
                <label className="ml-6 text-info">
                  <Field
                    type="radio"
                    name="commMethod"
                    value="Email"
                    className="mr-2"
                  />
                  Email
                </label>
                <label className="ml-6 text-info">
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
        <p className="max-w-md my-6 text-lg text-info">
          Thank you for reaching out! Please check your email for confirmation,
          and we will get back to you as soon as possible.
        </p>
      )}
    </div>
  );
}
