// Import dependencies
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import MainPage from "./MainPage";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [running, setRunning] = React.useState(false);

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [820, 615]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);
      console.log(obj);

      const boxes = await obj[1].array();
      const classes = await obj[2].array();
      const scores = await obj[4].array();

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      requestAnimationFrame(() => {
        drawRect(
          boxes[0],
          classes[0],
          scores[0],
          0.8,
          videoWidth,
          videoHeight,
          ctx
        );
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    // Main function
    console.log("detect");
    const runCoco = async () => {
      const net = await tf.loadGraphModel(
        "https://tensorflowjsrealtimemodel.s3.au-syd.cloud-object-storage.appdomain.cloud/model.json"
      );

      //  Loop and detect hands
      setInterval(() => {
        detect(net);
      }, 50);
    };
    runCoco();
  }, []);

  return (
    <div className="App">
        {running ? (
        <header className="App-header">
          <Webcam
            ref={webcamRef}
            muted={true}
            className="rounded-lg shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]"
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 820,
              height: 615,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "relative",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 820,
              height: 615,
            }}
          />
        </header>
      ) : (
        <MainPage onClick={() => setRunning(true)} />
      )}
    </div>
  );
}

export default App;
