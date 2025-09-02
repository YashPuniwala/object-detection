import React from "react";
import { FaEye, FaChartBar, FaRunning, FaDesktop } from "react-icons/fa";
import { useState } from "react";

export const AnalyticsPage = () => {
  const [totalDetections] = useState(1247);
  const [uniqueObjects] = useState(23);
  const [avgAccuracy] = useState(94.2);
  const [sessionTime] = useState("2h 15m");

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Analytics Dashboard</h1>
          <p className="text-gray-400">Insights and statistics from your detection sessions</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Detections", value: totalDetections.toLocaleString(), icon: FaEye, color: "blue" },
            { label: "Unique Objects", value: uniqueObjects, icon: FaChartBar, color: "green" },
            { label: "Avg Accuracy", value: `${avgAccuracy}%`, icon: FaRunning, color: "purple" },
            { label: "Session Time", value: sessionTime, icon: FaDesktop, color: "orange" },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg bg-${stat.color}-900`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-400`} />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Charts placeholder */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Detection Over Time</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Chart visualization would go here</p>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Object Distribution</h3>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Pie chart would go here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};