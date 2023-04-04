import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/avatar/profile.jpg";
import { Toaster } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const [user, setuser] = useState({
    username: "",
    password: "",
    email: "",
    profile: "",
  });
  const [error, seterror] = useState(true);
  // const [file, setfile] = useState();
  // const formik = useFormik({
  //   initialValues: { password: "", email: "", username: "" },
  //   validate: registerValidation,
  //   validateOnBlur: false,
  //   validateOnChange: false,
  //   onSubmit: async (value) => {
  //     value = Object.assign(value, { profile: file || "" });
  //     registerUser(value);
  //   },
  // });
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleInputs = (e) => {
    const targetname = e.target.name;
    const value = e.target.value;
    setuser({ ...user, [targetname]: value });
  };
  const Postdata = async (e) => {
    e.preventDefault();
    const { username, password, email, profile } = user;

    const res = await axios.post("http://localhost:3000/api/v1/register", {
      username,
      password,
      email,
      profile,
    });
    if (res.status != 200) {
      window.alert("error has occured");
    } else {
      window.alert("successfull");
      seterror(false);
    }
    console.log(res);
  };
  // formik does not support file upload so we need to create this handler
  // const onUpload = async (e) => {
  //   const base64 = await convertobase64(e.target.files[0]);
  //   setfile(base64);
  // };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        <h1>Register</h1>
        <span>Happy to join you</span>
      </div>
      <form method="POST">
        <input
          type="email"
          placeholder="Email*"
          name="email"
          onChange={handleInputs}
          required
        />
        <input
          type="username"
          name="username"
          placeholder="username*"
          required
          onChange={handleInputs}
        />
        <input
          type="password"
          name="password"
          placeholder="password*"
          onChange={handleInputs}
          required
        />
        <input
          type="text"
          name="profile"
          placeholder="profile*"
          onChange={handleInputs}
        />
        <button onClick={Postdata}>Register</button>
      </form>
      <div>
        <span>
          Already Registered <Link to="/">Sign In</Link>
          {error ? <div></div> : <Link to="/profile">Profile</Link>}
        </span>
      </div>
    </>
  );
};

export default Register;
