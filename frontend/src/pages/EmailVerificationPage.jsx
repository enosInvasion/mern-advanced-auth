import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, isLoading, error } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);
      const lastFiledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFiledIndex < 5 ? lastFiledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    const verificationCode = code.join("");
    console.log("code value : ", verificationCode);
    try {
      await verifyEmail({ verificationCode });
      navigate("/login");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
    console.log(`Verification code submitted: ${verificationCode}`);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter 
    backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter 
        backdrop-blur-xl rounded-2xl shadow-xl p-8"
      >
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r
         from-green-400 to-emerald-500 text-transparent bg-clip-text"
        >
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6 digit code sent to your email address.
        </p>
        <form className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => {
              return (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-12 w-12 text-center text-2xl font-bold bg-gray-700 text-white border-2
                   border-gray-700 rounded-lg focus:border-green-500 focus:outline-none"
                />
              );
            })}
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
            className="mt-5 w-full px-4 py-3 bg-gradient-to-r
             from-green-500 to-emerald-600 text-white 
          font-bold rounded-lg shadow-lg
           hover:from-green-600 hover:to-emerald-700
           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? (
              <p>Login</p>
            ) : (
              <Loader className="text-white-500 animate-spin mx-auto" />
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
