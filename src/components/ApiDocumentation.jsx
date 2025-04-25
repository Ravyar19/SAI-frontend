import React, { useState } from "react";

const ApiDocumentation = () => {
  const [activeTab, setActiveTab] = useState("endpoints");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        // Show a temporary copied notification
        const copyButton = document.getElementById("copy-button");
        if (copyButton) {
          const originalText = copyButton.innerText;
          copyButton.innerText = "Copied!";
          setTimeout(() => {
            copyButton.innerText = originalText;
          }, 2000);
        }
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-12">
      <div className="bg-gray-900 p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-2">
          API Documentation
        </h2>
        <p className="text-gray-400">
          Integrate our security threat detection capabilities into your own
          applications
        </p>
      </div>

      <div className="flex border-b border-gray-700">
        <button
          className={`py-3 px-6 text-sm font-medium transition-colors ${
            activeTab === "endpoints"
              ? "text-indigo-400 border-b-2 border-indigo-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("endpoints")}
        >
          Endpoints
        </button>
        <button
          className={`py-3 px-6 text-sm font-medium transition-colors ${
            activeTab === "examples"
              ? "text-indigo-400 border-b-2 border-indigo-400"
              : "text-gray-400 hover:text-gray-300"
          }`}
          onClick={() => setActiveTab("examples")}
        >
          Code Examples
        </button>
      </div>

      <div className="p-6">
        {activeTab === "endpoints" && (
          <div>
            <h3 className="text-xl font-bold mb-4">API Endpoints</h3>

            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg overflow-hidden">
                <div className="flex items-center px-5 py-3 bg-gray-900">
                  <span className="text-green-400 font-mono mr-3">POST</span>
                  <span className="font-medium text-gray-200">
                    /check/{"{check_string}"}/
                  </span>
                </div>

                <div className="p-5">
                  <h4 className="text-lg font-medium mb-3">
                    Analyze Text for Security Threats
                  </h4>
                  <p className="text-gray-300 mb-4">
                    This endpoint analyzes the provided text to detect potential
                    SQL injection or XSS attacks.
                  </p>

                  <div className="mb-4">
                    <h5 className="text-sm text-gray-400 mb-2">
                      Path Parameters
                    </h5>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="flex">
                        <span className="text-indigo-400 font-mono w-28">
                          check_string
                        </span>
                        <span className="text-gray-300">
                          The text to be analyzed (URL encoded)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-sm text-gray-400 mb-2">
                      Response Format
                    </h5>
                    <div className="bg-gray-800 p-3 rounded">
                      <pre className="text-gray-300 font-mono text-sm whitespace-pre">
                        {`{
  "prediction": "string",    // "sql", "xss", or "safe"
  "confidence": "string",    // Confidence score (0-1)
  "probabilities": "string"  // JSON string with probabilities for each class
}`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm text-gray-400 mb-2">
                      Response Codes
                    </h5>
                    <div className="space-y-2">
                      <div className="flex">
                        <span className="text-green-400 font-mono w-16">
                          200
                        </span>
                        <span className="text-gray-300">
                          Successful analysis
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-yellow-400 font-mono w-16">
                          400
                        </span>
                        <span className="text-gray-300">
                          Bad request - Missing or invalid parameters
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-red-400 font-mono w-16">429</span>
                        <span className="text-gray-300">
                          Too many requests - Rate limit exceeded
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-red-400 font-mono w-16">500</span>
                        <span className="text-gray-300">Server error</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-900 bg-opacity-40 p-5 rounded-lg border border-indigo-800">
                <h4 className="text-lg font-medium text-indigo-300 mb-2">
                  Rate Limits
                </h4>
                <p className="text-gray-300 mb-2">
                  During beta, the following rate limits apply:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
                  <li>100 requests per hour per IP address</li>
                  <li>1000 requests per day per IP address</li>
                </ul>
                <p className="text-sm text-gray-400 mt-3">
                  For higher limits, please contact us about our upcoming
                  enterprise plans.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "examples" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Code Examples</h3>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">JavaScript / Fetch</h4>
                  <button
                    id="copy-button"
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                    onClick={() => copyToClipboard(javascriptExample)}
                  >
                    Copy
                  </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-sm">
                    {`const analyzeText = async (text) => {
  try {
    const response = await fetch(\`/check/\${encodeURIComponent(text)}/\`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Prediction:', data.prediction);
    console.log('Confidence:', data.confidence);
    console.log('Probabilities:', JSON.parse(data.probabilities));
    
    return data;
  } catch (error) {
    console.error('Error analyzing text:', error);
  }
};

// Example usage
analyzeText("SELECT * FROM users WHERE username = 'admin' OR 1=1;");`}
                  </pre>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">Python / Requests</h4>
                  <button
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                    onClick={() => copyToClipboard(pythonExample)}
                  >
                    Copy
                  </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-sm">
                    {`import requests
import json
import urllib.parse

def analyze_text(text):
    """Analyze text for security threats using the API."""
    try:
        encoded_text = urllib.parse.quote(text)
        url = f"/check/{encoded_text}/"
        
        response = requests.post(url)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        data = response.json()
        print(f"Prediction: {data['prediction']}")
        print(f"Confidence: {data['confidence']}")
        print(f"Probabilities: {json.loads(data['probabilities'])}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error analyzing text: {e}")
        return None

# Example usage
analyze_text("<script>alert('XSS Attack');</script>")`}
                  </pre>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">
                    Node.js / Express Integration
                  </h4>
                  <button
                    className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
                    onClick={() => copyToClipboard(nodeExample)}
                  >
                    Copy
                  </button>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-gray-300 font-mono text-sm">
                    {`const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Middleware to check form inputs for security threats
const securityCheckMiddleware = async (req, res, next) => {
  try {
    // Check each field in the request body
    const securityChecks = await Promise.all(
      Object.entries(req.body).map(async ([field, value]) => {
        if (typeof value === 'string') {
          const response = await fetch(
            \`/check/\${encodeURIComponent(value)}/\`,
            { method: 'POST' }
          );
          
          if (!response.ok) {
            throw new Error(\`Security check failed: \${response.statusText}\`);
          }
          
          const result = await response.json();
          return { field, result };
        }
        return null;
      }).filter(Boolean)
    );
    
    // Check if any fields were flagged as security threats
    const threats = securityChecks.filter(
      check => check.result.prediction !== 'safe'
    );
    
    if (threats.length > 0) {
      return res.status(400).json({
        error: 'Security threat detected',
        threats: threats.map(t => ({
          field: t.field,
          type: t.result.prediction,
          confidence: t.result.confidence
        }))
      });
    }
    
    // No threats found, continue to the next middleware
    next();
  } catch (error) {
    console.error('Security check error:', error);
    next(error);
  }
};

// Example route with security check
app.post('/api/user/create', securityCheckMiddleware, (req, res) => {
  // Process the request safely...
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Example code strings for copy functionality
const javascriptExample = `const analyzeText = async (text) => {
  try {
    const response = await fetch(\`/check/\${encodeURIComponent(text)}/\`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Prediction:', data.prediction);
    console.log('Confidence:', data.confidence);
    console.log('Probabilities:', JSON.parse(data.probabilities));
    
    return data;
  } catch (error) {
    console.error('Error analyzing text:', error);
  }
};

// Example usage
analyzeText("SELECT * FROM users WHERE username = 'admin' OR 1=1;");`;

const pythonExample = `import requests
import json
import urllib.parse

def analyze_text(text):
    """Analyze text for security threats using the API."""
    try:
        encoded_text = urllib.parse.quote(text)
        url = f"/check/{encoded_text}/"
        
        response = requests.post(url)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        data = response.json()
        print(f"Prediction: {data['prediction']}")
        print(f"Confidence: {data['confidence']}")
        print(f"Probabilities: {json.loads(data['probabilities'])}")
        
        return data
    except requests.exceptions.RequestException as e:
        print(f"Error analyzing text: {e}")
        return None

# Example usage
analyze_text("<script>alert('XSS Attack');</script>")`;

const nodeExample = `const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Middleware to check form inputs for security threats
const securityCheckMiddleware = async (req, res, next) => {
  try {
    // Check each field in the request body
    const securityChecks = await Promise.all(
      Object.entries(req.body).map(async ([field, value]) => {
        if (typeof value === 'string') {
          const response = await fetch(
            \`/check/\${encodeURIComponent(value)}/\`,
            { method: 'POST' }
          );
          
          if (!response.ok) {
            throw new Error(\`Security check failed: \${response.statusText}\`);
          }
          
          const result = await response.json();
          return { field, result };
        }
        return null;
      }).filter(Boolean)
    );
    
    // Check if any fields were flagged as security threats
    const threats = securityChecks.filter(
      check => check.result.prediction !== 'safe'
    );
    
    if (threats.length > 0) {
      return res.status(400).json({
        error: 'Security threat detected',
        threats: threats.map(t => ({
          field: t.field,
          type: t.result.prediction,
          confidence: t.result.confidence
        }))
      });
    }
    
    // No threats found, continue to the next middleware
    next();
  } catch (error) {
    console.error('Security check error:', error);
    next(error);
  }
};

// Example route with security check
app.post('/api/user/create', securityCheckMiddleware, (req, res) => {
  // Process the request safely...
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`;

export default ApiDocumentation;
