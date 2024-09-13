import React from "react";
import backicon from "../images/icons/back.svg";
import lock from "../images/icons/lock.svg";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[448px] px-4 lg:px-0 mx-auto w-full ">
      <Link to={"/login"} className="flex items-center gap-2">
        <img src={backicon} alt="" className="object-contain" />
        <p className="font-manrope font-semibold text-[16px] text-[#008A2F]">
          Back to Login
        </p>
      </Link>
      <div className="bg-white  rounded-[12px] w-full p-5 mt-2 shadow-[4px_4px_13.4px_0px_rgba(152,_152,_152,_0.25)]">
        <div className="p-[10px] bg-[#E0FFE5] flex items-center justify-center w-fit">
          <img src={lock} alt="" />
        </div>
        <p className="font-manrope font-semibold text-[24px] mt-2">
          Reset Password
        </p>
        <p className="font-manrope font-medium text-[16px] text-[#8C8C8C]">
          Please enter your password a 4-digit code would be sent to your email.
        </p>

        <div className="flex flex-col mt-6 gap-4">
          <div className="flex flex-col">
            <label htmlFor="" className="font-manrope text-[14px]  font-medium">
              E-mail
            </label>
            <input
              type="email"
              name=""
              id=""
              className="border px-4 focus:outline-none font-manrope   border-[#D0D5DD] rounded-[5px] min-h-[46px]"
            />
          </div>
          <button
            onClick={() => navigate("/changepassword/confirm-otp")}
            className="min-h-[46px] bg-[#008A2F] rounded-lg font-manrope font-semibold text-[16px] text-white"
          >
            Send Link to Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
