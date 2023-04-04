import React, { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertobase64 from "../helper/convert";

const Profile = () => {
  const [file, setfile] = useState();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: profileValidation,
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
        <h1>Profile</h1>
        <span>You can update the details</span>
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
          <div>
            <input
              {...formik.getFieldProps("firstName")}
              type="text"
              placeholder="firstName*"
              required
            />
            <input
              {...formik.getFieldProps("lastname")}
              type="text"
              placeholder="lastname"
              required
            />
          </div>
          <div>
            <input
              {...formik.getFieldProps("mobile")}
              type="text"
              placeholder="mobile"
            />
            <input
              {...formik.getFieldProps("email")}
              type="email"
              placeholder="email"
              required
            />
          </div>
          <div>
            <input
              {...formik.getFieldProps("address")}
              type="text"
              placeholder="address"
            />
            <button type="submit">Update</button>
          </div>
        </div>
        <div>
          <span>
            come back later <Link to="/">Logout</Link>
          </span>
        </div>
      </form>
    </>
  );
};

export default Profile;
