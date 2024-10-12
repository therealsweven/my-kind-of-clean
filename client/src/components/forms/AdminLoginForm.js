import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import { ADMIN_LOGIN } from "../../utils/mutations";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

export default function AdminLoginForm() {
  const [adminLogin, { error, data }] = useMutation(ADMIN_LOGIN);
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email address not formatted correctly")
      .required("This field is required"),
    password: Yup.string().required("This field is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      console.log(values);
      const { data } = await clientLogin({
        variables: {
          email: values.email,
          password: values.password,
        },
      });

      resetForm();
      console.log("submitted");
      // verify token
      console.log(data.adminLogin);
      Auth.login(data.adminLogin.token, data.adminLogin.client._id);
      // navigate("/portal/dashboard");
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
    setSubmitting(false);
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl min-w-[40%]">
          {/*content*/}
          <div className="border border-accent p-6 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-info rounded-t">
              <h3 className="text-3xl font-semibold text-info">Client Login</h3>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-control">
                    <label className="label" htmlFor="email">
                      <span className="label-text text-xl text-info">
                        Email
                      </span>
                    </label>
                    <Field
                      className="input input-bordered"
                      type="text"
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label" htmlFor="password">
                      <span className="label-text text-xl text-info">
                        Password
                      </span>
                    </label>
                    <Field
                      className="input input-bordered"
                      type="password"
                      name="password"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>

                  <div className="flex justify-between my-6 ">
                    <button
                      className="btn btn-sm btn-accent text-info border border-info"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
