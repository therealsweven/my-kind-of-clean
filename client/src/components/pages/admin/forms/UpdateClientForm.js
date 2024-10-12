import { React } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { UPDATE_CLIENT } from "../../../../utils/mutations";
import * as Yup from "yup";

export default function UpdateClientForm({ client, close }) {
  const clientId = client._id;
  console.log(client._id);
  const [updateClient] = useMutation(UPDATE_CLIENT);
  // showing successful creation of client
  const [successOpen, setSuccessOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(true);
  if (!client) {
    return <div>Loading...</div>; // or handle the case where client is undefined
  }
  function showSuccessMessage() {
    setSuccessOpen((successOpen) => !successOpen);
    setFormOpen((formOpen) => !formOpen);
    setTimeout(() => {
      setSuccessOpen((successOpen) => !successOpen);
      setFormOpen((formOpen) => !formOpen);
      //close form after success message
      close();
    }, 5000);
  }

  const initialValues = {
    clientId: clientId,
    firstName: client.firstName,
    lastName: client.lastName,
    email: client.email,
    phone: client.phone || "",
    street: client.street || "",
    city: client.city || "",
    state: client.state || "",
    zip: client.zip || "",
    commMethod: client.commMethod,
  };
  console.log(initialValues);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field is required"),
    lastName: Yup.string().required("This field is required"),
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
    phone: Yup.string(),
    street: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip: Yup.string(),
    commMethod: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      await updateClient({
        variables: {
          clientId: clientId,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          commMethod: values.commMethod,
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
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
    <div className="bg-accent p-10 min-w-[50%] rounded-lg m-6 border border-white">
      {formOpen && (
        <Formik
          id="createClientForm"
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex justify-end">
                <button onClick={close}>Close</button>
              </div>
              <h2 className="text-2xl">Update Client Information</h2>
              <div className="flex flex-wrap justify-evenly">
                {/* First Name */}
                <div className="form-control w-1/2">
                  <label className="label" htmlFor="firstName">
                    <span className="label-text text-xl ">First:</span>
                  </label>
                  <Field
                    className="input input-bordered m-1"
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
                <div className="form-control w-1/2">
                  <label className="label" htmlFor="lastName">
                    <span className="label-text text-xl ">Last:</span>
                  </label>
                  <Field
                    className="input input-bordered m-1"
                    type="text"
                    name="lastName"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-evenly">
                {/* Email */}
                <div className="form-control w-1/2">
                  <label className="label" htmlFor="email">
                    <span className="label-text text-xl ">Email:</span>
                  </label>
                  <Field
                    className="input input-bordered m-1"
                    type="text"
                    name="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Phone */}
                <div className="form-control w-1/2">
                  <label className="label" htmlFor="phone">
                    <span className="label-text text-xl ">Phone:</span>
                  </label>
                  <Field
                    className="input input-bordered m-1"
                    type="text"
                    name="phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </div>
              </div>
              {/* Comm Method */}
              <div role="group" aria-labelledby="commMethod" className="flex">
                <label className="label" htmlFor="messageBody">
                  <span className="label-text text-xl mb-3">
                    Preferred Contact Method:
                  </span>
                </label>
                <label>
                  <Field
                    type="radio"
                    name="commMethod"
                    value="Email"
                    className="m-4"
                  />
                  Email
                </label>
                <label className="ml-6">
                  <Field
                    type="radio"
                    name="commMethod"
                    value="Phone"
                    className="m-4"
                  />
                  Phone
                </label>
              </div>
              <h4 className="label-text text-xl text-left">Mailing Address:</h4>
              {/* Street */}
              <div className="form-control">
                <label className="label" htmlFor="street">
                  <span className="label-text text-l ">Street:</span>
                </label>
                <Field
                  className="input input-bordered m-1"
                  type="text"
                  name="street"
                />
                <ErrorMessage name="street" component="div" className="error" />
              </div>
              <div className="flex flex-wrap justify-evenly">
                {/* City*/}
                <div className="form-control w-1/3">
                  <label className="label" htmlFor="city">
                    <span className="label-text text-l ">City:</span>
                  </label>
                  <Field
                    className="input input-bordered m-1"
                    type="text"
                    name="city"
                  />
                  <ErrorMessage name="city" component="div" className="error" />
                </div>
                {/* State */}
                <div className="form-control w-1/3">
                  <label className="label" htmlFor="state">
                    <span className="label-text text-l ">State</span>
                  </label>
                  <Field
                    name="state"
                    as="select"
                    className="input input-bordered m-1"
                  >
                    <option value=""></option>
                    <option value="AK">AK</option>
                    <option value="AL">AL</option>
                    <option value="AR">AR</option>
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VA">VA</option>
                    <option value="VT">VT</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
                  </Field>
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="error"
                  />
                </div>
                {/* Zip*/}
                <div className="form-control w-1/3">
                  <label className="label" htmlFor="zip">
                    <span className="label-text text-l ">Zip:</span>
                  </label>
                  <Field
                    className="input input-bordered m-1"
                    type="text"
                    name="zip"
                  />
                  <ErrorMessage name="zip" component="div" className="error" />
                </div>
              </div>
              {/* Submit */}
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
          Contact Information Successfully Updated
        </p>
      )}
    </div>
  );
}
