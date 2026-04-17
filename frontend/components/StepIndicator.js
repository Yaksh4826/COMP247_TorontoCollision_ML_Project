"use client";

export default function StepIndicator({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-center gap-1 mb-6">
      {steps.map((step, idx) => {
        const isActive = idx === currentStep;
        const isDone = idx < currentStep;
        return (
          <div key={step.id} className="flex items-center flex-1">
            <button
              type="button"
              onClick={() => isDone && onStepClick(idx)}
              className="flex flex-col items-center gap-1 flex-1 group"
              disabled={!isDone}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                style={{
                  background: isActive
                    ? "#2563eb"
                    : isDone
                    ? "#eff6ff"
                    : "white",
                  border: `2px solid ${
                    isActive
                      ? "#2563eb"
                      : isDone
                      ? "#93c5fd"
                      : "#dde5f5"
                  }`,
                  color: isActive
                    ? "white"
                    : isDone
                    ? "#2563eb"
                    : "#9ca3af",
                }}
              >
                {isDone ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  idx + 1
                )}
              </div>
              <span
                className="text-[10px] font-medium hidden sm:block"
                style={{
                  color: isActive
                    ? "var(--accent-light)"
                    : isDone
                    ? "var(--text-secondary)"
                    : "var(--text-muted)",
                }}
              >
                {step.title}
              </span>
            </button>
            {idx < steps.length - 1 && (
              <div
                className="h-px flex-1 mx-1 transition-all"
                style={{
                  background: isDone ? "var(--accent)" : "var(--border)",
                  opacity: isDone ? 0.6 : 1,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
