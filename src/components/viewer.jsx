import React, { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://192.168.0.106:4000");

export default function Phone() {
  const videoRef = useRef();
  const pcRef = useRef();

  useEffect(() => {
    socket.emit("role", "phone");

    async function startStream() {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;

      // ✅ add STUN server
      pcRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      // add local tracks
      stream.getTracks().forEach((track) =>
        pcRef.current.addTrack(track, stream)
      );

      // send ICE candidates
      pcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log("📤 Phone sending ICE candidate");
          socket.emit("ice-candidate", {
            target: "viewer",
            candidate: event.candidate,
          });
        }
      };

      // create and send offer
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      socket.emit("offer", offer);

      // handle answer from viewer
      socket.on("answer", async (answer) => {
        console.log("📥 Phone received answer");
        await pcRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
      });

      // handle ICE from viewer
      socket.on("ice-candidate", async (candidate) => {
        try {
          console.log("📥 Phone received ICE candidate");
          await pcRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        } catch (err) {
          console.error("❌ Phone error adding ICE candidate", err);
        }
      });
    }

    startStream();
  }, []);

  return (
    <div>
      <h2>📱 Phone (Streamer)</h2>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "400px" }}
      />
    </div>
  );
}
