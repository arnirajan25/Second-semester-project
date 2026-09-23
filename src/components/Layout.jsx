import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import gsap from "gsap";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

// Permanent left sidebar + fixed top bar. Sidebar items ONLY:
// Dashboard, Active Swaps, Tech Support, Post a Gig.
export default function Layout() {
  const outletRef = useRef(null);
  const location = useLocation();

  // GSAP page transition: opacity + slight rise, no layout jitter.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        outletRef.current,
        { opacity: 0, y: 14, scale: 0.995 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", overwrite: true, clearProps: "scale" }
      );
    });
    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 pt-6 sm:px-6">
            <div ref={outletRef} className="page-view">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
