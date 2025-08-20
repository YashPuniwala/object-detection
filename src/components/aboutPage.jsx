import React from "react";
import { Eye, Shield, Zap } from "lucide-react";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About DetectAI</h1>
          <p className="text-xl text-gray-400">Advanced real-time object detection powered by AI</p>
        </div>

        <div className="space-y-8">
          {/* Technology Stack */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Technology Stack</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-3">Frontend</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• React.js with Hooks</li>
                  <li>• Tailwind CSS</li>
                  <li>• Responsive Design</li>
                  <li>• Modern ES6+</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-purple-400 mb-3">AI & Detection</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• TensorFlow.js</li>
                  <li>• COCO-SSD Model</li>
                  <li>• Real-time Processing</li>
                  <li>• Browser-based ML</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Real-time Detection",
                  description: "Processes video frames in real-time with minimal latency",
                  icon: Zap
                },
                {
                  title: "80+ Object Classes",
                  description: "Detects a wide variety of everyday objects with high accuracy",
                  icon: Eye
                },
                {
                  title: "Privacy Focused",
                  description: "All processing happens locally - no data leaves your device",
                  icon: Shield
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-blue-900 rounded-lg">
                        <Icon className="h-8 w-8 text-blue-400" />
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
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                DetectAI uses the COCO-SSD (Common Objects in Context - Single Shot Detector) model 
                running entirely in your browser through TensorFlow.js. This approach ensures:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>No server-side processing required</li>
                <li>Complete privacy - your video never leaves your device</li>
                <li>Real-time performance with optimized inference</li>
                <li>Cross-platform compatibility</li>
              </ul>
              <p>
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