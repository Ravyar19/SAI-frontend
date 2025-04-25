import React, { useState } from "react";

const InformationPanel = () => {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About" },
    { id: "sql", label: "SQL Injection" },
    { id: "xss", label: "XSS Attacks" },
    { id: "tips", label: "Security Tips" },
  ];

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-indigo-400 border-b-2 border-indigo-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "about" && (
          <div>
            <h3 className="text-xl font-bold mb-3">
              Web Security Threat Detector
            </h3>
            <p className="text-gray-300 mb-4">
              This tool uses a deep learning model to analyze text input and
              detect potential security threats, specifically SQL injection and
              Cross-Site Scripting (XSS) attacks.
            </p>
            <div className="bg-indigo-900 bg-opacity-50 p-4 rounded-lg border border-indigo-800">
              <h4 className="text-indigo-300 font-medium mb-2">How it works</h4>
              <p className="text-gray-300 text-sm">
                Our model was trained on thousands of examples of safe text, SQL
                injection attempts, and XSS attack patterns. It uses a
                bidirectional LSTM neural network architecture to analyze the
                input text and classify it based on patterns it has learned.
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-400">
              <p>Model accuracy: 99.79%</p>
              <p>Last updated: April 2025</p>
            </div>
          </div>
        )}

        {activeTab === "sql" && (
          <div>
            <h3 className="text-xl font-bold text-red-400 mb-3">
              SQL Injection
            </h3>
            <p className="text-gray-300 mb-4">
              SQL injection is a code injection technique that exploits
              vulnerabilities in applications that interact with databases,
              allowing attackers to manipulate database queries.
            </p>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-200 mb-2">
                Common Patterns:
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>
                  <code className="bg-gray-700 px-1 rounded">'OR 1=1--</code> -
                  Forces a query to return all results
                </li>
                <li>
                  <code className="bg-gray-700 px-1 rounded">UNION SELECT</code>{" "}
                  - Combines results from multiple queries
                </li>
                <li>
                  <code className="bg-gray-700 px-1 rounded">DROP TABLE</code> -
                  Attempts to delete database tables
                </li>
                <li>
                  <code className="bg-gray-700 px-1 rounded">admin'--</code> -
                  Comment out the rest of a query
                </li>
              </ul>
            </div>

            <div className="bg-red-900 bg-opacity-30 p-4 rounded-lg border border-red-800">
              <h4 className="text-red-300 font-medium mb-2">
                Real-world Impact
              </h4>
              <p className="text-gray-300 text-sm">
                SQL injection attacks can lead to unauthorized access to
                sensitive data, data theft, data loss, or complete system
                compromise. Many major data breaches have resulted from SQL
                injection vulnerabilities.
              </p>
            </div>
          </div>
        )}

        {activeTab === "xss" && (
          <div>
            <h3 className="text-xl font-bold text-orange-400 mb-3">
              Cross-Site Scripting (XSS)
            </h3>
            <p className="text-gray-300 mb-4">
              XSS attacks inject malicious scripts into otherwise trusted
              websites, allowing attackers to execute scripts in victims'
              browsers to hijack sessions, deface websites, or redirect users.
            </p>

            <div className="mb-4">
              <h4 className="text-lg font-medium text-gray-200 mb-2">
                Common Patterns:
              </h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>
                  <code className="bg-gray-700 px-1 rounded">
                    &lt;script&gt;...&lt;/script&gt;
                  </code>{" "}
                  - Basic script injection
                </li>
                <li>
                  <code className="bg-gray-700 px-1 rounded">
                    javascript:alert()
                  </code>{" "}
                  - JavaScript protocol in URLs
                </li>
                <li>
                  <code className="bg-gray-700 px-1 rounded">
                    onerror=alert()
                  </code>{" "}
                  - Event handler exploitation
                </li>
                <li>
                  <code className="bg-gray-700 px-1 rounded">
                    &lt;img src="x" onerror="..."&gt;
                  </code>{" "}
                  - Image error events
                </li>
              </ul>
            </div>

            <div className="bg-orange-900 bg-opacity-30 p-4 rounded-lg border border-orange-800">
              <h4 className="text-orange-300 font-medium mb-2">Types of XSS</h4>
              <p className="text-gray-300 text-sm">
                <span className="font-medium">Reflected XSS:</span> Malicious
                script comes from the current HTTP request.
                <br />
                <span className="font-medium">Stored XSS:</span> Malicious
                script is stored on the target server.
                <br />
                <span className="font-medium">DOM-based XSS:</span>{" "}
                Vulnerability exists in client-side code.
              </p>
            </div>
          </div>
        )}

        {activeTab === "tips" && (
          <div>
            <h3 className="text-xl font-bold text-green-400 mb-3">
              Security Best Practices
            </h3>
            <p className="text-gray-300 mb-4">
              Implement these security measures to protect your applications
              from injection attacks:
            </p>

            <div className="space-y-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-gray-100 font-medium mb-1">
                  Input Validation
                </h4>
                <p className="text-gray-300 text-sm">
                  Validate all user inputs both on the client and server side.
                  Use whitelisting instead of blacklisting.
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-gray-100 font-medium mb-1">
                  Parameterized Queries
                </h4>
                <p className="text-gray-300 text-sm">
                  Use prepared statements and parameterized queries for database
                  interactions instead of building SQL strings.
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-gray-100 font-medium mb-1">
                  Output Encoding
                </h4>
                <p className="text-gray-300 text-sm">
                  Encode all output data before displaying it to users. Use
                  context-specific encoding for HTML, JavaScript, CSS, and URLs.
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-gray-100 font-medium mb-1">
                  Content Security Policy
                </h4>
                <p className="text-gray-300 text-sm">
                  Implement CSP headers to control which resources can be loaded
                  and executed by the browser, reducing the risk of XSS attacks.
                </p>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <h4 className="text-gray-100 font-medium mb-1">
                  Regular Updates
                </h4>
                <p className="text-gray-300 text-sm">
                  Keep all software, frameworks, and libraries up to date with
                  the latest security patches.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationPanel;
