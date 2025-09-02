import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";                 
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import { FaPlay, FaStop, FaEye, FaChartLine, FaCamera } from "react-icons/fa";
import { drawRect } from "./drawRect";

// ✅ drawRect inline here

export const DetectionPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionCount, setDetectionCount] = useState(0);
  const [fps, setFps] = useState(0);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [videoSize, setVideoSize] = useState({ width: 640, height: 480 });
  const intervalRef = useRef(null);

  let lastTime = 0;
  let frameCount = 0;

  // Start detection
  const runCoco = async () => {
    setIsModelLoading(true);
    try {
      const net = await cocossd.load();
      console.log("COCO-SSD model loaded.");
      setIsModelLoading(false);
      setIsDetecting(true);

      intervalRef.current = setInterval(() => {
        detect(net);
      }, 50); // ✅ not too fast, prevents overload
    } catch (error) {
      console.error("Error loading model:", error);
      setIsModelLoading(false);
    }
  };

  // Detect objects
  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      
      // Update video size if needed
      if (videoSize.width !== videoWidth || videoSize.height !== videoHeight) {
        setVideoSize({ width: videoWidth, height: videoHeight });
      }

      // Set canvas dimensions to match video
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);

      // Update UI stats
      setDetectionCount(obj.length);
      setDetectedObjects(
        obj.map((detection) => ({
          class: detection.class,
          confidence: Math.round(detection.score * 100),
        }))
      );

      // FPS calc
      const currentTime = Date.now();
      frameCount++;
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      // Draw detections
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, videoWidth, videoHeight); // ✅ clear before redraw
      drawRect(obj, ctx);
    }
  };

  const stopDetection = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsDetecting(false);
    setDetectionCount(0);
    setFps(0);
    setDetectedObjects([]);
  };

  useEffect(() => {
    // Auto start detection
    runCoco();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Calculate aspect ratio for proper scaling
  const aspectRatio = videoSize.height / videoSize.width;

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Live Object Detection</h1>
          <p className="text-gray-400 mb-6">
            Real-time AI-powered object detection using your camera
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Detection Area */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div 
                ref={containerRef}
                className="relative bg-black rounded-lg overflow-hidden mb-6"
                style={{ 
                  paddingBottom: `${aspectRatio * 100}%`,
                  maxHeight: "70vh"
                }}
              >
                {!isDetecting && !isModelLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <FaCamera className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400 mb-4">Click start to begin detection</p>
                    </div>
                  </div>
                )}

                {isModelLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <div className="h-16 w-16 text-blue-400 mx-auto mb-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
                      <p className="text-blue-400 mb-2">Loading AI Model...</p>
                      <p className="text-gray-500 text-sm">This may take a few moments</p>
                    </div>
                  </div>
                )}

                {/* Webcam + Canvas */}
                <Webcam
                  ref={webcamRef}
                  muted
                  audio={false}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    zIndex: 8,
                  }}
                  videoConstraints={{
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "environment"
                  }}
                />
                <canvas
                  ref={canvasRef}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    zIndex: 9,
                  }}
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap gap-4 justify-center">
                {!isDetecting && !isModelLoading && (
                  <button
                    onClick={runCoco}
                    className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <FaPlay className="h-5 w-5 mr-2" />
                    Start Detection
                  </button>
                )}
                {isDetecting && (
                  <button
                    onClick={stopDetection}
                    className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <FaStop className="h-5 w-5 mr-2" />
                    Stop Detection
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Panel */}
          <div className="space-y-6">
            {/* Performance */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaChartLine className="h-5 w-5 mr-2 text-green-400" />
                Performance
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">FPS:</span>
                  <span className="text-2xl font-bold text-green-400">{fps}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Objects:</span>
                  <span className="text-2xl font-bold text-blue-400">{detectionCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      isDetecting
                        ? "bg-green-900 text-green-400"
                        : isModelLoading
                        ? "bg-yellow-900 text-yellow-400"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {isDetecting ? "Active" : isModelLoading ? "Loading" : "Stopped"}
                  </span>
                </div>
              </div>
            </div>

            {/* Detected Objects */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <FaEye className="h-5 w-5 mr-2 text-purple-400" />
                Detected Objects
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {detectedObjects.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No objects detected</p>
                ) : (
                  detectedObjects.map((obj, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-gray-700 rounded-lg p-3"
                    >
                      <span className="text-white capitalize">{obj.class}</span>
                      <span className="text-blue-400 font-semibold">
                        {obj.confidence}%
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};