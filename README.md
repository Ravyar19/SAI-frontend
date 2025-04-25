🛡️ Security Threat Detector (Frontend)
A simple React-based UI for analyzing user input and identifying potential security threats such as SQL injection and cross-site scripting (XSS).

🚀 Implementation Steps
1. Update the Analysis Function
In App.js, locate and replace the existing simulateAnalysis function with the following analyzeText function:

const analyzeText = async (text) => {
  setLoading(true);
  try {
    const response = await fetch(`/check/${encodeURIComponent(text)}/`, {
      method: 'POST',
    });
    const data = await response.json();
    setResult(data);
  } catch (error) {
    console.error('Error analyzing text:', error);
  } finally {
    setLoading(false);
  }
};
2. Replace Function Calls
Replace all calls to simulateAnalysis with analyzeText.

📦 Expected API Response Format
Your backend endpoint should return a JSON response with the following structure:

json
{
  "prediction": "sql",  // One of: "sql", "xss", or "safe"
  "confidence": "0.95", // Confidence score (as a string between 0–1)
  "probabilities": "{\"sql\":0.95,\"xss\":0.03,\"safe\":0.02}" // JSON string of class probabilities
}



🧩 Component Interaction Overview
InputSection: Triggers the analysis function when a user submits text.

App Component: Manages global loading state and stores analysis results.

ResultsDisplay: Renders the analysis output for the user.

✅ No other code changes are needed. The frontend is ready to handle state management and display results once the correct API is integrated.

🛠️ Troubleshooting
If something's not working as expected, check the following:

✅ Backend is reachable at /check/<text>/

✅ JSON response matches the expected structure

✅ Browser console is free of errors

✅ CORS is configured if your backend is hosted on a different domain

📥 Installation

# Clone the repository
git clone 

# Install dependencies
npm install

# Start the development server
npm start
