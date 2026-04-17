"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, ChevronLeft, Zap, RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import RiskGauge from "@/components/RiskGauge";
import StepTime from "@/components/steps/StepTime";
import StepLocation from "@/components/steps/StepLocation";
import StepRoad from "@/components/steps/StepRoad";
import StepVehicle from "@/components/steps/StepVehicle";
import StepRisk from "@/components/steps/StepRisk";
import { predict, fetchModels, fetchHealth } from "@/lib/api";
import { DEFAULT_VALUES, STEPS } from "@/lib/constants";

const STEP_COMPONENTS = [StepTime, StepLocation, StepRoad, StepVehicle, StepRisk];

function ModelBadge({ models, selected, onSelect }) {
  if (!models.length) return null;

  const labels = {
    svm: "SVM",
    decision_tree: "Decision Tree",
    neural_network: "Neural Network",
    random_forest: "Random Forest",
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {models.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => onSelect(m)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          style={{
            background: selected === m ? "#2563eb" : "#ffffff",
            color: selected === m ? "white" : "#374151",
            border: `1.5px solid ${selected === m ? "#2563eb" : "#e2e8f7"}`,
            boxShadow: selected === m ? "0 2px 8px rgba(37,99,235,0.2)" : "none",
          }}
        >
          {labels[m] || m}
        </button>
      ))}
    </div>
  );
}

export default function PredictPage() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [currentStep, setCurrentStep] = useState(0);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [apiOnline, setApiOnline] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Load models & health on mount
  useEffect(() => {
    fetchHealth()
      .then(() => setApiOnline(true))
      .catch(() => setApiOnline(false));

    fetchModels()
      .then((data) => {
        setModels(data.models || []);
        if (data.models?.length) setSelectedModel(data.models[0]);
      })
      .catch(() => {});
  }, []);

  const handleChange = useCallback((field, val) => {
    setValues((prev) => ({ ...prev, [field]: val }));
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await predict(selectedModel, values);
      setResult(data);
      // Save to history in localStorage
      const history = JSON.parse(localStorage.getItem("ksi_history") || "[]");
      history.unshift({
        id: Date.now(),
        timestamp: new Date().toISOString(),
        model: data.model,
        prediction: data.prediction,
        confidence: data.confidence,
        inputs: { ...values },
      });
      localStorage.setItem("ksi_history", JSON.stringify(history.slice(0, 50)));
      setShowResult(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setResult(null);
    setCurrentStep(0);
    setValues(DEFAULT_VALUES);
    setError(null);
  };

  const isLastStep = currentStep === STEPS.length - 1;
  const StepComponent = STEP_COMPONENTS[currentStep];
  const step = STEPS[currentStep];

  // Compute score from confidence
  const score = result
    ? result.confidence !== null
      ? Math.round(result.confidence * 100)
      : result.prediction === 1
      ? 80
      : 20
    : 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#f5f7ff" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-40 px-4 pt-5 pb-4"
        style={{
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #3b82f6 100%)",
          boxShadow: "0 2px 16px rgba(37,99,235,0.18)",
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)" }}
              >
                <Zap size={18} color="white" />
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Toronto KSI · ML Predictor
                </p>
                <h1 className="text-base font-bold leading-tight text-white">
                  Collision Risk Analysis
                </h1>
              </div>
            </div>
            {/* API status pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full pulse-dot"
                style={{ background: apiOnline === null ? "#fde68a" : apiOnline ? "#86efac" : "#fca5a5" }}
              />
              <span className="text-[10px] font-medium text-white">
                {apiOnline === null ? "Connecting…" : apiOnline ? "API Online" : "API Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-md mx-auto px-4 pt-5">

          {/* Result view */}
          {showResult && result ? (
            <div className="space-y-5">
              {/* Result card */}
              <div
                className="rounded-2xl p-6 flex flex-col items-center gap-4"
                style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-2 self-start">
                  <CheckCircle2 size={14} style={{ color: "#2563eb" }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#2563eb" }}>
                    Prediction Result
                  </span>
                </div>
                <RiskGauge score={score} prediction={result.prediction} />
                <div
                  className="w-full rounded-xl px-4 py-3 flex justify-between items-center"
                  style={{ background: "#f5f7ff", border: "1.5px solid #e2e8f7" }}
                >
                  <span className="text-xs" style={{ color: "#6b7280" }}>Model Used</span>
                  <span className="text-xs font-semibold capitalize" style={{ color: "#374151" }}>
                    {result.model?.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              {/* Summary chips */}
              <div
                className="rounded-2xl p-4"
                style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <p className="text-xs font-semibold mb-3" style={{ color: "#374151" }}>
                  Input Summary
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { k: "District", v: values.DISTRICT },
                    { k: "Year", v: values.YEAR },
                    { k: "Vehicle", v: values.VEHTYPE },
                    { k: "Road", v: values.ROAD_CLASS },
                    { k: "Visibility", v: values.VISIBILITY },
                    { k: "Light", v: values.LIGHT },
                    { k: "Surface", v: values.RDSFCOND },
                    { k: "Speeding", v: values.SPEEDING ? "Yes" : "No" },
                    { k: "Alcohol", v: values.ALCOHOL ? "Yes" : "No" },
                    { k: "Aggressive", v: values.AG_DRIV ? "Yes" : "No" },
                  ].map(({ k, v }) => (
                    <div
                      key={k}
                      className="px-2.5 py-1 rounded-lg text-[11px]"
                      style={{ background: "#f5f7ff", border: "1.5px solid #e2e8f7" }}
                    >
                      <span style={{ color: "#9ca3af" }}>{k}: </span>
                      <span style={{ color: "#374151", fontWeight: 600 }}>{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", color: "#374151" }}
                >
                  <RefreshCw size={14} />
                  New Prediction
                </button>
                <button
                  onClick={() => { setShowResult(false); setCurrentStep(0); }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: "#2563eb", color: "white" }}
                >
                  Edit Inputs
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Model selector */}
              <div
                className="rounded-2xl p-4"
                style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <p className="text-xs font-semibold mb-2" style={{ color: "#374151" }}>
                  Select Model
                </p>
                {models.length === 0 ? (
                  <div className="flex items-center gap-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: apiOnline === false ? "#dc2626" : "#9ca3af" }}
                    />
                    <p className="text-xs" style={{ color: "#6b7280" }}>
                      {apiOnline === false ? "Cannot reach API — start the Flask server" : "Loading models…"}
                    </p>
                  </div>
                ) : (
                  <ModelBadge models={models} selected={selectedModel} onSelect={setSelectedModel} />
                )}
              </div>

              {/* Step indicator */}
              <StepIndicator
                steps={STEPS}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />

              {/* Step card */}
              <div
                className="rounded-2xl p-5"
                style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                <div className="mb-4">
                  <h2 className="text-base font-bold" style={{ color: "#0f172a" }}>
                    {step.title}
                  </h2>
                  <p className="text-xs" style={{ color: "#9ca3af" }}>
                    {step.subtitle}
                  </p>
                </div>
                <StepComponent values={values} onChange={handleChange} />
              </div>

              {/* Error */}
              {error && (
                <div
                  className="flex items-start gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <AlertCircle size={14} style={{ color: "#ef4444", marginTop: 1, flexShrink: 0 }} />
                  <p className="text-xs" style={{ color: "#ef4444" }}>{error}</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s - 1)}
                    className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "#ffffff", border: "1.5px solid #e2e8f7", color: "#374151" }}
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                )}

                {isLastStep ? (
                  <button
                    type="button"
                    onClick={handlePredict}
                    disabled={loading || !selectedModel || apiOnline === false}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{
                      background: loading || !selectedModel || apiOnline === false ? "#f5f7ff" : "#2563eb",
                      color: loading || !selectedModel || apiOnline === false ? "#9ca3af" : "white",
                      border: `1.5px solid ${loading || !selectedModel || apiOnline === false ? "#e2e8f7" : "transparent"}`,
                      cursor: loading || !selectedModel || apiOnline === false ? "not-allowed" : "pointer",
                      boxShadow: loading || !selectedModel || apiOnline === false ? "none" : "0 0 20px rgba(37,99,235,0.35)",
                    }}
                  >
                    {loading ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        Analysing…
                      </>
                    ) : (
                      <>
                        <Zap size={15} />
                        Predict Risk
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => s + 1)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all"
                    style={{ background: "#2563eb", color: "white", boxShadow: "0 0 16px rgba(37,99,235,0.3)" }}
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

              {/* Progress text */}
              <p className="text-center text-[11px]" style={{ color: "#9ca3af" }}>
                Step {currentStep + 1} of {STEPS.length} — fill in all fields for best accuracy
              </p>
            </div>
          )}
        </div>
      </div>

      <Navbar apiOnline={apiOnline} />
    </div>
  );
}
