import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Handshake, Lock } from "lucide-react";
import GigModal from "../components/GigModal.jsx";
import { cn } from "../lib/cn.js";

export default function PostGig() {
  const rootRef = useRef(null);
  const pillRef = useRef(null);
  const escrowWrapRef = useRef(null);
  const [mode, setMode] = useState("barter"); // barter | escrow
  const [title, setTitle] = useState("Organic Chemistry tutoring for React UI design");
  const [price, setPrice] = useState("45");
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08, overwrite: true }
      );
      gsap.fromTo(
        ".step-card",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.1, delay: 0.12, overwrite: true }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // Animate sliding pill + escrow field whenever the payment mode changes.
  useLayoutEffect(() => {
    gsap.to(pillRef.current, {
      x: mode === "escrow" ? "100%" : "0%",
      duration: 0.4,
      ease: "power3.out",
      overwrite: true,
    });
    const wrap = escrowWrapRef.current;
    if (!wrap) return;
    if (mode === "escrow") {
      gsap.fromTo(
        wrap,
        { height: 0, opacity: 0, y: -6 },
        { height: "auto", opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: true }
      );
    } else {
      gsap.to(wrap, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        overwrite: true,
      });
    }
  }, [mode]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setStatus("publishing");
    gsap.fromTo("#post-btn", { x: -4 }, { x: 4, duration: 0.07, repeat: 5, yoyo: true, clearProps: "x" });
    setTimeout(() => {
      setStatus("posted");
      setConfirmOpen(true);
      gsap.fromTo("#post-btn", { scale: 0.92 }, { scale: 1, duration: 0.5, ease: "back.out(2)", clearProps: "scale" });
    }, 900);
  };

  return (
    <div ref={rootRef} className="mx-auto max-w-3xl">
      <p className="hero-el text-xs font-bold uppercase tracking-widest text-blue-600">Campus Bulletin</p>
      <h1 className="hero-el mt-1 text-4xl font-bold tracking-tight text-slate-900">Post a New Gig</h1>
      <p className="hero-el mt-1 text-slate-600">
        Choose barter or escrow. The price field slides down only for paid gigs.
      </p>

      <form onSubmit={submit} className="mt-4 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="step-card">
          <h2 className="font-bold text-slate-900">1. What are you offering or requesting?</h2>
          <label className="mt-2 flex justify-between text-sm font-medium text-slate-900">
            Gig Title <span className="font-normal text-slate-600">{title.length}/70</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 70))}
            maxLength={70}
            placeholder="e.g., Expert Calculus Tutoring or Bike Chain Fix"
            className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              placeholder="Location (e.g. Library Room 3B)"
              className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              placeholder="Availability (e.g. Thu–Sat afternoons)"
              className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            rows={3}
            defaultValue="Let's meet at Main Campus Science Library 2nd floor. I can guide component layout while you quiz me on reactions."
            className="mt-3 w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="step-card mt-6">
          <h2 className="font-bold text-slate-900">2. Payment mode</h2>
          <div
            role="tablist"
            aria-label="Payment mode"
            className="relative mt-3 grid grid-cols-2 gap-1 rounded-2xl border border-slate-200/80 bg-slate-50 p-1"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-xl bg-white shadow-sm"
              style={{ transform: "translate3d(0,0,0)" }}
            />
            <button
              type="button"
              role="tab"
              aria-selected={mode === "barter"}
              onClick={() => setMode("barter")}
              className={cn(
                "relative flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                mode === "barter" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Handshake className="h-4 w-4" />
              Skill Barter (No Money)
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "escrow"}
              onClick={() => setMode("escrow")}
              className={cn(
                "relative flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                mode === "escrow" ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
              )}
            >
              <Lock className="h-4 w-4" />
              Paid Gig ($ Escrow)
            </button>
          </div>

          <div ref={escrowWrapRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
            <label className="mt-3 block text-sm font-medium text-slate-900">
              Escrow Price ($)
              <span className="ml-1 font-normal text-slate-600">Locked until both sides confirm</span>
            </label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, "").slice(0, 7))}
              inputMode="decimal"
              placeholder="e.g., 45"
              className="mt-1 w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            placeholder={
              mode === "escrow"
                ? "What does the $45 cover? (e.g., 2 hrs + parts)"
                : "What do you want in return? (e.g., Python help, textbook trade)"
            }
            className="mt-3 w-full rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="step-card mt-6">
          <h2 className="font-bold text-slate-900">
            3. Attachments <span className="ml-1 text-xs font-normal text-slate-600">Optional</span>
          </h2>
          <label className="mt-2 flex cursor-pointer flex-col items-center rounded-2xl border border-slate-200/80 bg-slate-50 p-6 text-center hover:bg-slate-100">
            <span className="text-2xl">☁️</span>
            <span className="text-sm font-medium text-slate-900">
              Click to upload syllabus, photos, or notes (PNG/JPG/PDF, 25MB)
            </span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => setFiles(Array.from(e.target.files).slice(0, 3))}
            />
            {files.length > 0 && (
              <span className="mt-2 flex flex-wrap justify-center gap-1.5">
                {files.map((f) => (
                  <span key={f.name} className="rounded-full bg-white px-3 py-1 text-xs text-slate-900 shadow-sm">
                    📄 {f.name.slice(0, 16)}…
                  </span>
                ))}
              </span>
            )}
          </label>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-900 p-3 text-white">
          <span className="px-2 text-xs text-slate-300">
            🔒 {mode === "escrow" ? `Escrow locked at $${price || "0"}` : "Campus Verified Barter"}
          </span>
          <button
            id="post-btn"
            type="submit"
            disabled={status === "publishing"}
            className={`rounded-xl px-6 py-2.5 text-sm font-semibold ${
              status === "posted" ? "bg-emerald-500" : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {status === "idle" && "Post Gig →"}
            {status === "publishing" && "Publishing…"}
            {status === "posted" && "✓ Posted!"}
          </button>
        </div>
      </form>

      <GigModal
        open={confirmOpen}
        title={status === "posted" ? "Gig posted!" : "Posting…"}
        subtitle={
          mode === "escrow"
            ? `Paid gig • $${price || "0"} held in escrow until completion.`
            : "Skill barter • no money changes hands."
        }
        onClose={() => setConfirmOpen(false)}
      >
        <p className="text-sm text-slate-600">
          “{title.trim() || "Untitled gig"}” is now live for verified campus members.
        </p>
        <button
          onClick={() => setConfirmOpen(false)}
          className="mt-4 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Done
        </button>
      </GigModal>
    </div>
  );
}
