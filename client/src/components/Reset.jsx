import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";

const Reset = () => {
  const formik = useFormik({
    initialValues: { password: "", confirm_pwd: "" },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
    },
  });
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        <h1>Reset</h1>
        <span>Enter new Password</span>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div></div>
        <div>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="NewPassword"
          />
          <input
            {...formik.getFieldProps("confirm_pwd")}
            type="password"
            placeholder="ConfirmPassword"
          />
          <button type="submit">Sign In</button>
        </div>
      </form>
    </>
  );
};

export default Reset;
