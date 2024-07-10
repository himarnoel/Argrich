import * as yup from "yup";
import axios from "axios";
axios.defaults.baseURL = "http://10.0.33.117:8000";
const phoneRegExp = /^\d{3} \d{3} \d{4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#;:])[A-Za-z\d@$!%*?&#;:]{8,}$/;

export const SignUpValidate = yup.object().shape({
  country: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("enter valid email"),
  callCode: yup.string().required("required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Invalid format")
    .required("required"),
  password: yup
    .string()
    .min(8, "password must containat least 8 characters ")
    .matches(
      passwordRegExp,
      "characters with at least one of each: uppercase, lowercase, number and special"
    )
    .required("required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("required"),
});
