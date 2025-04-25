import React from "react";

const Header = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center items-center mb-4">
        <div className="relative w-16 h-16 mr-3">
          <div
            className="absolute inset-0 bg-indigo-500 rounded-full opacity-50 animate-ping"
            style={{ animationDuration: "3s" }}
          ></div>
          <div className="relative flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Security Threat Detector
        </h1>
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-lg text-gray-300">
          Protect your applications by detecting SQL injections, XSS attacks,
          and ensuring your text input is safe. Our advanced deep learning model
          can identify potential security threats with high accuracy.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-red-400">SQL Injection</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-orange-400">XSS Attack</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-green-400">Safe Text</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
