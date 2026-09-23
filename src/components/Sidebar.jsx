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

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-slate-200/80 bg-white md:flex"
    >
      <Link to="/" className="flex items-center gap-2 px-5 pb-5 pt-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
          S
        </span>
        <span className="text-slate-900">
          <span className="block text-[15px] font-bold leading-tight">SkillSwap</span>
          <span className="block text-xs font-normal text-slate-600">Campus Exchange</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-1 px-3" aria-label="Primary">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(location.pathname, item);
          return (
            <Link
              key={item.to}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={cn(
                "sidebar-item flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-blue-50 font-semibold text-blue-600"
                  : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4" strokeWidth={2.2} />
              {item.label}
            </Link>
          );
        })}

        <Link
          to="/post-gig"
          className={cn(
            "sidebar-item mt-3 flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold shadow-sm transition-colors",
            location.pathname === "/post-gig"
              ? "bg-blue-700 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Post a Gig
        </Link>
      </nav>

      <div className="p-4">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-3">
          <p className="text-xs font-semibold text-slate-900">Honor rating 4.9</p>
          <p className="mt-0.5 text-xs text-slate-600">32 swaps completed safely with escrow.</p>
        </div>
      </div>
    </aside>
  );
}
