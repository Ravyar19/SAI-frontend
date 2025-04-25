import React, { useState } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import ResultsDisplay from "./components/ResultsDisplay";
import InformationPanel from "./components/InformationPanel";
import ApiDocumentation from "./components/ApiDocumentation";
import "./App.css";

const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showApiDocs, setShowApiDocs] = useState(false);

  const analyzeText = async (text) => {
    setLoading(true);
    try {
      // API call would happen here
      // In a real implementation, this would be a fetch to your backend
      const response = await fetch(`/check/${encodeURIComponent(text)}/`, {
        method: "POST",
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setLoading(false);
    }
  };

  // For demonstration purposes
  const simulateAnalysis = (text) => {
    setLoading(true);
    setTimeout(() => {
      // Simulate API response
      const threatTypes = ["sql", "xss", "safe"];
      const randomIndex = Math.floor(Math.random() * 3);
      const prediction = threatTypes[randomIndex];
      const confidence = (0.7 + Math.random() * 0.29).toFixed(2);
      const probs = JSON.stringify({
        sql: randomIndex === 0 ? confidence : (Math.random() * 0.2).toFixed(2),
        xss: randomIndex === 1 ? confidence : (Math.random() * 0.2).toFixed(2),
        safe: randomIndex === 2 ? confidence : (Math.random() * 0.2).toFixed(2),
      });

      setResult({
        prediction,
        confidence,
        probabilities: probs,
      });
      setLoading(false);
    }, 1500);
  };

  const toggleApiDocs = () => {
    setShowApiDocs(!showApiDocs);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <div className="lg:w-2/3">
            <InputSection onAnalyze={simulateAnalysis} />

            {(loading || result) && (
              <ResultsDisplay result={result} loading={loading} />
            )}
          </div>

          <div className="lg:w-1/3">
            <InformationPanel />
          </div>
        </div>

        <div className="mt-12 mb-6">
          <button
            onClick={toggleApiDocs}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {showApiDocs ? "Hide API Documentation" : "Show API Documentation"}
          </button>
        </div>

        {showApiDocs && <ApiDocumentation />}
      </div>
    </div>
  );
};

export default App;
