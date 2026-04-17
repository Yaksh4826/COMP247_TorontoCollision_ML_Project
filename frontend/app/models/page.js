"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Trophy, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { fetchModels, fetchHealth } from "@/lib/api";

// Real accuracies from the notebook
const ALL_MODELS = [
  {
    key: "random_forest",
    name: "Random Forest",
    short: "RF",
    color: "#d97706",
    accuracy: 88.75,
    f1: 0.87,
    auc: null,
    note: "Tuned — Cell 83",
    tags: ["Ensemble", "Bagging"],
    best: true,
  },
  {
    key: "decision_tree",
    name: "Decision Tree",
    short: "DT",
    color: "#059669",
    accuracy: 82.92,
    f1: 0.45,
    auc: null,
    note: "Cell 92",
    tags: ["Tree-based", "Interpretable"],
    best: false,
  },
  {
    key: "svm",
    name: "Support Vector Machine",
    short: "SVM",
    color: "#2563eb",
    accuracy: null,
    f1: null,
    auc: 83.60,
    note: "AUC from Cell 109 — accuracy not saved",
    tags: ["Kernel RBF", "Binary Classifier"],
    best: false,
  },
  {
    key: "neural_network",
    name: "Neural Network",
    short: "NN",
    color: "#7c3aed",
    accuracy: null,
    f1: null,
    auc: null,
    note: "Output not saved in notebook",
    tags: ["MLP", "Deep Learning"],
    best: false,
  },
];

function AccuracyBar({ value, color }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setW(value ?? 0), 120);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "#e2e8f7" }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${w}%`, background: value ? color : "#e2e8f7" }}
      />
    </div>
  );
}

export default function ModelsPage() {
  const [loadedModels, setLoadedModels] = useState([]);
  const [apiOnline, setApiOnline] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchHealth().then(() => setApiOnline(true)).catch(() => setApiOnline(false));
    fetchModels()
      .then((d) => setLoadedModels(d.models || []))
      .catch(() => setLoadedModels([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const bestModel = ALL_MODELS.find((m) => m.best);

  return (
    <div className="min-h-screen pb-24" style={{ background: "#f5f7ff" }}>

      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pt-5 pb-4"
        style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 60%,#3b82f6 100%)", boxShadow: "0 2px 16px rgba(37,99,235,0.18)" }}
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>
              Toronto KSI · ML Predictor
            </p>
            <h1 className="text-base font-bold text-white">Models</h1>
          </div>
          <button onClick={load} className="p-2 rounded-xl" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pt-5 space-y-3">

        {/* API status */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: apiOnline ? "#ecfdf5" : "#fef2f2",
            border: `1.5px solid ${apiOnline ? "#6ee7b7" : "#fca5a5"}`,
          }}
        >
          {apiOnline
            ? <CheckCircle2 size={14} style={{ color: "#059669" }} />
            : <XCircle size={14} style={{ color: "#dc2626" }} />}
          <p className="text-xs font-semibold" style={{ color: apiOnline ? "#065f46" : "#7f1d1d" }}>
            {apiOnline
              ? `API Online — ${loadedModels.length} model${loadedModels.length !== 1 ? "s" : ""} loaded`
              : "API Offline — run: python api/app.py"}
          </p>
        </div>

        {/* Best model highlight */}
        {bestModel && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ background: "#fffbeb", border: "1.5px solid #fcd34d" }}
          >
            <Trophy size={16} style={{ color: "#d97706", flexShrink: 0 }} />
            <div>
              <p className="text-xs font-bold" style={{ color: "#92400e" }}>
                Best Model — {bestModel.name}
              </p>
              <p className="text-[10px]" style={{ color: "#b45309" }}>
                Highest accuracy at {bestModel.accuracy}% on the KSI test set
              </p>
            </div>
          </div>
        )}

        {/* Model cards — always show all 4 */}
        {ALL_MODELS.map((m) => {
          const isLoaded = loadedModels.includes(m.key);
          return (
            <div
              key={m.key}
              className="rounded-2xl p-4"
              style={{
                background: "#ffffff",
                border: `1.5px solid ${m.best ? "#fcd34d" : "#e2e8f7"}`,
                boxShadow: m.best ? "0 4px 16px rgba(217,119,6,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Top row */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: `${m.color}18`, color: m.color }}
                >
                  {m.short}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold" style={{ color: "#0f172a" }}>{m.name}</h3>
                    {m.best && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase" style={{ background: "#fef3c7", color: "#92400e" }}>
                        ★ Best
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1 mt-0.5 flex-wrap">
                    {m.tags.map((t) => (
                      <span key={t} className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${m.color}12`, color: m.color }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Accuracy / AUC pill */}
                <div className="text-right flex-shrink-0">
                  {m.accuracy != null ? (
                    <>
                      <p className="text-lg font-black leading-none" style={{ color: m.color }}>{m.accuracy}%</p>
                      <p className="text-[9px]" style={{ color: "#9ca3af" }}>accuracy</p>
                    </>
                  ) : m.auc != null ? (
                    <>
                      <p className="text-lg font-black leading-none" style={{ color: m.color }}>{m.auc}%</p>
                      <p className="text-[9px]" style={{ color: "#9ca3af" }}>AUC</p>
                    </>
                  ) : (
                    <>
                      <p className="text-base font-black leading-none" style={{ color: "#d1d5db" }}>—</p>
                      <p className="text-[9px]" style={{ color: "#9ca3af" }}>not saved</p>
                    </>
                  )}
                </div>
              </div>

              {/* Bar */}
              <AccuracyBar value={m.accuracy ?? m.auc} color={m.color} />

              {/* Stats row */}
              <div className="flex gap-4 mt-3 flex-wrap">
                {m.f1 != null && (
                  <div>
                    <p className="text-[10px]" style={{ color: "#9ca3af" }}>F1 Score</p>
                    <p className="text-xs font-bold" style={{ color: "#374151" }}>{m.f1.toFixed(2)}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px]" style={{ color: "#9ca3af" }}>Features</p>
                  <p className="text-xs font-bold" style={{ color: "#374151" }}>22</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: "#9ca3af" }}>Task</p>
                  <p className="text-xs font-bold" style={{ color: "#374151" }}>KSI Binary</p>
                </div>
                <div>
                  <p className="text-[10px]" style={{ color: "#9ca3af" }}>API Status</p>
                  <p className="text-xs font-bold" style={{ color: isLoaded ? "#059669" : "#9ca3af" }}>
                    {isLoaded ? "● Live" : "○ Not loaded"}
                  </p>
                </div>
              </div>

              {/* Notebook note */}
              <p className="text-[9px] mt-2 pt-2" style={{ color: "#c4c9d4", borderTop: "1px solid #f1f5f9" }}>
                Source: {m.note}
              </p>
            </div>
          );
        })}

      </div>

      <Navbar />
    </div>
  );
}
