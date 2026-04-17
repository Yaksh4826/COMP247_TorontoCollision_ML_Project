"use client";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function formatHour(h) {
  if (h === 0) return "12 AM";
  if (h === 12) return "12 PM";
  if (h < 12) return `${h} AM`;
  return `${h - 12} PM`;
}

const pill = {
  background: "#ffffff",
  border: "1.5px solid #e2e8f7",
  borderRadius: 8,
  padding: "4px 10px",
  fontSize: "0.8rem",
  fontWeight: 700,
  color: "#2563eb",
};

const activeCard = { borderColor: "#2563eb", background: "#eff6ff", color: "#2563eb", fontWeight: 600 };

export default function StepTime({ values, onChange }) {
  return (
    <div className="space-y-6">
      {/* Year */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>Year</label>
        <div className="flex items-center gap-3">
          <input
            type="range" min={2006} max={new Date().getFullYear()}
            value={values.YEAR}
            onChange={(e) => onChange("YEAR", Number(e.target.value))}
            className="flex-1"
          />
          <span style={pill}>{values.YEAR}</span>
        </div>
      </div>

      {/* Month */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>Month</label>
        <div className="grid grid-cols-6 gap-1.5">
          {MONTHS.map((m, i) => (
            <button
              key={m} type="button"
              onClick={() => onChange("MONTH", i + 1)}
              className="option-card py-2 text-xs"
              style={values.MONTH === i + 1 ? activeCard : {}}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Day of Week */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>Day of Week</label>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((d, i) => (
            <button
              key={d} type="button"
              onClick={() => onChange("DAY_OF_WEEK", i)}
              className="option-card py-2.5 text-xs"
              style={values.DAY_OF_WEEK === i ? activeCard : {}}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Hour */}
      <div>
        <label className="block text-xs font-semibold mb-2" style={{ color: "#374151" }}>
          Hour of Day — <span style={{ color: "#2563eb" }}>{formatHour(values.HOUR)}</span>
        </label>
        <input
          type="range" min={0} max={23}
          value={values.HOUR}
          onChange={(e) => onChange("HOUR", Number(e.target.value))}
        />
        <div className="flex justify-between mt-1 px-0.5">
          {[0, 6, 12, 18, 23].map((h) => (
            <span key={h} className="text-[10px]" style={{ color: "#9ca3af" }}>{formatHour(h)}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
