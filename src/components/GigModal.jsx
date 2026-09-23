import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { X } from "lucide-react";

// Frosted glass modal with spring reveal: scale 0.95 -> 1, opacity 0 -> 1, back.out(1.7).
export default function GigModal({ open, title, subtitle, onClose, children, wide = false }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useLayoutEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out", overwrite: true }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.95, y: 14 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.7)", overwrite: true }
      );
    });
    return () => ctx.revert();
  }, [open ]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/30 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        className={`modal-pop frosted w-full rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl ${
          wide ? "max-w-2xl" : "max-w-md"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-sm text-slate-600">{subtitle}</p> : null}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
