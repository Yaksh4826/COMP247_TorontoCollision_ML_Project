"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Activity, Clock, Cpu } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/predict", label: "Predict", Icon: Activity },
  { href: "/history", label: "History", Icon: Clock },
  { href: "/models", label: "Models", Icon: Cpu },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center"
      style={{ background: "white", borderTop: "1px solid #e5eaf5", boxShadow: "0 -4px 20px rgba(37,99,235,0.08)" }}
    >
      <div className="w-full max-w-md flex">
        {tabs.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-all relative"
              style={{ color: active ? "#2563eb" : "#9ca3af" }}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full" style={{ background: "#2563eb" }} />
              )}
              <Icon size={17} strokeWidth={active ? 2.5 : 1.5} />
              <span className="text-[10px] font-semibold">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
