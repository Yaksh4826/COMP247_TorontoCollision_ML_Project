"use client";

import { FEATURES_META } from "@/lib/constants";
import Toggle from "@/components/Toggle";

const activeCard = { borderColor: "#2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 600 };

function CardGroup({ label, options, value, onChange, cols = 2 }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>{label}</label>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
        {options.map((opt) => (
          <button key={opt} type="button" onClick={() => onChange(opt)} className="option-card" style={value === opt ? activeCard : {}}>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

const DIRS = [
  { label: "N", col: 2, row: 1 },
  { label: "W", col: 1, row: 2 },
  { label: "E", col: 3, row: 2 },
  { label: "S", col: 2, row: 3 },
];

export default function StepVehicle({ values, onChange }) {
  return (
    <div className="space-y-5">
      <CardGroup label="Vehicle Type" options={FEATURES_META.VEHTYPE.options} value={values.VEHTYPE} onChange={(v) => onChange("VEHTYPE", v)} cols={3} />

      {/* Compass */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>Initial Direction of Travel</label>
        <div style={{ display: "inline-grid", gridTemplateColumns: "repeat(3,48px)", gridTemplateRows: "repeat(3,48px)", gap: 8 }}>
          {DIRS.map(({ label, col, row }) => (
            <button
              key={label} type="button"
              onClick={() => onChange("INITDIR", label)}
              style={{
                gridColumn: col, gridRow: row,
                width: 48, height: 48, borderRadius: "50%",
                background: values.INITDIR === label ? "#2563eb" : "#ffffff",
                border: `2px solid ${values.INITDIR === label ? "#2563eb" : "#e2e8f7"}`,
                color: values.INITDIR === label ? "white" : "#6b7280",
                fontWeight: 700, fontSize: "0.85rem",
                cursor: "pointer", transition: "all 0.15s",
              }}
            >
              {label}
            </button>
          ))}
          <div style={{
            gridColumn: 2, gridRow: 2, width: 48, height: 48,
            borderRadius: "50%", background: "#f5f7ff",
            border: "1.5px solid #e2e8f7",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#2563eb" }} />
          </div>
        </div>
      </div>

      <Toggle label="Automobile Involved" description="Was a passenger automobile involved?" value={values.AUTOMOBILE} onChange={(v) => onChange("AUTOMOBILE", v)} />
      <CardGroup label="Impact Type" options={FEATURES_META.IMPACTYPE.options} value={values.IMPACTYPE} onChange={(v) => onChange("IMPACTYPE", v)} cols={3} />
      <CardGroup label="Involvement Type" options={FEATURES_META.INVTYPE.options} value={values.INVTYPE} onChange={(v) => onChange("INVTYPE", v)} cols={3} />

      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>
          Involved Person Age — <span style={{ color: "#2563eb" }}>{values.INVAGE} yrs</span>
        </label>
        <input type="range" min={0} max={100} value={values.INVAGE} onChange={(e) => onChange("INVAGE", Number(e.target.value))} />
        <div className="flex justify-between mt-1">
          <span className="text-[10px]" style={{ color: "#9ca3af" }}>0</span>
          <span className="text-[10px]" style={{ color: "#9ca3af" }}>100</span>
        </div>
      </div>
    </div>
  );
}
