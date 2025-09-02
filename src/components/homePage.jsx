import React, { useState } from "react";
import { FaCamera, FaEye, FaInfo, FaShieldAlt, FaMobile, FaBolt } from "react-icons/fa";

export const HomePage = ({ setActiveTab }) => {
      const [role, setRole] = useState(null);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-blue-400 rounded-full opacity-75"></div>
                <FaEye className="relative h-20 w-20 text-blue-400" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Real-time
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"> Object Detection</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-gray-300 mb-12">
              Experience cutting-edge AI-powered object detection in real-time. Built with TensorFlow.js and COCO-SSD model for instant, accurate detection directly in your browser.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setActiveTab('detection')}
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <FaCamera className="h-5 w-5 mr-2" />
                Start Detection
              </button>
              <button
                onClick={() => setActiveTab('about')}
                className="inline-flex items-center px-8 py-3 border border-gray-600 text-base font-medium rounded-lg text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <FaInfo className="h-5 w-5 mr-2" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

       <div className="p-6">
      {!role && (
        <div className="flex gap-4">
          <button
            onClick={() => setRole("phone")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            I am Phone (Streamer)
          </button>
          <button
            onClick={() => setRole("viewer")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            I am Viewer
          </button>
        </div>
      )}
      {role === "phone" && <Phone />}
      {role === "viewer" && <Viewer />}
    </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Advanced AI detection capabilities with real-time processing and cross-platform compatibility
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FaBolt,
                title: "Real-time Processing",
                description: "Instant object detection with 10ms intervals for smooth, responsive performance"
              },
              {
                icon: FaMobile,
                title: "Mobile Optimized",
                description: "Fully responsive design that works seamlessly across all devices and screen sizes"
              },
              {
                icon: FaShieldAlt,
                title: "Privacy First",
                description: "All processing happens locally in your browser - no data ever leaves your device"
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-800/80 p-8 rounded-xl backdrop-blur-sm border border-gray-700">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Objects Detected", value: "80+" },
              { label: "FPS", value: "60" },
              { label: "Accuracy", value: "95%" },
              { label: "Latency", value: "<10ms" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};