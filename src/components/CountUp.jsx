import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CountUp({ value, decimals = 0, suffix = "", className = "" }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { n: 0 };
    const tween = gsap.to(obj, {
      n: value,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => {
        el.textContent = `${obj.n.toFixed(decimals)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals, suffix]);

  return (
    <span ref={ref} className={className}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
