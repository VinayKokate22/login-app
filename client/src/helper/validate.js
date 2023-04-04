import toast from "react-hot-toast";

// validate login page username

export async function usernameValidate(values) {
  const error = usernameVerify({}, values);
  return error;
}
export async function passwordValidate(values) {
  const error = passwordVerify({}, values);
  return error;
}
// validate reset Password
export async function resetPasswordValidation(values) {
  const error = passwordVerify({}, values);
  if (values.password !== values.confirm_pwd) {
    error.password = toast.error("Password not match ..!");
  }
  return error;
}
// validate register form
export async function registerValidation(values) {
  const error = passwordVerify({}, values);
  passwordVerify(error, values);
  emailVerify(error, values);
  return error;
}
// validate profile page
export async function profileValidation(values) {
  const error = emailVerify({}, values);

  return error;
}
// validate userpassword
function passwordVerify(error = {}, values) {
  const specialchars = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;
  if (!values.password) {
    error.password = toast.error("Password Required ..!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Space not allowed in password");
  } else if (values.password.length < 4) {
    error.password = toast.error("Password must be more than 4");
  } else if (!specialchars.test(values.password)) {
    error.password = toast.error("Password must have special character");
  }
  return error;
}
// validate username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username Required ..!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username");
  }
  return error;
}
// validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("email required");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Wrong Email");
  }
  return error;
}
