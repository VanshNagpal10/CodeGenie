import React from "react";
import ReactMarkdown from "react-markdown";

interface AnalysisPopupProps {
  analysis: string | React.ReactNode;
  onClose: () => void;
}

const AnalysisPopup: React.FC<AnalysisPopupProps> = ({ analysis, onClose }) => (
  <div className="fixed top-4 right-4 z-50 w-[350px] rounded-xl !bg-white !text-black shadow-xl border border-gray-300 isolate">
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <h2 className="text-xl font-bold text-blue-700 flex items-center gap-2">
        📊 AI Analysis
      </h2>
      <button onClick={onClose} className="text-gray-600 hover:text-black text-2xl">
        ✖
      </button>
    </div>
    <div className="p-4 !text-black !bg-white">
      {typeof analysis === "string" && analysis.length > 0 ? (
        <div className="prose prose-sm !text-black">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      ) : (
        <p className="text-gray-500">No analysis data available.</p>
      )}
    </div>
  </div>
);

export default AnalysisPopup; 