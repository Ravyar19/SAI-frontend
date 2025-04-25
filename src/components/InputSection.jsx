import React, { useState } from "react";

const InputSection = ({ onAnalyze }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAnalyze(inputText);
    }
  };

  const sampleInputs = [
    {
      label: "Safe Text",
      text: "Hello, this is a normal message that should be classified as safe.",
      class: "text-green-400 border-green-500",
    },
    {
      label: "SQL Injection",
      text: "SELECT * FROM users WHERE username = 'admin' OR 1=1; --' AND password = 'password'",
      class: "text-red-400 border-red-500",
    },
    {
      label: "XSS Attack",
      text: '<script>alert("Your site has been hacked!");</script>',
      class: "text-orange-400 border-orange-500",
    },
  ];

  const loadSample = (text) => {
    setInputText(text);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Text Analysis</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="inputText"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Enter text to analyze for security threats
          </label>
          <textarea
            id="inputText"
            rows="6"
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-200"
            placeholder="Enter text here to check for SQL injection, XSS, or safe content..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <p className="w-full text-sm text-gray-400 mb-1">
            Try one of these examples:
          </p>
          {sampleInputs.map((sample, index) => (
            <button
              key={index}
              type="button"
              className={`text-xs px-3 py-1 rounded border ${sample.class} bg-opacity-10 hover:bg-opacity-20`}
              onClick={() => loadSample(sample.text)}
            >
              {sample.label}
            </button>
          ))}
        </div>

        <div className="flex items-center">
          <button
            type="submit"
            disabled={!inputText.trim()}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
              !inputText.trim()
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } transition-all`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Analyze Threat
          </button>

          <button
            type="button"
            onClick={() => setInputText("")}
            className="ml-4 text-gray-400 hover:text-gray-200"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputSection;
