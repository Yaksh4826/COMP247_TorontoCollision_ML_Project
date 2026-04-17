"use client";

export default function Toggle({ value, onChange, label, description }) {
  const on = value === 1 || value === true;
  return (
    <div
      className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all"
      style={{
        background: on ? "#eff6ff" : "#ffffff",
        border: `1.5px solid ${on ? "#2563eb" : "#e2e8f7"}`,
      }}
      onClick={() => onChange(on ? 0 : 1)}
    >
      <div>
        <p className="text-sm font-medium" style={{ color: on ? "#1d4ed8" : "#0f172a" }}>
          {label}
        </p>
        {description && (
          <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
            {description}
          </p>
        )}
      </div>
      <div className={`toggle-track ${on ? "on" : ""}`}>
        <div className="toggle-thumb" />
      </div>
    </div>
  );
}
