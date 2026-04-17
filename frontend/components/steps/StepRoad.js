"use client";

import { FEATURES_META } from "@/lib/constants";

const activeCard = { borderColor: "#2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 600 };

function CardGroup({ label, options, value, onChange, cols = 2 }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>
        {label}
      </label>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
        {options.map((opt) => (
          <button
            key={opt} type="button"
            onClick={() => onChange(opt)}
            className="option-card"
            style={value === opt ? activeCard : {}}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function StepRoad({ values, onChange }) {
  return (
    <div className="space-y-5">
      <CardGroup label="Road Class" options={FEATURES_META.ROAD_CLASS.options} value={values.ROAD_CLASS} onChange={(v) => onChange("ROAD_CLASS", v)} cols={2} />
      <CardGroup label="Road Surface Condition" options={FEATURES_META.RDSFCOND.options} value={values.RDSFCOND} onChange={(v) => onChange("RDSFCOND", v)} cols={4} />
      <CardGroup label="Traffic Control" options={FEATURES_META.TRAFFCTL.options} value={values.TRAFFCTL} onChange={(v) => onChange("TRAFFCTL", v)} cols={3} />
      <CardGroup label="Visibility" options={FEATURES_META.VISIBILITY.options} value={values.VISIBILITY} onChange={(v) => onChange("VISIBILITY", v)} cols={4} />
      <CardGroup label="Light Condition" options={FEATURES_META.LIGHT.options} value={values.LIGHT} onChange={(v) => onChange("LIGHT", v)} cols={3} />
    </div>
  );
}
