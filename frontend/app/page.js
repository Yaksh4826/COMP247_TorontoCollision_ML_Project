"use client";

import Link from "next/link";
import { Zap, ArrowRight, ShieldAlert, BarChart2, Clock, Cpu, AlertTriangle, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

const FEATURES = [
  { icon: ShieldAlert, title: "Fatal vs Non-Fatal", desc: "Instantly know if a collision is predicted to be fatal or non-fatal." },
  { icon: BarChart2, title: "22-Feature Analysis", desc: "Road, vehicle, weather, time, and behaviour all factored in." },
  { icon: Cpu, title: "Multiple ML Models", desc: "SVM, Decision Tree, Random Forest — pick the engine you trust." },
  { icon: Clock, title: "Prediction History", desc: "Every result saved locally so you can review past analyses." },
];

const STATS = [
  { value: "88.75%", label: "Best Accuracy" },
  { value: "22", label: "Features" },
  { value: "4", label: "ML Models" },
  { value: "KSI", label: "Dataset" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen pb-24" style={{ background: "#f5f7ff" }}>

      {/* Hero — stats bar lives inside here, no negative margin */}
      <div
        className="px-4 pt-12 pb-6 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#1d4ed8 0%,#2563eb 55%,#3b82f6 100%)" }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        <div className="absolute top-16 -right-2 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />

        <div className="max-w-md mx-auto relative">
          {/* Logo row */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.2)" }}>
              <Zap size={16} color="white" />
            </div>
            <span className="text-white font-bold text-sm tracking-tight">KSI Predictor</span>
          </div>

          {/* Headline */}
          <h1 className="text-[2rem] font-black text-white leading-tight mb-3">
            Predict Collision<br />
            <span style={{ color: "#bfdbfe" }}>Severity Instantly</span>
          </h1>
          <p className="text-sm mb-8 max-w-xs" style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.65 }}>
            Enter 22 road and environment factors from Toronto's KSI dataset and get an instant Fatal / Non-Fatal prediction.
          </p>

          {/* CTA button — compact, not full-width */}
          <div className="flex">
            <Link
              href="/predict"
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all"
              style={{
                background: "white",
                color: "#1d4ed8",
                boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
                whiteSpace: "nowrap",
              }}
            >
              Start Prediction
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Stats bar — inside hero */}
          <div
            className="grid grid-cols-4 mt-8 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className="flex flex-col items-center py-3 px-1"
                style={{ borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.15)" : "none" }}
              >
                <p className="text-sm font-black text-white">{value}</p>
                <p className="text-[9px] text-center mt-0.5 leading-tight" style={{ color: "rgba(255,255,255,0.6)" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-md mx-auto px-4 mt-7 w-full">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#9ca3af" }}>How it works</p>
        <div className="space-y-2.5">
          {[
            { step: "1", title: "Choose a Model", desc: "Select SVM, Decision Tree, or another loaded model." },
            { step: "2", title: "Fill 5 Quick Steps", desc: "Time, location, road, vehicle info, risk factors." },
            { step: "3", title: "Get Your Result", desc: "Instant Fatal or Non-Fatal verdict." },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl"
              style={{ background: "#ffffff", border: "1.5px solid #e2e8f7" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black flex-shrink-0"
                style={{ background: "#eff6ff", color: "#2563eb" }}
              >
                {step}
              </div>
              <div>
                <p className="text-sm font-bold" style={{ color: "#0f172a" }}>{title}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample outcomes */}
      <div className="max-w-md mx-auto px-4 mt-6 w-full">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#9ca3af" }}>Possible Outcomes</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl" style={{ background: "#fef2f2", border: "1.5px solid #fca5a5" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "#dc2626" }}>
              <AlertTriangle size={15} color="white" />
            </div>
            <p className="text-sm font-black" style={{ color: "#7f1d1d" }}>Fatal Accident</p>
            <p className="text-[11px] mt-1" style={{ color: "#b91c1c" }}>KSI outcome predicted</p>
          </div>
          <div className="p-4 rounded-2xl" style={{ background: "#ecfdf5", border: "1.5px solid #6ee7b7" }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "#059669" }}>
              <ShieldCheck size={15} color="white" />
            </div>
            <p className="text-sm font-black" style={{ color: "#064e3b" }}>Non-Fatal</p>
            <p className="text-[11px] mt-1" style={{ color: "#047857" }}>Low severity outcome</p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-md mx-auto px-4 mt-6 w-full">
        <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "#9ca3af" }}>Key Features</p>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 rounded-2xl"
              style={{ background: "#ffffff", border: "1.5px solid #e2e8f7" }}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ background: "#eff6ff" }}>
                <Icon size={15} style={{ color: "#2563eb" }} />
              </div>
              <p className="text-xs font-bold mb-1" style={{ color: "#0f172a" }}>{title}</p>
              <p className="text-[11px] leading-relaxed" style={{ color: "#6b7280" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="max-w-md mx-auto px-4 mt-6 w-full">
        <Link
          href="/predict"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold"
          style={{ background: "#2563eb", color: "white", boxShadow: "0 4px 20px rgba(37,99,235,0.3)" }}
        >
          <Zap size={15} />
          Run a Prediction Now
        </Link>
      </div>

      <Navbar />
    </div>
  );
}
