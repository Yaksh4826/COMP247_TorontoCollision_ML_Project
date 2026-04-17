"use client";

export default function OptionCards({ options, value, onChange, cols = 3 }) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={`option-card ${value === opt ? "selected" : ""}`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
