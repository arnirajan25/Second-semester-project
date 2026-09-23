import { Link, useLocation } from "react-router-dom";
import { ArrowLeftRight, LayoutDashboard, LifeBuoy, Plus } from "lucide-react";
import { cn } from "../lib/cn.js";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/swaps", label: "Active Swaps", icon: ArrowLeftRight, end: false },
  { to: "/support", label: "Tech Support", icon: LifeBuoy, end: false },
];

function isActive(pathname, item) {
  if (item.end) return pathname === "/";
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

export default function Topbar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 md:hidden">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
            S
          </span>
          <span className="text-sm font-bold text-slate-900">SkillSwap</span>
        </Link>

        {/* Mobile nav mirrors the sidebar exactly: no Marketplace / Tutoring / Errands */}
        <nav className="flex items-center gap-1 text-sm md:hidden" aria-label="Primary mobile">
          {NAV.map((item) => {
            const active = isActive(location.pathname, item);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 font-medium",
                  active ? "bg-blue-50 font-semibold text-blue-600" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Fall Semester • Verified Campus
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/post-gig"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 md:hidden"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            Post a Gig
          </Link>
          <Link
            to="/login"
            className="rounded-xl border border-slate-200/80 bg-white px-3.5 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Log in
          </Link>
        </div>
      </div>
    </header>
  );
}
