import { useRef, useState } from "react";
import axios from "axios";

export default function Home() {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError("");

    const formData = new FormData();
    formData.append("image", fileRef.current.files[0]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h2>Face Personality Analyzer</h2>
      <form onSubmit={handleUpload}>
        <input type="file" ref={fileRef} accept="image/png,image/jpeg" required />
        <button type="submit" disabled={loading} style={{ marginLeft: 10 }}>
          Upload
        </button>
      </form>
      {loading && (
        <div style={{ marginTop: 20 }}>
          Processing... <span className="loader"></span>
        </div>
      )}
      {error && <div style={{ color: "red", marginTop: 20 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 30 }}>
          <h4>Summary:</h4>
          <ul>
            <li>
              <b>Personality Traits:</b> {result.summary.personality_traits?.join(", ")}
            </li>
            <li>
              <b>Emotional Tendencies:</b> {result.summary.emotional_tendencies?.join(", ")}
            </li>
            <li>
              <b>Strengths:</b> {result.summary.strengths?.join(", ")}
            </li>
            <li>
              <b>Recommendations:</b> {result.summary.recommendations?.join(", ")}
            </li>
          </ul>
          <a
            href={`http://localhost:5000${result.reportUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Full PDF Report
          </a>
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 40px auto;
          font-family: sans-serif;
        }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
          display: inline-block;
          vertical-align: middle;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}