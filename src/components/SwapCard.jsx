import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SwapCard({ card, badge, actions, dragProps }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => gsap.to(el, { y: -4, scale: 1.01, duration: 0.2, ease: "power2.out", overwrite: true });
    const leave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power3.out", overwrite: true });
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <article
      ref={ref}
      {...dragProps}
      className="card-hover rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        {badge}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${card.color ?? "bg-slate-100 text-slate-700"}`}
        >
          {card.initials}
        </span>
      </div>
      <h3 className="mt-2 text-[15px] font-bold text-slate-900">{card.title}</h3>
      <p className="mt-0.5 text-sm text-slate-600">{card.desc}</p>
      <p className="mt-2 text-xs text-slate-600">
        {card.user} • {card.meta}
        {card.est ? ` • Est. ${card.est}` : ""}
        {card.date ? ` • ${card.date}` : ""}
      </p>
      {actions ? <div className="mt-3">{actions}</div> : null}
    </article>
  );
}
