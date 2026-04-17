"use client";

import { AlertTriangle, ShieldCheck } from "lucide-react";

function getRiskTag(score) {
  if (score < 30) return { label: "Low Risk", color: "#059669", bg: "#ecfdf5", text: "#065f46" };
  if (score < 60) return { label: "Moderate Risk", color: "#d97706", bg: "#fffbeb", text: "#92400e" };
  if (score < 80) return { label: "High Risk", color: "#ea580c", bg: "#fff7ed", text: "#7c2d12" };
  return { label: "Critical Risk", color: "#dc2626", bg: "#fef2f2", text: "#7f1d1d" };
}

export default function RiskGauge({ score, prediction }) {
  const isFatal = prediction === 1;
  const tag = getRiskTag(score);

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Main Fatal / Non-Fatal card */}
      <div
        className="w-full rounded-2xl px-5 py-5 flex items-center gap-4"
        style={{
          background: isFatal ? "#fef2f2" : "#ecfdf5",
          border: `2px solid ${isFatal ? "#fca5a5" : "#6ee7b7"}`,
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: isFatal ? "#dc2626" : "#059669" }}
        >
          {isFatal ? <AlertTriangle size={22} color="white" /> : <ShieldCheck size={22} color="white" />}
        </div>
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-widest mb-0.5"
            style={{ color: isFatal ? "#b91c1c" : "#047857" }}
          >
            Predicted Outcome
          </p>
          <p className="text-xl font-black leading-tight" style={{ color: isFatal ? "#7f1d1d" : "#064e3b" }}>
            {isFatal ? "Fatal Accident" : "Non-Fatal Accident"}
          </p>
          <p className="text-xs mt-1" style={{ color: isFatal ? "#b91c1c" : "#047857" }}>
            {isFatal
              ? "KSI (Killed or Seriously Injured) outcome is likely."
              : "Collision is not expected to result in a KSI outcome."}
          </p>
        </div>
      </div>

      {/* Small risk tag */}
      <div
        className="self-start px-3 py-1.5 rounded-full text-xs font-bold"
        style={{ background: tag.bg, color: tag.text }}
      >
        {tag.label}
      </div>
    </div>
  );
}
