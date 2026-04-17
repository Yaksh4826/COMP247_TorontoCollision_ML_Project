"use client";

import { useEffect, useState } from "react";
import { Clock, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import Navbar from "@/components/Navbar";

function getRiskLevel(score) {
  if (score < 30) return { label: "Low Risk", color: "#10b981" };
  if (score < 60) return { label: "Moderate", color: "#f59e0b" };
  if (score < 80) return { label: "High Risk", color: "#f97316" };
  return { label: "Critical", color: "#ef4444" };
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" });
}

export default function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("ksi_history") || "[]");
    setHistory(h);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("ksi_history");
    setHistory([]);
  };

  const deleteEntry = (id) => {
    const updated = history.filter((h) => h.id !== id);
    localStorage.setItem("ksi_history", JSON.stringify(updated));
    setHistory(updated);
  };

  return (
    <div className="min-h-screen pb-24" style={{ background: "#f0f4ff" }}>
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pt-5 pb-4"
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          boxShadow: "0 2px 16px rgba(37,99,235,0.18)",
        }}
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>
              Toronto KSI · ML Predictor
            </p>
            <h1 className="text-base font-bold text-white">Past Predictions</h1>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
            >
              <Trash2 size={12} />
              Clear All
            </button>
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-5 space-y-3">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "#ffffff", border: "1.5px solid #e2e8f7" }}
            >
              <Clock size={28} style={{ color: "#9ca3af" }} />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium" style={{ color: "#374151" }}>No predictions yet</p>
              <p className="text-xs mt-1" style={{ color: "#9ca3af" }}>Run a prediction to see results here</p>
            </div>
          </div>
        ) : (
          history.map((entry) => {
            const score = entry.confidence !== null && entry.confidence !== undefined
              ? Math.round(entry.confidence * 100)
              : entry.prediction === 1 ? 80 : 20;
            const level = getRiskLevel(score);
            const isKSI = entry.prediction === 1;

            return (
              <div
                key={entry.id}
                className="rounded-2xl p-4"
                style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase"
                        style={{ background: `${level.color}22`, color: level.color }}
                      >
                        {level.label}
                      </span>
                      <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                        {entry.model?.replace(/_/g, " ")}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      {isKSI ? (
                        <TrendingUp size={16} style={{ color: "#ef4444" }} />
                      ) : (
                        <TrendingDown size={16} style={{ color: "#10b981" }} />
                      )}
                      <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                        {isKSI ? "KSI Likely" : "Non-KSI"} — {score}% severity
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        entry.inputs?.DISTRICT,
                        entry.inputs?.VEHTYPE,
                        entry.inputs?.ROAD_CLASS,
                        entry.inputs?.VISIBILITY !== "Clear" ? entry.inputs?.VISIBILITY : null,
                        entry.inputs?.SPEEDING ? "Speeding" : null,
                        entry.inputs?.ALCOHOL ? "Alcohol" : null,
                      ].filter(Boolean).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md"
                          style={{ background: "#f5f7ff", color: "#9ca3af", border: "1.5px solid #e2e8f7" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[10px] mt-2" style={{ color: "var(--text-muted)" }}>
                      {formatDate(entry.timestamp)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {/* Mini gauge */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        background: `${level.color}15`,
                        border: `2px solid ${level.color}`,
                        color: level.color,
                      }}
                    >
                      {score}%
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-1.5 rounded-lg transition-all"
                      style={{ color: "var(--text-muted)" }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <Navbar />
    </div>
  );
}
