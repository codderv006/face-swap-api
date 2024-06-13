import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [targetImageUrl, setTargetImageUrl] = useState("");
  const [sourceImageUrl, setSourceImageUrl] = useState("");
  const [resultImageUrl, setResultImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFaceSwap = async () => {
    const data = JSON.stringify({
      TargetImageUrl: targetImageUrl,
      SourceImageUrl: sourceImageUrl,
      MatchGender: true,
      MaximumFaceSwapNumber: 5,
    });

    const config = {
      method: "post",
      url: "https://faceswap-image-transformation-api.p.rapidapi.com/faceswapgroup",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "faceswap-image-transformation-api.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: data,
    };

    setLoading(true);

    try {
      const response = await axios(config);
      setResultImageUrl(response.data.ResultImageUrl);
    } catch (error) {
      console.error("Error during face swap:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Face Swap App</h1>
        </div>
      </header>
      <div className="main-content">
        <div className="image-inputs">
          <div className="image-container">
            <label>
              Target Image URL:
              <input
                type="text"
                value={targetImageUrl}
                onChange={(e) => setTargetImageUrl(e.target.value)}
                placeholder="Enter Target Image URL"
              />
            </label>
            {targetImageUrl && (
              <div className="image-preview">
                <h3>Target Image Preview:</h3>
                <img src={targetImageUrl} alt="Target Preview" />
              </div>
            )}
          </div>
          <div className="image-container">
            <label>
              Source Image URL:
              <input
                type="text"
                value={sourceImageUrl}
                onChange={(e) => setSourceImageUrl(e.target.value)}
                placeholder="Enter Source Image URL"
              />
            </label>
            {sourceImageUrl && (
              <div className="image-preview">
                <h3>Source Image Preview:</h3>
                <img src={sourceImageUrl} alt="Source Preview" />
              </div>
            )}
          </div>
        </div>
        <div className="swap-button-container">
          <button
            onClick={handleFaceSwap}
            disabled={loading || !targetImageUrl || !sourceImageUrl}
          >
            {loading ? "Processing..." : "Swap Faces"}
          </button>
        </div>
        {resultImageUrl && (
          <div className="result-container">
            <h2>Result Image:</h2>
            <img src={resultImageUrl} alt="Face Swap Result" />
          </div>
        )}
      </div>
      <footer className="footer">
        <p>
          2024 made with ❤️ by{" "}
          <a
            href="https://twitter.com/vedant.time"
            target="_blank"
            rel="noopener noreferrer"
          >
            @vedant.time
          </a>
        </p>
        <p>
          <a
            href="https://github.com/codderv006/face-swap-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Repo
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
