import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { CLIENT_LOGIN } from "../../utils/mutations";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

export default function UpdateCommMethodForm(props) {
  console.log(props);
  const [showModal, setShowModal] = React.useState(false);

  const [clientLogin, { error, data }] = useMutation(CLIENT_LOGIN);
  let initialValues = { commMethod: "" };
  props.me.commMethod === "Phone"
    ? (initialValues = {
        commMethod: "Phone",
      })
    : (initialValues = {
        commMethod: "Email",
      });

  const validationSchema = Yup.object().shape({
    commMethod: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      const { data } = await clientLogin({
        variables: {
          commMethod: values.commMethod,
        },
      });

      resetForm();
      console.log("submitted");
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };
  return (
    <>
      <button
        className="btn w-28 h-16 text-xs p-2 bg-secondary text-info border-info hover:bg-primary"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Update Communication Method
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
                    Update Communication Method
                  </h3>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
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
