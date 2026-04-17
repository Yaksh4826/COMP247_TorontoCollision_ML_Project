"use client";

import { FEATURES_META } from "@/lib/constants";

function SelectField({ label, options, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 rounded-xl text-sm pr-8"
        style={{
          background: "#ffffff",
          border: "1.5px solid #e2e8f7",
          color: "#0f172a",
          outline: "none",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export default function StepLocation({ values, onChange }) {
  return (
    <div className="space-y-5">
      <SelectField
        label="District"
        options={FEATURES_META.DISTRICT.options}
        value={values.DISTRICT}
        onChange={(v) => onChange("DISTRICT", v)}
      />
      <SelectField
        label="Police Division"
        options={FEATURES_META.DIVISION.options}
        value={values.DIVISION}
        onChange={(v) => onChange("DIVISION", v)}
      />
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: "#374151" }}>
          Neighbourhood ID (Hood 140) — <span style={{ color: "#2563eb" }}>{values.HOOD_140}</span>
        </label>
        <input
          type="range" min={1} max={140}
          value={values.HOOD_140}
          onChange={(e) => onChange("HOOD_140", Number(e.target.value))}
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px]" style={{ color: "#9ca3af" }}>1</span>
          <span className="text-[10px]" style={{ color: "#9ca3af" }}>140</span>
        </div>
      </div>
      <SelectField
        label="Accident Location Type"
        options={FEATURES_META.ACCLOC.options}
        value={values.ACCLOC}
        onChange={(v) => onChange("ACCLOC", v)}
      />
    </div>
  );
}
