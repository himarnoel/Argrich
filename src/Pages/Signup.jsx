import React, { useEffect, useState } from "react";
import InputField from "../components/InputField";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import SelectField from "../components/SelectField";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { SignUpValidate } from "../../Services";
import Spinner from "../components/Spinner";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import countries from "../../Services/callcode.json";
import Google from "../images/Google.png";
import Crop from '../images/Crop.jpg'


const Signup = () => {
  const [isLoading, setisLoading] = useState(false);
  const [toggle, settoggle] = useState(false);
  const [countrycheck, setcountrycheck] = useState("Nigeria");
  const [toggle2, settoggle2] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      country:"NG",
      callCode: "+234",
    },
    validationSchema: SignUpValidate,
    onSubmit: (values) => {
      formik.setFieldValue("country");
      setisLoading(true);
    },
  });

  const country = countries.map((item, index) => {
    return {
      label: item.name,
      value: item.code,
      code: item.dial_code,
    };
  });

  const formatDigits = (value) => {
    return value
      .replace(/\D/g, "") // Remove non-digit characters
      .replace(/(\d{3})(\d{0,3})?(\d{0,4})?/, (_, p1, p2, p3) => {
        let parts = [p1];
        if (p2) parts.push(" " + p2);
        if (p3) parts.push(" " + p3);
        return parts.join("");
      });
  };
  return (
    <div className="min-h-screen bg-[#F5F5F5] grid lg:grid-cols-2  gap-4 p-4">
      <div className="lg:flex   bg-[#D9D9D9]  rounded-[30px] hidden   bg-no-repeat bg-cover bg-center  bg-opacity-100  opacity-[.75] " style={{ backgroundImage: `url(${Crop})` }}></div>
      <div className="flex flex-col items-center py-10 px-10 ">
        <div>
          <div>
            <h1 className="font-bold text-[30px] text-[#000]">Create an Account</h1>
          </div>
          <div className="text-[#8C8C8C] mb-4">
            Enter your email and password to create an account
          </div>
          <form className="space-y-3">
            <InputField
              label={`First Name`}
              name={`firstName`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={formik.touched.firstName && formik.errors.firstName}
              errorText={formik.errors.firstName}
              placeHolder={`Enter Your First Name`}
            />
            <InputField
              label={`Last Name`}
              name={`lastName`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && formik.errors.lastName}
              errorText={formik.errors.lastName}
              placeHolder={`Enter Your Last Name`}
            />
            <InputField
              label={`Email address`}
              name={`email`}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email}
              errorText={formik.errors.email}
              placeHolder={`Enter Your E-mail Address`}
            />
            <SelectField
              label={`Country`}
              name="country"
              value={formik.values.country}
              onChange={(e) => {
                formik.handleChange(e);
                const selectedOptionAbout =
                  e.target.options[e.target.selectedIndex].getAttribute(
                    "about"
                  );

                formik.setFieldValue("callCode", selectedOptionAbout);
              }}
              error={formik.errors.country}
              errorText={formik.errors.country}
              placeHolder={"Nigeria"}
              options={country}
            />
            <div className="flex flex-col">
                <div>
                  <label>Phone Number</label>
                </div>
                <div className="grid grid-cols-3 mb-2 gap-x-1">
                  <InputField
                    label={``}
                    name={`callCode`}
                    value={formik.values.callCode}
                    onChange={formik.handleChange}
                    error={formik.touched.callCode && formik.errors.callCode}
                    errorText={formik.errors.callCode}
                    placeHolder={`+234`}
                    className={"disabled:bg-white"}
                    disabled={true}
                    onBlur={formik.handleBlur}
                  />
                  <div className="col-span-2 flex flex-col">
                    <InputField
                      label={``}
                      placeHolder={`802 123 4567`}
                      name={`phoneNumber`}
                      value={formik.values.phoneNumber}
                      onChange={(e) => {
                        const formattedValue = formatDigits(e.target.value);
                        formik.setFieldValue("phoneNumber", formattedValue);
                      }}
                      error={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                      errorText={formik.errors.phoneNumber}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
            <div className="relative">
              <InputField
                label={`Password`}
                name={`password`}
                type={toggle ? "text" : "Password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && formik.errors.password}
                errorText={formik.errors.password}
                placeHolder={"••••••••"}
                onBlur={formik.handleBlur}
              />
              <div className="absolute text-[#008A2F] inset-y-[2.2rem] right-3 text-lg ">
                {" "}
                {toggle ? (
                  <RiEyeFill
                    onClick={() => {
                      settoggle(!toggle);
                    }}
                  />
                ) : (
                  <RiEyeOffFill
                    onClick={() => {
                      settoggle(!toggle);
                    }}
                  />
                )}
              </div>
              {/* <div>
                <p className="text-sm text-contentFade">Password must have</p>

                <div className="flex flex-wrap mt-4 gap-3 text-[13px]">
                  <p
                    className={`${
                      /^(?=.*[a-z])/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Lowercase
                  </p>
                  <p
                    className={`${
                      /^(?=.*[A-Z])/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Uppercase
                  </p>
                  <p
                    className={`${
                      /^.{8,}$/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    At least 8 Characters
                  </p>
                  <p
                    className={`${
                      /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-])/.test(
                        formik.values.password
                      )
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Special Character
                  </p>
                  <p
                    className={`${
                      /^(?=.*\d)/.test(formik.values.password)
                        ? "text-[#FFFFFF] bg-[#008A2F]"
                        : "text-fadedBlue bg-[#FFFFFF]"
                    } py-1 px-2 rounded-[20px]`}
                  >
                    1 Number
                  </p>
                </div>
              </div> */}
            </div>
            <div className="relative">
              {" "}
              <InputField
                label={`Confirm Password`}
                name={`passwordConfirmation`}
                type={toggle2 ? "text" : "Password"}
                value={formik.values.passwordConfirmation}
                onChange={formik.handleChange}
                placeHolder={"••••••••"}
                error={
                  formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
                }
                errorText={formik.errors.passwordConfirmation}
                onBlur={formik.handleBlur}
              />
              <div className="absolute text-[#008A2F] inset-y-[2.2rem] right-3 text-lg ">
                {" "}
                {toggle2 ? (
                  <RiEyeFill
                    onClick={() => {
                      settoggle2(!toggle2);
                    }}
                  />
                ) : (
                  <RiEyeOffFill
                    onClick={() => {
                      settoggle2(!toggle2);
                    }}
                  />
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#008A2F]  shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full p-1 mt-4 text-white rounded-[5px]"
              >
                Create account
              </button>
            </div>
          </form>
          <div className="mt-12">
            <div className="relative border-t-2 border-[#E6E6E6]  w-full my-8 ">
              <div></div>
              <h1 className="text-center  absolute bg-[#F5F5F5] text-[#828282]  w-[1/2] mt-[-17px] left-[30%]">
                or continue with
              </h1>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#DBDBDB]  shadow-[0_1px_2px_0_rgba(16,_24,_40,_0.05)] w-full items-center text-[#000000] rounded-[5px] flex justify-center p-4"
              >
                <img src={Google} className="mr-2"></img>
                Google
              </button>
            </div>
            <div className="mt-4 flex justify-center">
              <p className="text-[12px] text-[#000] gap-1 flex items-center">
                Have an account Already?<Link to="/login" replace={true} className="text-[#008A2F]">Click here to Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
