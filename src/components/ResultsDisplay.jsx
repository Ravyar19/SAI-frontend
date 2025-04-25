import React, { useState, useEffect } from "react";

const ResultsDisplay = ({ result, loading }) => {
  const [parsedProbabilities, setParsedProbabilities] = useState({});
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (result && result.probabilities) {
      try {
        setParsedProbabilities(
          typeof result.probabilities === "string"
            ? JSON.parse(result.probabilities)
            : result.probabilities
        );
      } catch (error) {
        console.error("Error parsing probabilities:", error);
        setParsedProbabilities({});
      }
    }

    // Trigger animation when new results come in
    if (result && !loading) {
      setAnimation(true);
      setTimeout(() => setAnimation(false), 1000);
    }
  }, [result, loading]);

  if (loading) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 mt-6 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-indigo-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-indigo-300 font-medium">
            Analyzing text for security threats...
          </p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { prediction, confidence } = result;

  const getResultColor = (pred) => {
    switch (pred) {
      case "sql":
        return "red";
      case "xss":
        return "orange";
      case "safe":
        return "green";
      default:
        return "gray";
    }
  };

  const getResultIcon = (pred) => {
    switch (pred) {
      case "sql":
        return (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "xss":
        return (
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "safe":
        return (
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getResultTitle = (pred) => {
    switch (pred) {
      case "sql":
        return "SQL Injection Detected";
      case "xss":
        return "XSS Attack Detected";
      case "safe":
        return "Safe Content";
      default:
        return "Unknown";
    }
  };

  const getResultDescription = (pred) => {
    switch (pred) {
      case "sql":
        return "This text contains patterns commonly used in SQL injection attacks, which could be used to manipulate database queries.";
      case "xss":
        return "This text contains patterns associated with Cross-Site Scripting (XSS) attacks, which could execute malicious JavaScript in browsers.";
      case "safe":
        return "No security threats detected in this text. The content appears to be safe.";
      default:
        return "Could not determine the safety of this text.";
    }
  };

  const resultColor = getResultColor(prediction);
  const confidenceValue = parseFloat(confidence) * 100;

  return (
    <div
      className={`bg-gray-800 rounded-xl shadow-lg p-6 mt-6 transition-all duration-300 ${
        animation ? "scale-105" : "scale-100"
      }`}
    >
      <div className="flex items-start">
        <div
          className={`flex-shrink-0 p-3 mr-5 rounded-full bg-${resultColor}-500 bg-opacity-20`}
        >
          <div className={`text-${resultColor}-400`}>
            {getResultIcon(prediction)}
          </div>
        </div>

        <div className="flex-grow">
          <h3 className={`text-2xl font-bold mb-2 text-${resultColor}-400`}>
            {getResultTitle(prediction)}
          </h3>
          <p className="text-gray-300 mb-6">
            {getResultDescription(prediction)}
          </p>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">Confidence</span>
              <span className={`text-sm font-medium text-${resultColor}-400`}>
                {confidenceValue.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`bg-${resultColor}-500 h-2.5 rounded-full transition-all duration-1000 ease-out`}
                style={{ width: `${confidenceValue}%` }}
              ></div>
            </div>
          </div>

          {Object.keys(parsedProbabilities).length > 0 && (
            <div>
              <h4 className="text-sm text-gray-400 mb-3">
                Probability Distribution
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Object.entries(parsedProbabilities).map(([key, value]) => {
                  const probValue =
                    typeof value === "string"
                      ? parseFloat(value) * 100
                      : value * 100;
                  const barColor = getResultColor(key);

                  return (
                    <div key={key} className="flex flex-col">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="capitalize">{key}</span>
                        <span>{probValue.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div
                          className={`bg-${barColor}-500 h-1.5 rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${probValue}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
