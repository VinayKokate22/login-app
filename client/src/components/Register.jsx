import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "../helper/validate";
import convertobase64 from "../helper/convert";

const Register = () => {
  const [file, setfile] = useState();
  const formik = useFormik({
    initialValues: { password: "", email: "", username: "" },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      value = Object.assign(value, { profile: file || "" });
      console.log(value);
    },
  });

  // formik does not support file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertobase64(e.target.files[0]);
    setfile(base64);
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        <h1>Register</h1>
        <span>Happy to join you</span>
      </div>
      <form action="" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="profile">
            <img src={file || ""} alt="userimage" />
            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
            />
          </label>
        </div>
        <div>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            placeholder="Email*"
            required
          />
          <input
            {...formik.getFieldProps("username")}
            type="username"
            placeholder="username*"
            required
          />
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="password*"
            required
          />
          <button type="submit">Register</button>
        </div>
        <div>
          <span>
            Already Registered <Link to="/">Sign In</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Register;
