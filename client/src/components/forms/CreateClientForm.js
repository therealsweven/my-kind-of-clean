import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { CREATE_CLIENT } from "../../utils/mutations";
import * as Yup from "yup";
import { Link } from "react-router-dom";

export default function CreateClientForm() {
  const [createClient] = useMutation(CREATE_CLIENT);
  const [successOpen, setSuccessOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  function showSuccessMessage() {
    setSuccessOpen((successOpen) => !successOpen);
    setFormOpen((formOpen) => !formOpen);
  }

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    commMethod: "",
    subscribe: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
    password2: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
    street: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    zip: Yup.number().required("This field is required"),
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
          password: values.password,
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
          commMethod: values.commMethod,
          subscribe: values.subscribe,
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
              {/* First Name */}
              <div className="form-control">
                <label className="label" htmlFor="firstName">
                  <span className="label-text text-xl text-info ">
                    First Name
                  </span>
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
              {/* Last Name */}
              <div className="form-control">
                <label className="label" htmlFor="lastName">
                  <span className="label-text text-xl text-info ">
                    Last Name
                  </span>
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
              {/* Street */}
              <div className="form-control">
                <label className="label" htmlFor="street">
                  <span className="label-text text-xl text-info ">Street</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="street"
                />
                <ErrorMessage name="street" component="div" className="error" />
              </div>
              {/* City */}
              <div className="form-control">
                <label className="label" htmlFor="city">
                  <span className="label-text text-xl text-info ">City</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="city"
                />
                <ErrorMessage name="city" component="div" className="error" />
              </div>
              {/* State */}
              <div className="form-control">
                <label className="label" htmlFor="state">
                  <span className="label-text text-xl text-info ">State</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="state"
                />
                <ErrorMessage name="state" component="div" className="error" />
              </div>
              {/* Zip */}
              <div className="form-control">
                <label className="label" htmlFor="zip">
                  <span className="label-text text-xl text-info ">Zipcode</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="text"
                  name="zip"
                />
                <ErrorMessage name="zip" component="div" className="error" />
              </div>
              {/* Password */}
              <div className="form-control">
                <label className="label" htmlFor="password">
                  <span className="label-text text-xl text-info">Password</span>
                </label>
                <Field
                  className="input input-bordered"
                  type="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              {/* Password Confirm */}
              <div className="form-control">
                <label className="label" htmlFor="password2">
                  <span className="label-text text-xl text-info">
                    Re-enter Password
                  </span>
                </label>
                <Field
                  className="input input-bordered"
                  type="password"
                  name="password2"
                />
                <ErrorMessage
                  name="password2"
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
              {/* Subscribe */}
              <div className="flex justify-center mt-4">
                <Field
                  className="input input-bordered h-6 mr-3"
                  type="checkbox"
                  name="subscribe"
                />
                <label className="label" htmlFor="subscribe">
                  <span className="label-text text-xs text-info">
                    I have read, understand, and agree to the{" "}
                    <Link to="/privacyPolicy" className="underline">
                      privacy policy
                    </Link>{" "}
                    and{" "}
                    <Link to="/terms" className="underline">
                      terms & conditions
                    </Link>
                    . I consent to receiving newsletters and promotional offers
                    via email from My Kind of Clean. You may unsubscribe at any
                    time in your account settings.
                  </span>
                </label>
                <ErrorMessage
                  name="subscribe"
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
        <p className="max-w-md my-6 text-lg text-center">
          Your account has been successfully created. Please check your email
          for a verification link.
        </p>
      )}
    </div>
  );
}
