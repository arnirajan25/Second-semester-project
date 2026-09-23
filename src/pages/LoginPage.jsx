import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

// SSO-first login card in strict Light Mode (no dark gradient backdrop).
export default function LoginPage() {
  const cardRef = useRef(null);
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState("sarah.j@campus.edu");

  useLayoutEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0, scale: 0.96 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.4)", overwrite: true }
    );
  }, []);

  const pop = () =>
    gsap.fromTo(
      cardRef.current,
      { scale: 0.985 },
      { scale: 1, duration: 0.4, ease: "back.out(2)", overwrite: true, clearProps: "scale" }
    );

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center py-8">
      <div
        ref={cardRef}
        className="modal-pop w-full rounded-3xl border border-slate-200/80 bg-white p-8 shadow-sm"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
            S
          </div>
          <h1 className="mt-3 text-2xl font-bold text-slate-900">University Exchange</h1>
          <p className="text-sm text-slate-600">Trade skills, peer tutoring, and campus services safely.</p>
        </div>
        <button
          onClick={pop}
          className="mt-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          🎓 Log in with University ID (.edu)
        </button>
        <p className="mt-1 text-center text-xs text-slate-600">Shibboleth & CAS Single Sign-On Enforced</p>
        <div className="my-4 flex items-center gap-2 text-[11px] font-semibold uppercase text-slate-600">
          <span className="h-px flex-1 bg-slate-200" /> Or manual sign in{" "}
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            pop();
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-xs font-semibold text-slate-900">Student or Faculty Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-900">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                defaultValue="password123"
                className="mt-1 w-full rounded-xl border border-slate-200/80 bg-white px-3 py-2.5 pr-12 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button className="w-full rounded-xl bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
            Sign In →
          </button>
        </form>
        <p className="mt-4 rounded-xl bg-slate-50 p-2 text-center text-xs text-slate-600">
          🛡️ Student Identity & Skill Escrow Guaranteed by Campus Node.
        </p>
      </div>
    </div>
  );
}
