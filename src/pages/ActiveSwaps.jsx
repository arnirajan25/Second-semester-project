import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import SwapCard from "../components/SwapCard.jsx";
import { columnMeta, initialColumns } from "../data/skillswap.js";
import { cn } from "../lib/cn.js";

const ORDER = ["requested", "inProgress", "completed"];

function nextKey(key, dir) {
  const i = ORDER.indexOf(key);
  const n = i + dir;
  if (n < 0 || n >= ORDER.length) return null;
  return ORDER[n];
}

export default function ActiveSwaps() {
  const rootRef = useRef(null);
  const [columns, setColumns] = useState(initialColumns);
  const [toast, setToast] = useState("");
  const [dragId, setDragId] = useState(null);
  const toastRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-el",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.08, overwrite: true }
      );
      gsap.fromTo(
        ".kanban-col",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.1, delay: 0.1, overwrite: true }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!toast) return;
    gsap.fromTo(
      toastRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.6)", overwrite: true }
    );
    const t = setTimeout(() => setToast(""), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const moveCard = (fromKey, cardId, toKey) => {
    if (!toKey || fromKey === toKey) return;
    setColumns((prev) => {
      const card = prev[fromKey].find((c) => c.id === cardId);
      if (!card) return prev;
      return {
        ...prev,
        [fromKey]: prev[fromKey].filter((c) => c.id !== cardId),
        [toKey]: [...prev[toKey], card],
      };
    });
    // Slide/flip-in after state commits (next frame, GPU transform only).
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-card-id="${cardId}"]`);
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0.4, y: 12, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out", overwrite: true, clearProps: "scale" }
        );
      }
    });
    setToast(`Moved to ${columnMeta[toKey].label}.`);
  };

  const badgeFor = (key, card) => {
    if (key === "requested")
      return (
        <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-800">
          Pending Acceptance
        </span>
      );
    if (key === "inProgress")
      return <span className="text-xs font-semibold text-blue-600">{card.note ?? "In Progress"}</span>;
    return (
      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
        Completed{card.date ? ` • ${card.date}` : ""}
      </span>
    );
  };

  return (
    <div ref={rootRef}>
      <p className="hero-el text-xs font-bold uppercase tracking-widest text-blue-600">
        Workspace & Milestones
      </p>
      <h1 className="hero-el mt-1 text-4xl font-bold tracking-tight text-slate-900">Active Swaps</h1>
      <p className="hero-el mt-1 max-w-xl text-slate-600">
        Drag cards between columns or use the 1-click transfer buttons. Status badges update in real time.
      </p>

      <div className="mt-5 grid items-start gap-4 lg:grid-cols-3">
        {ORDER.map((key) => (
          <section
            key={key}
            className="kanban-col rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (!dragId) return;
              const from = ORDER.find((k) => columns[k].some((c) => c.id === dragId));
              if (from) moveCard(from, dragId, key);
              setDragId(null);
            }}
          >
            <h2 className="flex items-center justify-between px-1 text-sm font-bold text-slate-900">
              {columnMeta[key].label}
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", columnMeta[key].badge)}>
                {columns[key].length}
              </span>
            </h2>

            <div className="mt-2 flex flex-col gap-3">
              {columns[key].map((card) => {
                const prev = nextKey(key, -1);
                const next = nextKey(key, 1);
                return (
                  <div key={card.id} data-card-id={card.id}>
                    <SwapCard
                      card={card}
                      badge={badgeFor(key, card)}
                      dragProps={{
                        draggable: true,
                        onDragStart: () => setDragId(card.id),
                        onDragEnd: () => setDragId(null),
                      }}
                      actions={
                        <div>
                          {key === "inProgress" && typeof card.pct === "number" ? (
                            <div className="mb-2">
                              <div className="mb-1 flex justify-between text-xs text-slate-600">
                                <span>Completion</span>
                                <span className="font-bold text-slate-900">{card.pct}%</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className="h-full rounded-full bg-blue-600"
                                  style={{ width: `${card.pct}%` }}
                                />
                              </div>
                            </div>
                          ) : null}
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <button
                              disabled={!prev}
                              onClick={() => prev && moveCard(key, card.id, prev)}
                              className="rounded-lg bg-slate-100 py-1.5 font-medium text-slate-900 hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              ← {prev ? columnMeta[prev].label : "Start"}
                            </button>
                            <button
                              disabled={!next}
                              onClick={() => next && moveCard(key, card.id, next)}
                              className="rounded-lg bg-blue-600 py-1.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              {next ? `${columnMeta[next].label} →` : "Done ✓"}
                            </button>
                          </div>
                        </div>
                      }
                    />
                  </div>
                );
              })}
              {columns[key].length === 0 && (
                <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-xs text-slate-600">
                  Drop cards here or move them with the transfer buttons.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      {toast && (
        <div
          ref={toastRef}
          className="fixed bottom-6 right-6 z-50 rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-lg"
          role="status"
        >
          ✓ {toast}
        </div>
      )}
    </div>
  );
}
