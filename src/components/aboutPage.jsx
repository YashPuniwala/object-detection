import React from "react";
import { FaEye, FaShieldAlt, FaBolt, FaReact, FaPaintBrush, FaMobile, FaBrain, FaChartLine, FaDatabase, FaUserShield } from "react-icons/fa";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-5xl font-bold text-white mb-4">About DetectAI</h1>
          <p className="text-xl text-blue-300">Advanced real-time object detection powered by AI</p>
        </div>

        <div className="space-y-8 pb-12">
          {/* Technology Stack */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <FaReact className="mr-3 text-blue-400" />
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    React.js with Hooks
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Responsive Design
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Modern ES6+
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">AI & Detection</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    TensorFlow.js
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    COCO-SSD Model
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Real-time Processing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Browser-based ML
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-time Detection",
                  description: "Processes video frames in real-time with minimal latency",
                  icon: FaBolt,
                  color: "text-yellow-400"
                },
                {
                  title: "80+ Object Classes",
                  description: "Detects a wide variety of everyday objects with high accuracy",
                  icon: FaEye,
                  color: "text-blue-400"
                },
                {
                  title: "Privacy Focused",
                  description: "All processing happens locally - no data leaves your device",
                  icon: FaShieldAlt,
                  color: "text-green-400"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center p-6 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex justify-center mb-4">
                      <div className="p-4 bg-gray-900 rounded-full">
                        <Icon className={`h-8 w-8 ${feature.color}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-6 text-gray-300">
              <p className="text-lg">
                DetectAI uses the COCO-SSD (Common Objects in Context - Single Shot Detector) model 
                running entirely in your browser through TensorFlow.js.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="flex items-start">
                  <FaDatabase className="h-6 w-6 text-blue-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-white">No Server Processing</h4>
                    <p>Everything runs locally in your browser</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaUserShield className="h-6 w-6 text-green-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-white">Complete Privacy</h4>
                    <p>Your video never leaves your device</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaBolt className="h-6 w-6 text-yellow-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-white">Real-time Performance</h4>
                    <p>Optimized inference for smooth operation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMobile className="h-6 w-6 text-purple-400 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-white">Cross-platform</h4>
                    <p>Works on all modern browsers and devices</p>
                  </div>
                </div>
              </div>
              
              <p className="pt-4">
                The detection pipeline processes video frames at high frequency, identifying objects 
                and drawing bounding boxes with confidence scores in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};