import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORD } from "../../utils/mutations";
import * as Yup from "yup";

export default function UpdatePasswordForm() {
  const [showModal, setShowModal] = React.useState(false);

  const [updatePassword, { error, data }] = useMutation(UPDATE_PASSWORD);
  const initialValues = {
    currentPassword: "",
    password: "",
    password2: "",
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("This field is required"),
    password: Yup.string().required("This field is required"),
    password2: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      const { data } = await updatePassword({
        variables: {
          password: values.currentPassword,
          newPassword: values.password,
        },
      });
      console.log(data);
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
        className="btn w-28 text-xs p-2 bg-secondary text-info border-info hover:bg-primary"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Change Password
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
                    Change Password
                  </h3>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      {/* Current Password */}
                      <div className="form-control">
                        <label className="label" htmlFor="currentPassword">
                          <span className="label-text text-xl text-info">
                            Current Password
                          </span>
                        </label>
                        <Field
                          className="input input-bordered"
                          type="password"
                          name="currentPassword"
                        />
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="error"
                        />
                      </div>
                      {/* Password */}
                      <div className="form-control">
                        <label className="label" htmlFor="password">
                          <span className="label-text text-xl text-info">
                            New Password
                          </span>
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
                            Re-enter New Password
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
