// SkillSwap data — scoped to Dashboard / Active Swaps / Tech Support / Post a Gig only.
// Marketplace, Tutoring, and Errands modules intentionally removed.

export const metrics = [
  { id: "swaps", label: "Active Swaps", value: 14, suffix: "", note: "+3 this week", icon: "ArrowLeftRight" },
  { id: "rating", label: "Your Rating", value: 4.9, decimals: 1, suffix: " / 5", note: "32 completed swaps", icon: "Star" },
  { id: "pending", label: "Pending Requests", value: 3, suffix: "", note: "2 need a reply today", icon: "Inbox" },
];

export const initialColumns = {
  requested: [
    { id: "r1", title: "Python Debugging", desc: "Recursive backtracking optimization for CS 201 lab.", user: "Michael B.", meta: "CS • Year 2", est: "1.5 hrs", initials: "MB", color: "bg-blue-100 text-blue-700" },
    { id: "r2", title: "Dorm Room Deep Clean", desc: "Move-out inspection readiness: vacuum, dusting, bathroom.", user: "Sarah L.", meta: "Biology • West Quad", est: "2.0 hrs", initials: "SL", color: "bg-emerald-100 text-emerald-700" },
  ],
  inProgress: [
    { id: "p1", title: "Advanced Calculus Tutoring", desc: "Multivariable integration + Green's Theorem prep.", user: "Marcus T.", meta: "Math • Year 4", pct: 65, note: "Step 2 of 3 — Due in 2 days", initials: "MT", color: "bg-violet-100 text-violet-700" },
    { id: "p2", title: "Event Flyer Design", desc: "Spring Charity Hackathon posters, print + social.", user: "Emily C.", meta: "Fine Arts • Year 3", pct: 90, note: "Review draft — Due tomorrow", initials: "EC", color: "bg-amber-100 text-amber-700" },
  ],
  completed: [
    { id: "c1", title: "Proofread History Essay", desc: "Chicago footnotes + thesis refinement.", user: "Jason K.", meta: "History • Year 4", date: "Oct 12", initials: "JK", color: "bg-slate-100 text-slate-700" },
    { id: "c2", title: "Bike Repair Assistance", desc: "Derailleur alignment, chain lube, brake tuning.", user: "David R.", meta: "Mech Eng • Grad", date: "Oct 10", initials: "DR", color: "bg-slate-100 text-slate-700" },
  ],
};

export const columnMeta = {
  requested: { label: "Requested", badge: "bg-orange-100 text-orange-700" },
  inProgress: { label: "In Progress", badge: "bg-blue-100 text-blue-700" },
  completed: { label: "Completed", badge: "bg-emerald-100 text-emerald-700" },
};

export const initialTickets = [
  { id: "t1", title: "Escrow release stuck on swap #1042", status: "In Progress", pct: 65, updated: "Updated 2h ago" },
  { id: "t2", title: "Can't upload portfolio PDF to gig", status: "Open", pct: 20, updated: "Updated yesterday" },
  { id: "t3", title: "Verified badge missing after SSO", status: "Resolved", pct: 100, updated: "Resolved Oct 11" },
];

export const faqs = [
  { q: "How does Skill Barter work?", a: "Post what you offer and what you need. No money changes hands — both sides log hours and confirm completion." },
  { q: "How does Paid Gig escrow work?", a: "The requester funds escrow when the swap starts. Funds release automatically when both sides confirm completion." },
  { q: "How do I move a swap forward?", a: "Open Active Swaps and use the 1-click transfer buttons or drag cards between Requested, In Progress, and Completed." },
];
