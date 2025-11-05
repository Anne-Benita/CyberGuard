import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";

const Login = ({ onClose }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Auth Card */}
      <div className="relative w-[430px] bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl z-50 animate-fadeIn">
        {/* Back arrow */}
        <button
          className="absolute top-4 left-4 text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition"
          onClick={onClose}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-semibold text-center mb-6 text-slate-800 dark:text-white">
          {isLoginMode ? "Login" : "Sign Up"}
        </h2>

        {/* Tabs */}
        <div className="flex mb-6 border border-gray-300 rounded-full overflow-hidden relative h-12">
          <div
            className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 transition-all duration-300 ${
              isLoginMode ? "left-0" : "left-1/2"
            }`}
          ></div>
          <button
            onClick={() => setIsLoginMode(true)}
            className={`w-1/2 text-lg font-medium z-10 transition-all ${
              isLoginMode ? "text-white" : "text-black dark:text-white/60"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLoginMode(false)}
            className={`w-1/2 text-lg font-medium z-10 transition-all ${
              !isLoginMode ? "text-white" : "text-black dark:text-white/60"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {!isLoginMode && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400 dark:bg-slate-900 dark:text-white transition"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400 dark:bg-slate-900 dark:text-white transition"
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400 dark:bg-slate-900 dark:text-white transition"
          />

          {!isLoginMode && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              className="w-full p-3 border-b-2 border-gray-300 outline-none focus:border-cyan-500 placeholder-gray-400 dark:bg-slate-900 dark:text-white transition"
            />
          )}

          {isLoginMode && (
            <div className="text-right">
              <p className="text-cyan-600 hover:underline cursor-pointer text-sm">
                Forgot Password?
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-300 text-white rounded-full text-lg font-medium hover:opacity-90 transition"
          >
            {isLoginMode ? "Login" : "Sign Up"}
          </button>

          <p className="text-center text-gray-600 dark:text-gray-300">
            {isLoginMode
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span
              className="text-cyan-600 hover:underline cursor-pointer"
              onClick={() => setIsLoginMode(!isLoginMode)}
            >
              {isLoginMode ? "Sign Up now" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
