import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// GSAP-animated ticket progress fill bar (GPU scaleX, no layout shift).
export default function TicketBar({ pct }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: Math.min(100, Math.max(0, pct)) / 100,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [pct]);

  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div ref={ref} className="h-full w-full origin-left rounded-full bg-blue-600" />
    </div>
  );
}
