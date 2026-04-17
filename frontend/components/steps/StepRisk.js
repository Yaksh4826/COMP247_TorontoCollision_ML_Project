"use client";

import Toggle from "@/components/Toggle";

export default function StepRisk({ values, onChange }) {
  const anyRisk = values.SPEEDING || values.ALCOHOL || values.AG_DRIV;
  return (
    <div className="space-y-4">
      <p className="text-xs mb-4" style={{ color: "#9ca3af" }}>
        Select all behavioural risk factors present at the time of the collision.
      </p>
      <Toggle label="Speeding" description="Was the involved party travelling above the posted speed limit?" value={values.SPEEDING} onChange={(v) => onChange("SPEEDING", v)} />
      <Toggle label="Alcohol Involved" description="Was alcohol a contributing factor in this collision?" value={values.ALCOHOL} onChange={(v) => onChange("ALCOHOL", v)} />
      <Toggle label="Aggressive Driving" description="Was aggressive or erratic driving behaviour observed?" value={values.AG_DRIV} onChange={(v) => onChange("AG_DRIV", v)} />

      <div className="pt-2 flex gap-2 flex-wrap">
        {values.SPEEDING && <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#fef2f2", color: "#dc2626" }}>Speeding ✓</span>}
        {values.ALCOHOL && <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#fef2f2", color: "#dc2626" }}>Alcohol ✓</span>}
        {values.AG_DRIV && <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#fef2f2", color: "#dc2626" }}>Aggressive Driving ✓</span>}
        {!anyRisk && <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "#ecfdf5", color: "#059669" }}>No risk factors selected</span>}
      </div>
    </div>
  );
}
