import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ArrowLeftRight, Inbox, Star } from "lucide-react";
import CountUp from "../components/CountUp.jsx";
import GigModal from "../components/GigModal.jsx";
import { metrics } from "../data/skillswap.js";

const ICONS = { ArrowLeftRight, Star, Inbox };

export default function Dashboard() {
  const rootRef = useRef(null);
  const [chatOpen, setChatOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-el",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08, overwrite: true }
      );
      gsap.fromTo(
        ".dash-card",
        { opacity: 0, y: 20, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out", stagger: 0.08, delay: 0.15, overwrite: true, clearProps: "scale" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <p className="hero-el inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
        <span className="h-2 w-2 rounded-full bg-emerald-500" /> Fall Semester • Week 8 • Verified Campus
      </p>
      <h1 className="hero-el mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
        Welcome back, Sarah —<br /> swap skills across campus.
      </h1>
      <p className="hero-el mt-2 max-w-xl text-slate-600">
        Track active swaps, post a barter or escrow gig, and get help — all in strict Light Mode.
      </p>
      <div className="hero-el mt-4 flex flex-wrap gap-2">
        <Link
          to="/swaps"
          className="rounded-full border border-slate-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          View Active Swaps
        </Link>
        <Link
          to="/post-gig"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          + Post New Gig
        </Link>
        <Link
          to="/support"
          className="rounded-full border border-slate-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
        >
          Tech Support
        </Link>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((m) => {
          const Icon = ICONS[m.icon] ?? Star;
          return (
            <div key={m.id} className="dash-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600">
                <span>{m.label}</span>
                <Icon className="h-4 w-4 text-blue-600" />
              </div>
              <CountUp
                value={m.value}
                decimals={m.decimals || 0}
                suffix={m.suffix}
                className="mt-2 block text-3xl font-bold text-slate-900"
              />
              <p className="mt-1 text-xs text-slate-600">{m.note}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="dash-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-800">
            BARTER • IN PROGRESS
          </span>
          <h3 className="mt-2 font-bold text-slate-900">Advanced Calculus Tutoring</h3>
          <p className="text-sm text-slate-600">
            Trading 3 hours of calculus for logo design with Marcus T. Due in 2 days.
          </p>
          <div className="mt-3 flex gap-2 text-sm">
            <Link to="/swaps" className="rounded-full bg-slate-100 px-4 py-1.5 font-medium text-slate-900 hover:bg-slate-200">
              View Details
            </Link>
            <button
              onClick={() => setChatOpen(true)}
              className="rounded-full bg-blue-600 px-4 py-1.5 font-medium text-white hover:bg-blue-700"
            >
              Open Chat
            </button>
          </div>
        </div>
        <div className="dash-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800">
              PAID GIG • ESCROW LOCKED
            </span>
            <span className="rounded-lg bg-blue-50 px-2 py-1 font-bold text-blue-600">$45</span>
          </div>
          <h3 className="mt-2 font-bold text-slate-900">Fix React App Routing Bug</h3>
          <p className="text-sm text-slate-600">
            Resolve nested router mismatch for Elena&apos;s portfolio. Due tomorrow 5 PM.
          </p>
          <div className="mt-3 flex gap-2 text-sm">
            <Link to="/swaps" className="rounded-full bg-slate-100 px-4 py-1.5 font-medium text-slate-900 hover:bg-slate-200">
              Workspace
            </Link>
            <Link to="/post-gig" className="rounded-full bg-blue-600 px-4 py-1.5 font-medium text-white hover:bg-blue-700">
              Post Similar Gig
            </Link>
          </div>
        </div>
      </div>

      <GigModal
        open={chatOpen}
        title="Chat with Marcus T."
        subtitle="Advanced Calculus Tutoring • typically replies in minutes"
        onClose={() => setChatOpen(false)}
      >
        <div className="space-y-2 text-sm">
          <p className="max-w-[85%] rounded-2xl bg-slate-100 px-3 py-2 text-slate-900">
            Hi! Can we move Thursday&apos;s session to the library 2nd floor?
          </p>
          <p className="ml-auto max-w-[85%] rounded-2xl bg-blue-600 px-3 py-2 text-white">
            Yes — 4 PM works. I&apos;ll bring the integration set.
          </p>
          <form
            className="flex gap-2 pt-2"
            onSubmit={(e) => {
              e.preventDefault();
              setChatOpen(false);
            }}
          >
            <input
              placeholder="Write a message…"
              className="w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
              Send
            </button>
          </form>
        </div>
      </GigModal>
    </div>
  );
}
