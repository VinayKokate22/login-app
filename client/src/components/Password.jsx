import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";

const Password = () => {
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
        <h1>Password</h1>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <img src="" alt="userimage" />
        </div>
        <div>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="Password"
          />
          <button type="submit">Sign In</button>
        </div>
        <div>
          <span>
            Forgot Password <Link to="/recovery">recover now</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Password;
