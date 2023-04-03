import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";

const Username = () => {
  const formik = useFormik({
    initialValues: { username: "" },
    validate: usernameValidate,
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
        <h1>Hello Again!</h1>
        <span>Explore More by Connecting with us</span>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <img src="" alt="userimage" />
        </div>
        <div>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            placeholder="Username"
          />
          <button type="submit">Lets Go</button>
        </div>
        <div>
          <span>
            Not a member <Link to="/register">Register now</Link>{" "}
          </span>
        </div>
      </form>
    </>
  );
};

export default Username;
