import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_ADDRESS } from "../../utils/mutations";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

export default function UpdateAddressForm() {
  const [showModal, setShowModal] = React.useState(false);

  const [updateAddress, { error, data }] = useMutation(UPDATE_ADDRESS);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    street: Yup.string().required("This field is required"),
    city: Yup.string().required("This field is required"),
    state: Yup.string().required("This field is required"),
    zip: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      const { data } = await updateAddress({
        variables: {
          street: values.street,
          city: values.city,
          state: values.state,
          zip: values.zip,
        },
      });

      resetForm();
      console.log("submitted");
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };
  return (
    <>
      <button
        className="btn w-32 text-xs p-2 bg-secondary text-info border-info hover:bg-primary"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update Mailing Address
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl min-w-[40%]">
              {/*content*/}
              <div className="border border-accent p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-info rounded-t">
                  <h3 className="text-3xl font-semibold text-info">
                    Update Mailing Address
                  </h3>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="form-control">
                        <label className="label" htmlFor="street">
                          <span className="label-text text-xl text-info">
                            Street
                          </span>
                        </label>
                        <Field
                          className="input input-bordered"
                          type="text"
                          name="street"
                        />
                        <ErrorMessage
                          name="street"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label" htmlFor="city">
                          <span className="label-text text-xl text-info">
                            City
                          </span>
                        </label>
                        <Field
                          className="input input-bordered"
                          type="text"
                          name="city"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label" htmlFor="state">
                          <span className="label-text text-xl text-info">
                            State
                          </span>
                        </label>
                        <Field
                          className="input input-bordered"
                          type="text"
                          name="state"
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="error"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label" htmlFor="zip">
                          <span className="label-text text-xl text-info">
                            Zip
                          </span>
                        </label>
                        <Field
                          className="input input-bordered"
                          type="text"
                          name="zip"
                        />
                        <ErrorMessage
                          name="zip"
                          component="div"
                          className="error"
                        />
                      </div>

                      <div className="flex justify-end my-6 ">
                        <button
                          className="btn btn-sm btn-accent text-info border border-info"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Save
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-info rounded-b">
                  <button
                    className="text-info background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
