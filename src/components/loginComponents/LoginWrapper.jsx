import { useEffect, useState } from "react";
import { UserIcon, LockClosedIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import InfoBanner from "../shared/InfoBanner";

export default function Login() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaInput, setCaptchaInput] = useState("");

  // generate captcha
  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 9) + 1);
    setNum2(Math.floor(Math.random() * 9) + 1);
    setCaptchaInput("");
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    if (parseInt(captchaInput) !== num1 + num2) {
      alert("Invalid verification code");
      generateCaptcha();
      return;
    }

    alert("Login Successful");
  }

  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
      <form
  onSubmit={handleSubmit}
  className="w-full max-w-sm"
>
        {/* Title */}
        <h2 className="text-2xl text-black font-semibold m-0">Sign In</h2>
        <p className="text-gray-400 text-base mb-5">
          Enter your credentials to continue
        </p>

        {/* Username */}
        <label className="text-gray-600 font-medium">Username</label>
        <div className="relative">
          <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-3" />
          <input
            type="text"
            placeholder="Enter your username"
            required
            className="w-full p-3 pl-10 mt-2 mb-4 text-sm
              border border-[#ddd] rounded-lg text-black outline-none
              focus:border-[#1e88ff] placeholder:text-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex justify-between items-center text-gray-600 font-medium">
          <label>Password</label>
          <span className="text-sm text-[#1e88ff] cursor-pointer">
            Forgot Password?
          </span>
        </div>

        <div className="relative">
          <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-3" />
          <input
            type="password"
            placeholder="Enter your password"
            required
            className="w-full p-3 pl-10 mt-2 mb-4 text-sm
              border border-[#ddd] rounded-lg text-black outline-none
              focus:border-[#1e88ff] placeholder:text-gray-400"
          />
        </div>

        {/* CAPTCHA */}
        <label className="text-gray-600 font-medium">Verification Code</label>

        <div className="flex items-center gap-2 mt-2 mb-4">
          {/* Math box */}
          <div className="px-4 py-2 rounded-lg border border-[#FFD666] bg-[#FFF4CC] font-semibold text-gray-800">
            {num1} + {num2} =
          </div>

          {/* Answer input */}
          <input
            type="number"
            placeholder="?"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            required
            className="p-2.5 text-center text-sm
              border w-19 border-[#ddd] rounded-lg outline-none
              focus:border-[#1e88ff] text-gray-800"
          />

          {/* Refresh button */}
          <button
            type="button"
            onClick={generateCaptcha}
            className="p-2 rounded-lg border cursor-pointer border-[#ddd] bg-gray-100 hover:bg-gray-200"
          >
            <ArrowPathIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Sign In */}
        <button
          type="submit"
          className="w-full bg-[#1e88ff] text-white py-3 rounded-xl
             cursor-pointer font-medium hover:bg-[#166fe0] transition"
        >
          Sign in
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-200"></div>

        <span className="mx-3 text-sm text-gray-400">
            New to TSRS?
        </span>

        <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Register */}
        <button
          type="button"
          className="w-full cursor-pointer bg-white border border-[#1e88ff]
            text-[#1e88ff] py-3 rounded-xl
             hover:bg-[#f0f6ff] transition"
        >
          Register Here
        </button>

        {/* Footer */}
        <div className="flex justify-center gap-4 mt-6 text-sm text-[#1e88ff]">
            <a href="#">
                <span className="cursor-pointer">User Guide</span>
            </a>
            <a href="#">
                <span className="cursor-pointer">Help & Support</span>
            </a>
        </div>
      </form>
      
      
    </div>
  );
}