import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MessageCircle, Plus } from "lucide-react";
import GigModal from "../components/GigModal.jsx";
import TicketBar from "../components/TicketBar.jsx";
import { faqs, initialTickets } from "../data/skillswap.js";
import { cn } from "../lib/cn.js";

const STATUS_STYLE = {
  Open: "bg-orange-100 text-orange-800",
  "In Progress": "bg-blue-100 text-blue-700",
  Resolved: "bg-emerald-100 text-emerald-700",
};

export default function TechSupport() {
  const rootRef = useRef(null);
  const [tickets, setTickets] = useState(initialTickets);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08, overwrite: true }
      );
      gsap.fromTo(
        ".support-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.08, delay: 0.12, overwrite: true }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const submitTicket = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTickets((prev) => [
      { id: `t${Date.now()}`, title: title.trim(), status: "Open", pct: 10, updated: "Just now" },
      ...prev,
    ]);
    setTitle("");
    setDetail("");
    setModalOpen(false);
  };

  return (
    <div ref={rootRef}>
      <p className="hero-el text-xs font-bold uppercase tracking-widest text-blue-600">Help Center</p>
      <div className="hero-el mt-1 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Tech Support</h1>
          <p className="mt-1 max-w-xl text-slate-600">
            Track ticket progress with animated fill bars, or open a new request.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          New Ticket
        </button>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="support-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Your tickets</h2>
          <div className="mt-3 space-y-3">
            {tickets.map((t) => (
              <article key={t.id} className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">{t.title}</p>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold",
                      STATUS_STYLE[t.status] ?? "bg-slate-200 text-slate-700"
                    )}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="mt-2">
                  <TicketBar pct={t.pct} />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-slate-600">
                  <span>{t.pct}% • {t.updated}</span>
                  <span className="inline-flex items-center gap-1 font-medium text-blue-600">
                    <MessageCircle className="h-3.5 w-3.5" /> Message support
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="support-card rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h2 className="font-bold text-slate-900">Frequently asked</h2>
          <div className="mt-3 space-y-2">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200/80 bg-slate-50 px-3 py-2.5"
              >
                <summary className="cursor-pointer text-sm font-semibold text-slate-900">{f.q}</summary>
                <p className="mt-1 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-900">
            <span className="font-semibold">Average response: 4.2 mins.</span> Verified campus
            support, Mon–Sat 9 AM – 8 PM.
          </div>
        </section>
      </div>

      <GigModal
        open={modalOpen}
        title="Submit a support ticket"
        subtitle="We usually reply within a few minutes during help hours."
        onClose={() => setModalOpen(false)}
      >
        <form onSubmit={submitTicket} className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-900">Subject</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Escrow release is stuck"
              className="mt-1 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-900">Details</label>
            <textarea
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows={4}
              placeholder="What happened? Include swap ID, screenshots, steps to reproduce…"
              className="mt-1 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
            Submit Ticket →
          </button>
        </form>
      </GigModal>
    </div>
  );
}
