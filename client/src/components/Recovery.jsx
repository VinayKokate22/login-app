import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

const Recovery = () => {
  const formik = useFormik({
    initialValues: { password: "" },
    validate: passwordValidate,
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
        <h1>Recovery</h1>
        <span>Enter OTP to recover Password</span>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <span>Enter 6 digit OTP sent ot your email address</span>
          <input type="text" placeholder="OTP" />
          <button type="submit">Sign In</button>
        </div>
        <div>
          <span>
            Cant get OTP <button>Resend</button>
          </span>
        </div>
      </form>
    </>
  );
};

export default Recovery;
