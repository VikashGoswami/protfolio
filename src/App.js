import { useState, useEffect, useRef, useCallback } from "react";

// ─── THEMES ───────────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#090d16", bgSecondary: "#0f172a",
    bgCard: "rgba(255,255,255,0.04)", borderHover: "rgba(59,130,246,0.48)",
    border: "rgba(59,130,246,0.16)", text: "#f1f5f9", textMuted: "#94a3b8", textDim: "#64748b",
    accent: "#3b82f6", accentSecondary: "#f97316", accentGlow: "rgba(59,130,246,0.24)",
    navBg: "rgba(9,13,22,0.88)", tagBg: "rgba(59,130,246,0.09)",
    gradHero: "linear-gradient(135deg,#090d16 0%,#111c33 50%,#090d16 100%)",
    inputBg: "rgba(255,255,255,0.05)",
  },
  light: {
    bg: "#f8fafc", bgSecondary: "#eff6ff",
    bgCard: "rgba(255,255,255,0.92)", borderHover: "rgba(37,99,235,0.55)",
    border: "rgba(37,99,235,0.16)", text: "#0f172a", textMuted: "#475569", textDim: "#94a3b8",
    accent: "#2563eb", accentSecondary: "#ea580c", accentGlow: "rgba(37,99,235,0.18)",
    navBg: "rgba(248,250,252,0.92)", tagBg: "rgba(37,99,235,0.08)",
    gradHero: "linear-gradient(135deg,#eff6ff 0%,#f8fafc 50%,#fff7ed 100%)",
    inputBg: "rgba(255,255,255,0.95)",
  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS = {
  "Languages": ["JavaScript", "TypeScript", "PHP", "HTML5", "CSS3", "SQL"],
  "Frontend": ["React.js", "Next.js 14", "Material UI", "shadcn/ui", "jQuery", "Recharts"],
  "Backend & APIs": ["Laravel 12", "CodeIgniter", "Node.js", "REST API", "MVC / Service-Repository"],
  "Auth & Security": ["JWT Auth", "RBAC", "SMS OTP", "Session Management"],
  "Database": ["MySQL", "Query Optimisation", "Indexing", "Transactions"],
  "Cloud & DevOps": ["AWS EC2", "AWS S3", "AWS RDS", "CI/CD", "Git", "Linux CLI", "Docker"],
  "Tools": ["VS Code", "Postman", "GitHub Copilot", "Composer", "npm", "Atom Payment Gateway"],
};
const SKILL_ICONS = {
  "Languages": "🔤", "Frontend": "🎨", "Backend & APIs": "⚙️",
  "Auth & Security": "🔐", "Database": "🗄️", "Cloud & DevOps": "☁️", "Tools": "🛠️",
};

const DEVICON = (name, variant = "original") =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;

const SKILL_LOGOS = {
  // Languages
  "JavaScript": { src: DEVICON("javascript") },
  "TypeScript": { src: DEVICON("typescript") },
  "PHP": { src: DEVICON("php") },
  "HTML5": { src: DEVICON("html5") },
  "CSS3": { src: DEVICON("css3") },
  "SQL": { src: DEVICON("azuresqldatabase") },
  // Frontend
  "React.js": { src: DEVICON("react") },
  "Next.js 14": { src: DEVICON("nextjs"), darkInvert: true },
  "Material UI": { src: DEVICON("materialui") },
  "shadcn/ui": { src: "https://cdn.simpleicons.org/shadcnui", darkInvert: true },
  "jQuery": { src: DEVICON("jquery") },
  "Recharts": { emoji: "📊" },
  // Backend & APIs
  "Laravel 12": { src: DEVICON("laravel") },
  "CodeIgniter": { src: DEVICON("codeigniter", "plain") },
  "Node.js": { src: DEVICON("nodejs") },
  "REST API": { src: DEVICON("openapi") },
  "MVC / Service-Repository": { emoji: "🧱" },
  // Auth & Security
  "JWT Auth": { src: "https://cdn.simpleicons.org/jsonwebtokens/d63aff" },
  "RBAC": { emoji: "🛡️" },
  "SMS OTP": { emoji: "📱" },
  "Session Management": { emoji: "🔑" },
  // Database
  "MySQL": { src: DEVICON("mysql") },
  "Query Optimisation": { emoji: "⚡" },
  "Indexing": { emoji: "📑" },
  "Transactions": { emoji: "🔄" },
  // Cloud & DevOps
  "AWS EC2": { src: DEVICON("amazonwebservices", "plain-wordmark"), darkInvert: true },
  "AWS S3": { src: DEVICON("amazonwebservices", "plain-wordmark"), darkInvert: true },
  "AWS RDS": { src: DEVICON("amazonwebservices", "plain-wordmark"), darkInvert: true },
  "CI/CD": { src: DEVICON("githubactions") },
  "Git": { src: DEVICON("git") },
  "Linux CLI": { src: DEVICON("linux") },
  "Docker": { src: DEVICON("docker") },
  // Tools
  "VS Code": { src: DEVICON("vscode") },
  "Postman": { src: DEVICON("postman") },
  "Composer": { src: DEVICON("composer") },
  "npm": { src: DEVICON("npm", "original-wordmark") },
  "Atom Payment Gateway": { emoji: "💳" },
};

const EXPERIENCE = [
  {
    role: "PHP Developer", company: "COMPUTER Ed.",
    location: "Ranchi, Jharkhand (Remote)", period: "Aug 2024 – Jun 2026",
    icon: "💼", color: "#00d4ff",
    projects: [
      {
        name: "JSPC – Certificate & Registration System",
        url: "cgms.jharkhandstateparamedicalcouncil.com",
        stack: ["Laravel 12", "MySQL", "JavaScript", "jQuery", "AJAX"],
        points: [
          "Independently delivered a secure certificate & admit card management system for Jharkhand's paramedical students.",
          "Implemented 3-tier RBAC (students, admins, verification officers) with SMS OTP authentication.",
          "Engineered race-condition-safe registration number generation using DB::transaction() + lockForUpdate().",
          "Optimised MySQL queries and indexing, achieving 30% reduction in API response times.",
        ],
      },
      {
        name: "Sports  Booking Platform",
        url: "pnp.jharkhandcclsports.in",
        stack: ["Next.js 14", "TypeScript", "Laravel 12", "JWT", "AWS"],
        points: [
          "Architected a full-stack multi-role booking platform: Player → Sub-admin → Super-admin hierarchy.",
          "Built dynamic admin dashboards with Recharts-based analytics for  booking trends.",
          "Implemented JWT authentication and fine-grained RBAC for multi-role workflows.",
          "Engineered accommodation room allotment module with real-time status tracking.",
        ],
      },
      {
        name: "Payment Gateway Integrations", url: null,
        stack: ["Laravel 12", "PHP", "CodeIgniter", "Atom Gateway"],
        points: [
          "Integrated Atom payment gateway across 3 production platforms: school admissions, donations, event registrations.",
          "Built automated donation receipt generation with QR-code verification.",
          "Zero post-launch financial discrepancies across all three platforms.",
        ],
      },
    ],
  },
  {
    role: "Junior Software Developer", company: "IIT (ISM) Dhanbad",
    location: "Dhanbad, Jharkhand", period: "Nov 2021 – Jul 2024",
    icon: "🎓", color: "#7c3aed",
    projects: [
      {
        name: "Campus MIS Modules", url: null,
        stack: ["React.js", "Laravel", "CodeIgniter", "MySQL"],
        points: [
          "Built Scholarship Management Module with end-to-end tracking, eligibility verification, and disbursement reporting.",
          "Developed Training & Placement REST Module exposing structured APIs for placement operations.",
          "Built Student Grade Sheet Management System with automated PDF generation and multi-role access.",
          "Applied MySQL indexing to enhance responsiveness across high-traffic academic workflows.",
        ],
      },
    ],
  },
];

const PROJECTS = [
  { name: "TestCraft-AI — AI-Powered Online Exam & Assessment Platform", desc: "An AI-powered assessment platform that turns uploaded PDFs and images into live timed exams with instant grading, step-by-step AI explanations, and topic-wise analytics.", stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Laravel 13", "PHP 8.4", "SQLite", "Google Gemini API", "GitHub Actions"], logo: "/testcraft-logo.png", icon: "📝", url: "https://t-craft-ai-ten.vercel.app/", accentColor: "#6366f1", badge: "AI-Powered · Completed" },
  { name: "JSPC – Paramedical Registration Portal", desc: "State-level certificate & registration management system for Jharkhand's paramedical students. Features 3-tier RBAC, SMS OTP, race-condition-safe ID generation, and dompdf certificate issuance.", stack: ["Laravel 12", "MySQL", "jQuery", "AJAX", "dompdf"], icon: "🏥", url: "https://cgms.jharkhandstateparamedicalcouncil.com", accentColor: "#00d4ff", badge: null },
  { name: "Sports  Booking Platform", desc: "Full-stack multi-role sports  booking platform. Player → Sub-admin → Super-admin hierarchy with JWT auth, Recharts analytics, accommodation allotment and printable entry cards.", stack: ["Next.js 14", "TypeScript", "Laravel 12", "AWS EC2/S3", "JWT"], icon: "🏟️", url: "https://pnp.jharkhandcclsports.in", accentColor: "#7c3aed", badge: null },
  { name: "AI Image Generator", desc: "AI-powered image generation tool. Enter a text prompt and watch it create stunning images using generative AI in seconds. Live and fully interactive — try it now!", stack: ["OpenAI API", "React.js", "Node.js", "Vercel"], icon: "🎨", url: "https://ai-image-generator-red-one.vercel.app/", accentColor: "#f59e0b", badge: "Live Demo" },
  { name: "SmartDocs – RAG Document Q&A", desc: "RAG-based Document Q&A system using Amazon Bedrock (Titan Embeddings V2 + Text Premier), OpenSearch Serverless, S3, and MySQL. Ask questions on any uploaded document instantly.", stack: ["Laravel 12", "Next.js 14", "Amazon Bedrock", "OpenSearch", "S3"], icon: "🤖", url: null, accentColor: "#10b981", badge: "In Progress" },
  { name: "IIT ISM Campus MIS", desc: "Suite of campus-wide academic modules: Scholarship Management, Training & Placement REST APIs, and Student Grade Sheet System with automated PDF generation and multi-role access pipelines.", stack: ["React.js", "Laravel", "CodeIgniter", "MySQL"], icon: "🎓", url: null, accentColor: "#e879f9", badge: null },
];

const CERTIFICATIONS = [
  { title: "Cloud Computing", issuer: "NPTEL (IIT Kharagpur)", year: "2021", icon: "☁️", desc: "Cloud service models (IaaS, PaaS, SaaS), virtualisation, distributed computing, AWS fundamentals." },
  { title: "AI, ML & Data Science", issuer: "LearnCodeOnline", year: "2019", icon: "🧠", desc: "Supervised/unsupervised learning, data preprocessing, Python for ML, introductory deep learning." },
  { title: "Full Stack Web Development", issuer: "Udemy", year: "2022", icon: "💻", desc: "HTML5, CSS3, JavaScript, React.js, Node.js, REST APIs, MySQL and MongoDB." },
];

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);
  return [ref, inView];
}

function useTilt() {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const c = ref.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    c.style.transform = `perspective(900px) rotateX(${-(y / r.height) * 9}deg) rotateY(${(x / r.width) * 9}deg) translateZ(6px)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

// ─── LOGO (using image.png) ──────────────────────────────────
function VGLogo({ size = 40, accent, secondary }) {
  return (
    <div
      role="img"
      aria-label="Vikash Goswami Logo"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
        background: `linear-gradient(135deg, ${accent}, ${secondary})`,
        WebkitMaskImage: "url(/image.png)",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: "url(/image.png)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
        filter: `drop-shadow(0 0 10px ${accent}66)`,
      }}
    />
  );
}

// ─── DATE/TIME + WEATHER ──────────────────────────────────────────────────────
function DateTimeWeather({ t }) {
  const [now, setNow] = useState(new Date());
  const [wx, setWx] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fn = () => setHidden(window.scrollY > 40);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=23.7957&longitude=86.4304&current=temperature_2m,weathercode,apparent_temperature")
      .then(r => r.json())
      .then(d => {
        const WMO = { 0: "Clear ☀️", 1: "Mainly Clear 🌤️", 2: "Partly Cloudy ⛅", 3: "Overcast ☁️", 45: "Foggy 🌫️", 48: "Foggy 🌫️", 51: "Drizzle 🌦️", 53: "Drizzle 🌦️", 61: "Rain 🌧️", 63: "Rain 🌧️", 65: "Heavy Rain 🌧️", 80: "Showers 🌦️", 95: "Thunderstorm ⛈️" };
        setWx({
          temp: Math.round(d.current?.temperature_2m ?? 30),
          feels: Math.round(d.current?.apparent_temperature ?? 34),
          desc: WMO[d.current?.weathercode] || "Clear ☀️",
        });
      }).catch(() => setWx({ temp: 33, feels: 37, desc: "Clear ☀️" }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch("https://air-quality-api.open-meteo.com/v1/air-quality?latitude=23.7957&longitude=86.4304&current=us_aqi")
      .then(r => r.json())
      .then(d => {
        const v = d.current?.us_aqi;
        if (v != null) {
          const label = v <= 50 ? "Good 🟢" : v <= 100 ? "Moderate 🟡" : v <= 150 ? "Unhealthy 🟠" : "Hazardous 🔴";
          setAqi({ val: v, label });
        }
      }).catch(() => setAqi({ val: 72, label: "Moderate 🟡" }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const hh = h % 12 || 12, mm = String(m).padStart(2, "0"), ss = String(s).padStart(2, "0");
  const ap = h >= 12 ? "PM" : "AM";

  const panel = {
    background: "rgba(0,0,0,0.22)", backdropFilter: "blur(16px)",
    border: `1px solid ${t.border}`, borderRadius: "12px",
    padding: "10px 16px", fontSize: "12px", color: t.textMuted, lineHeight: 1.7,
  };

  return (
    <div style={{
      position: "fixed", top: "72px", left: 0, right: 0, zIndex: 90,
      display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      padding: "0 clamp(10px,3vw,36px)", pointerEvents: "none",
      opacity: hidden ? 0 : 1,
      transform: hidden ? "translateY(-16px)" : "translateY(0)",
      transition: "opacity 0.25s ease, transform 0.25s ease",
    }}>
      {/* Date & Time */}
      <div style={{ ...panel, pointerEvents: hidden ? "none" : "auto" }}>
        <div style={{ fontWeight: 700, color: t.text, fontSize: "13px" }}>
          {DAYS[now.getDay()]}, {now.getDate()} {MONS[now.getMonth()]} {now.getFullYear()}
        </div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "16px", color: t.accent, fontWeight: 700, letterSpacing: "0.04em" }}>
          {hh}:{mm}:{ss} <span style={{ fontSize: "11px", color: t.textMuted }}>{ap}</span>
        </div>
        <div style={{ fontSize: "11px", color: t.textDim }}>📍 Dhanbad, Jharkhand</div>
      </div>

      {/* Weather & AQI */}
      <div style={{ ...panel, pointerEvents: hidden ? "none" : "auto", textAlign: "right" }}>
        {wx ? (
          <>
            <div style={{ fontWeight: 700, color: t.text, fontSize: "15px" }}>🌡️ {wx.temp}°C</div>
            <div style={{ fontSize: "12px", color: t.textMuted }}>{wx.desc}</div>
            <div style={{ fontSize: "11px", color: t.textDim }}>Feels like {wx.feels}°C</div>
          </>
        ) : <div style={{ color: t.textDim }}>Loading…</div>}
        {aqi && (
          <div style={{
            marginTop: "4px", padding: "2px 8px", borderRadius: "8px", display: "inline-block",
            background: t.tagBg, border: `1px solid ${t.border}`,
            fontSize: "11px", color: t.textMuted,
          }}>AQI {aqi.val} · {aqi.label}</div>
        )}
      </div>
    </div>
  );
}

// ─── PARTICLE CANVAS (mouse/touch repel) ─────────────────────────────────────
function ParticleCanvas({ theme }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const pts = useRef([]);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      const N = Math.min(90, Math.floor((W * H) / 13000));
      pts.current = Array.from({ length: N }, () => {
        const x = Math.random() * W, y = Math.random() * H;
        return { x, y, ox: x, oy: y, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4, r: Math.random() * 2 + 1, alpha: Math.random() * .5 + .2 };
      });
    };
    resize();
    window.addEventListener("resize", resize);

    const onPtr = (e) => {
      const src = e.touches ? e.touches[0] : e;
      mouse.current = { x: src.clientX, y: src.clientY };
    };
    window.addEventListener("mousemove", onPtr, { passive: true });
    window.addEventListener("touchmove", onPtr, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = theme === "dark";
      const rgb = isDark ? "0,212,255" : "0,152,200";
      const grid = isDark ? "rgba(0,212,255,0.035)" : "rgba(124,58,237,0.035)";

      ctx.strokeStyle = grid; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 80) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 80) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      const p = pts.current;
      const mx = mouse.current.x, my = mouse.current.y;
      const REPEL = 110, RF = 2.8;

      p.forEach(pt => {
        const dx = pt.x - mx, dy = pt.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL && dist > 0) {
          const f = (REPEL - dist) / REPEL * RF;
          pt.vx += (dx / dist) * f * 0.13; pt.vy += (dy / dist) * f * 0.13;
        }
        pt.vx += (pt.ox - pt.x) * 0.0025; pt.vy += (pt.oy - pt.y) * 0.0025;
        pt.vx *= 0.95; pt.vy *= 0.95;
        pt.x += pt.vx; pt.y += pt.vy;
        if (pt.x < -10) pt.x = W + 10; if (pt.x > W + 10) pt.x = -10;
        if (pt.y < -10) pt.y = H + 10; if (pt.y > H + 10) pt.y = -10;
      });

      p.forEach((a, i) => {
        p.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 135) {
            ctx.beginPath(); ctx.strokeStyle = `rgba(${rgb},${0.2 * (1 - d / 135)})`;
            ctx.lineWidth = 0.6; ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        });
      });

      p.forEach(pt => {
        ctx.beginPath(); ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${pt.alpha})`; ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPtr);
      window.removeEventListener("touchmove", onPtr);
      cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.75 }} />;
}

// ─── SUCCESS MODAL ────────────────────────────────────────────────────────────
function SuccessModal({ t, onClose }) {
  useEffect(() => { const id = setTimeout(onClose, 6000); return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [onClose]);
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.3s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: t.bg === "dark" || t.bg === "#0a0f1e"
          ? "linear-gradient(135deg,#0d1a3a,#0a1628)"
          : "linear-gradient(135deg,#fff,#f0f4ff)",
        border: `1px solid ${t.border}`,
        borderRadius: "28px", padding: "52px 44px", textAlign: "center",
        maxWidth: "440px", width: "90vw",
        boxShadow: `0 0 80px ${t.accentGlow},0 24px 60px rgba(0,0,0,0.4)`,
        animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{
          width: "88px", height: "88px", borderRadius: "50%",
          background: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 28px", fontSize: "40px",
          boxShadow: `0 0 48px ${t.accentGlow}`,
          animation: "float 3s ease-in-out infinite",
        }}>✉️</div>

        <h2 style={{
          fontFamily: "'Space Grotesk',sans-serif", fontSize: "26px",
          fontWeight: 700, color: t.text, margin: "0 0 14px",
        }}>Mail Sent! 🎉</h2>

        <p style={{ color: t.textMuted, fontSize: "15px", lineHeight: 1.75, margin: "0 0 8px" }}>
          Your message has been sent to{" "}
          <strong style={{ color: t.accent }}>vgoswami492@gmail.com</strong>
        </p>
        <p style={{ color: t.textMuted, fontSize: "14px", lineHeight: 1.75, margin: "0 0 30px" }}>
          Vikash will get back to you shortly. Thanks for reaching out! 🚀
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "28px" }}>
          {["#00d4ff", "#7c3aed", "#10b981", "#f59e0b", "#e879f9"].map((c, i) => (
            <div key={c} style={{
              width: "10px", height: "10px", borderRadius: "50%", background: c,
              animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>

        <button onClick={onClose} style={{
          padding: "13px 36px", borderRadius: "14px", fontSize: "15px", fontWeight: 700,
          background: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`,
          border: "none", color: "#fff", cursor: "pointer", fontFamily: "inherit",
          boxShadow: `0 4px 20px ${t.accentGlow}`,
        }}>Close</button>
      </div>
    </div>
  );
}

function Toast({ message, type = "error", onClose }) {
  useEffect(() => { const id = setTimeout(onClose, 4500); return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [onClose]);
  return (
    <div style={{
      position: "fixed", bottom: "32px", left: "50%", transform: "translateX(-50%)",
      zIndex: 8888, minWidth: "300px", maxWidth: "90vw",
      background: type === "error" ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#10b981,#059669)",
      borderRadius: "14px", padding: "16px 22px",
      display: "flex", alignItems: "center", gap: "12px",
      boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      animation: "toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",
    }}>
      <span style={{ fontSize: "20px" }}>{type === "error" ? "⚠️" : "✅"}</span>
      <span style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{message}</span>
      <button onClick={onClose} style={{
        marginLeft: "auto", background: "rgba(255,255,255,0.2)", border: "none",
        borderRadius: "6px", color: "#fff", cursor: "pointer", padding: "3px 8px", fontSize: "13px",
      }}>✕</button>
    </div>
  );
}

// ─── SECTION (FULL-PAGE STICKY SCROLL-STACK) ──────────────────────────────────
const SECTION_Z = {
  hero: 1,
  about: 2,
  skills: 3,
  experience: 4,
  projects: 5,
  certifications: 6,
  contact: 7,
};

function useStickyStack(ref) {
  const [state, setState] = useState({ top: 0, cover: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const calc = () => {
      const vh = window.innerHeight || 1;
      const h = el.offsetHeight;
      const top = h > vh ? vh - h : 0;
      const nextEl = el.nextElementSibling;
      let cover = 0;
      if (nextEl) {
        const nextRect = nextEl.getBoundingClientRect();
        cover = Math.min(1, Math.max(0, 1 - nextRect.top / vh));
      }
      setState((prev) =>
        prev.top === top && Math.abs(prev.cover - cover) < 0.005 ? prev : { top, cover }
      );
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return state;
}

function Section({ id, children, t, style = {} }) {
  const ref = useRef(null);
  const { top, cover } = useStickyStack(ref);
  const zIndex = SECTION_Z[id] || 2;
  const isEven = zIndex % 2 === 0;
  return (
    <section id={id} ref={ref} style={{
      position: "sticky",
      top: `${top}px`,
      zIndex,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "96px 0",
      background: isEven ? t.bgSecondary : t.bg,
      borderTop: `1px solid ${t.border}`,
      scrollMarginTop: "64px",
      transform: `scale(${1 - cover * 0.055})`,
      transformOrigin: "center top",
      filter: `brightness(${1 - cover * 0.28})`,
      transition: "transform 0.08s linear, filter 0.08s linear",
      ...style,
    }}>{children}</section>
  );
}

function SectionTitle({ label, title, t }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "64px" }}>
      <span style={{
        display: "inline-block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.2em",
        textTransform: "uppercase", color: t.accent, padding: "6px 16px",
        background: t.tagBg, border: `1px solid ${t.border}`, borderRadius: "20px", marginBottom: "16px",
      }}>{label}</span>
      <h2 style={{
        fontSize: "clamp(28px,4vw,44px)", fontWeight: 700,
        fontFamily: "'Space Grotesk',sans-serif", color: t.text, margin: 0, lineHeight: 1.2,
      }}>{title}</h2>
      <div style={{
        width: "60px", height: "3px", margin: "20px auto 0",
        background: `linear-gradient(90deg,${t.accent},${t.accentSecondary})`, borderRadius: "2px",
      }} />
    </div>
  );
}

function Card({ children, t, style = {}, noTilt = false }) {
  const tilt = useTilt();
  return (
    <div
      ref={noTilt ? null : tilt.ref}
      onMouseMove={noTilt ? undefined : tilt.onMouseMove}
      onMouseLeave={(e) => { if (!noTilt) tilt.onMouseLeave(e); e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = "none"; }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.borderHover; e.currentTarget.style.boxShadow = `0 0 30px ${t.accentGlow}`; }}
      style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "16px", backdropFilter: "blur(14px)", transition: "transform 0.15s ease,border-color 0.3s,box-shadow 0.3s", ...style }}
    >{children}</div>
  );
}

function CodeTag({ text, style, t }) {
  return <span style={{ position: "absolute", fontFamily: "'Space Mono',monospace", fontSize: "11px", color: t.accent, opacity: 0.28, userSelect: "none", pointerEvents: "none", letterSpacing: "0.05em", ...style }}>{text}</span>;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id.toLowerCase());
  if (!el || !el.parentElement) return;
  let top = 0;
  for (const child of el.parentElement.children) {
    if (child === el) break;
    top += child.offsetHeight;
  }
  window.scrollTo({ top, behavior: "smooth" });
}

function Nav({ t, themeKey, setThemeKey, activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const scrollTo = (id) => { scrollToSection(id); setMobileOpen(false); };

  // KEY FIX: use plain color + backgroundImage separately so switching theme resets WebkitTextFillColor
  const brandStyle = {
    fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "16px",
    letterSpacing: "0.08em", textTransform: "uppercase",
    // Solid fallback always set
    color: t.accent,
    // Gradient clip
    backgroundImage: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.border}` : "1px solid transparent",
        transition: "all 0.4s ease", padding: "0 clamp(16px,4vw,48px)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <VGLogo size={36} accent={t.accent} secondary={t.accentSecondary} />
            <span style={brandStyle}>Vikash Goswami</span>
          </div>

          <div style={{ display: "flex", gap: "4px", alignItems: "center" }} className="nav-links">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} style={{
                background: activeSection === link.toLowerCase() ? t.tagBg : "none",
                border: activeSection === link.toLowerCase() ? `1px solid ${t.border}` : "1px solid transparent",
                cursor: "pointer", padding: "7px 14px", borderRadius: "8px", fontSize: "14px", fontWeight: 500,
                color: activeSection === link.toLowerCase() ? t.accent : t.textMuted,
                transition: "all 0.2s", fontFamily: "inherit",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.color = t.accent; e.currentTarget.style.background = t.tagBg; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = activeSection === link.toLowerCase() ? t.accent : t.textMuted; e.currentTarget.style.background = activeSection === link.toLowerCase() ? t.tagBg : "none"; }}
              >{link}</button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button onClick={() => setThemeKey(k => k === "dark" ? "light" : "dark")} title="Toggle theme"
              style={{ background: t.tagBg, border: `1px solid ${t.border}`, borderRadius: "50px", width: "58px", height: "30px", cursor: "pointer", position: "relative", transition: "all 0.3s", flexShrink: 0 }}>
              <span style={{
                position: "absolute", top: "5px",
                left: themeKey === "dark" ? "5px" : "29px",
                width: "20px", height: "20px", borderRadius: "50%",
                background: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`,
                transition: "left 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px",
              }}>{themeKey === "dark" ? "🌙" : "☀️"}</span>
            </button>
            <button onClick={() => setMobileOpen(o => !o)} className="hamburger"
              style={{ background: "none", border: "none", cursor: "pointer", color: t.text, fontSize: "22px", display: "none", flexShrink: 0 }}>
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div style={{ position: "fixed", top: "64px", left: 0, right: 0, zIndex: 99, background: t.navBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`, padding: "16px 24px 24px" }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "14px 0", fontSize: "16px", color: t.text, fontFamily: "inherit", borderBottom: `1px solid ${t.border}` }}>{link}</button>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ t }) {
  const [typed, setTyped] = useState("");
  const heroRef = useRef(null);
  const { top: heroStickyTop, cover: heroCover } = useStickyStack(heroRef);
  const roles = ["Full Stack Developer", "Laravel Expert", "Next.js Engineer", "AWS Builder", "AI Explorer"];
  const rIdx = useRef(0), cIdx = useRef(0), del = useRef(false), tmr = useRef(null);
  useEffect(() => {
    const tick = () => {
      const cur = roles[rIdx.current];
      if (!del.current) { setTyped(cur.slice(0, cIdx.current + 1)); cIdx.current++; if (cIdx.current === cur.length) { del.current = true; tmr.current = setTimeout(tick, 1900); return; } }
      else { setTyped(cur.slice(0, cIdx.current - 1)); cIdx.current--; if (cIdx.current === 0) { del.current = false; rIdx.current = (rIdx.current + 1) % roles.length; } }
      tmr.current = setTimeout(tick, del.current ? 38 : 72);
    };
    tmr.current = setTimeout(tick, 500);
    return () => clearTimeout(tmr.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // KEY FIX for gradient text — will recompute on every render when t changes
  const gradText = (fontSize, extra = {}) => ({
    fontSize, fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif",
    color: t.accent,  // solid fallback — browsers that don't clip show this
    backgroundImage: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`,
    WebkitBackgroundClip: "text", backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    ...extra,
  });

  return (
    <section id="hero" ref={heroRef} style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "sticky", top: `${heroStickyTop}px`, zIndex: 1, padding: "80px clamp(16px,4vw,48px) 60px",
      background: t.gradHero, overflow: "hidden",
      transform: `scale(${1 - heroCover * 0.055})`,
      transformOrigin: "center top",
      filter: `brightness(${1 - heroCover * 0.28})`,
      transition: "transform 0.08s linear, filter 0.08s linear",
    }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle,${t.accent}10 0%,transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-15%", left: "-8%", width: "600px", height: "600px", borderRadius: "50%", background: `radial-gradient(circle,${t.accentSecondary}08 0%,transparent 70%)`, pointerEvents: "none" }} />
      <CodeTag text="<html lang='en'>" style={{ top: "12%", left: "2%" }} t={t} />
      <CodeTag text="const dev = new VikashGoswami();" style={{ top: "28%", right: "2%" }} t={t} />
      <CodeTag text="// 4.5+ years crafting production systems" style={{ bottom: "28%", left: "2%" }} t={t} />
      <CodeTag text="</body>" style={{ bottom: "12%", right: "2%" }} t={t} />

      <div style={{ maxWidth: "900px", textAlign: "center", position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div style={{ padding: "14px", borderRadius: "24px", background: t.tagBg, border: `1px solid ${t.border}`, animation: "float 5s ease-in-out infinite", display: "inline-flex" }}>
            <VGLogo size={72} accent={t.accent} secondary={t.accentSecondary} />
          </div>
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: t.tagBg, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "6px 16px", marginBottom: "28px", fontSize: "13px", color: t.textMuted }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px #10b981", animation: "pulse 2s infinite" }} />
          Available for immediate joining · No notice period
        </div>

        <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontSize: "clamp(34px,6.2vw,72px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px", color: t.text, lineHeight: 1.15 }}>
          Vikash{" "}
          {/* KEY FIX: wrapping span with key forces re-mount on theme switch → clears stale gradient state */}
          <span key={t.accent} style={gradText("inherit", { fontFamily: "'Montserrat',sans-serif", fontWeight: 700 })}>Goswami</span>
        </h1>

        <div style={{ height: "52px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(18px,3vw,28px)", fontWeight: 500, color: t.textMuted, fontFamily: "'Space Grotesk',sans-serif", marginBottom: "24px" }}>
          <span style={{ color: t.accent, marginRight: "4px" }}>&gt; </span>
          <span style={{ color: t.text }}>{typed}</span>
          <span style={{ display: "inline-block", width: "2px", height: "1.1em", background: t.accent, marginLeft: "3px", animation: "blink 1s step-end infinite", verticalAlign: "middle" }} />
        </div>

        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: t.textMuted, maxWidth: "680px", margin: "0 auto 40px", lineHeight: 1.85 }}>
          4.5+ years building scalable, production-grade systems for government, institutional, and AI-powered platforms.
          Independently architected & shipped three live state-level platforms and full-stack AI applications.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          {[{ label: "View Projects", primary: true, id: "projects" }, { label: "Contact Me", primary: false, id: "contact" }, { label: "Download Resume", primary: false, href: "/Vikash_Goswami_Resume.pdf", download: "Vikash_Goswami_Resume.pdf" }].map(({ label, primary, id, href, download }) => {
            const commonProps = {
              key: label,
              style: {
                padding: "14px 32px", borderRadius: "12px", fontSize: "15px", fontWeight: 600,
                background: primary ? `linear-gradient(135deg,${t.accent},${t.accentSecondary})` : "transparent",
                border: primary ? "none" : `1.5px solid ${t.border}`, color: primary ? "#fff" : t.text,
                cursor: "pointer", fontFamily: "inherit", boxShadow: primary ? `0 4px 20px ${t.accentGlow}` : "none", transition: "all 0.25s",
                textDecoration: "none", display: "inline-block"
              },
              onMouseEnter: (e) => { e.currentTarget.style.transform = "translateY(-3px)"; if (primary) e.currentTarget.style.boxShadow = `0 10px 32px ${t.accentGlow}`; else { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; } },
              onMouseLeave: (e) => { e.currentTarget.style.transform = "translateY(0)"; if (primary) e.currentTarget.style.boxShadow = `0 4px 20px ${t.accentGlow}`; else { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; } }
            };
            if (href) {
              return <a {...commonProps} href={href} download={download}>{label}</a>;
            }
            return <button {...commonProps} onClick={() => scrollToSection(id)}>{label}</button>;
          })}
        </div>

        <div style={{ display: "flex", gap: "clamp(20px,4vw,48px)", justifyContent: "center", marginTop: "60px", flexWrap: "wrap" }}>
          {[{ value: "4.5+", label: "Years Exp." }, { value: "3", label: "Live Gov. Systems" }, { value: "10k+", label: "Users Served" }, { value: "30%", label: "API Perf. Gain" }].map(({ value, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              {/* KEY FIX: key on span resets gradient on theme switch */}
              <div key={t.accent} style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", color: t.accent, backgroundImage: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>{value}</div>
              <div style={{ fontSize: "12px", color: t.textMuted, marginTop: "4px", letterSpacing: "0.05em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About({ t }) {
  const [ref, inView] = useInView();
  return (
    <Section id="about" t={t} style={{ background: `linear-gradient(180deg,${t.bg},${t.bgSecondary})` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        <SectionTitle label="// who_am_i.js" title="About Me" t={t} />
        <div ref={ref} className="about-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center",
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(32px)",
          transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
        }}>
          <div>
            <p style={{ fontSize: "clamp(15px,1.8vw,17px)", color: t.textMuted, lineHeight: 1.9, marginBottom: "24px" }}>
              I'm a Full Stack Developer from <strong style={{ color: t.text }}>Dhanbad, Jharkhand</strong>, with 4.5+ years building scalable, production-grade systems for government & institutional clients across India.
            </p>
            <p style={{ fontSize: "clamp(15px,1.8vw,17px)", color: t.textMuted, lineHeight: 1.9, marginBottom: "32px" }}>
              I independently architected two flagship state-level platforms — a <strong style={{ color: t.accent }}>paramedical registration system</strong> and a <strong style={{ color: t.accentSecondary }}>sports  booking platform</strong> — from scratch to production deployment.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "28px" }}>
              {[{ icon: "📍", text: "Dhanbad, Jharkhand, India" }, { icon: "💼", text: "Open to Remote Roles" }, { icon: "⚡", text: "Immediate Joiner" }, { icon: "🌐", text: "English & Hindi" }].map(({ icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", background: t.tagBg, border: `1px solid ${t.border}`, borderRadius: "8px", padding: "8px 14px", fontSize: "13px", color: t.textMuted }}><span>{icon}</span>{text}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {[{ label: "LinkedIn", href: "https://linkedin.com/in/vikash-goswami", primary: true }, { label: "GitHub", href: "https://github.com/VikashGoswami", primary: false }, { label: "Download Resume", href: "/Vikash_Goswami_Resume.pdf", primary: false, download: "Vikash_Goswami_Resume.pdf" }].map(({ label, href, primary, download }) => (
                <a key={label} href={href} target={download ? undefined : "_blank"} rel={download ? undefined : "noreferrer"} download={download} style={{
                  padding: "10px 22px", borderRadius: "10px", fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "transform 0.2s",
                  background: primary ? `linear-gradient(135deg,${t.accent},${t.accentSecondary})` : "transparent",
                  border: primary ? "none" : `1.5px solid ${t.border}`, color: primary ? "#fff" : t.text,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; if (!primary) { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; } }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; if (!primary) { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; } }}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Terminal — all colours hardcoded hex, NO WebkitTextFillColor inside */}
          <Card t={t} noTilt style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ background: t.bgSecondary, padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${t.border}` }}>
              {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: "12px", height: "12px", borderRadius: "50%", background: c }} />)}
              <span style={{ marginLeft: "8px", fontSize: "12px", color: t.textDim, fontFamily: "monospace" }}>vikash@portfolio ~ %</span>
            </div>
            <div style={{ padding: "20px 24px", fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: 2.1 }}>
              {[
                { k: "name", v: '"Vikash Goswami"', col: "#00d4ff" },
                { k: "role", v: '"Full Stack Developer"', col: "#10b981" },
                { k: "experience", v: '"4.5+ years"', col: "#f59e0b" },
                { k: "stack", v: '["Laravel","Next.js","AWS"]', col: "#a78bfa" },
                { k: "available", v: "true", col: "#10b981" },
                { k: "location", v: '"Dhanbad, India"', col: "#94a3b8" },
                { k: "email", v: '"vgoswami492@gmail.com"', col: "#00d4ff" },
              ].map(({ k, v, col }) => (
                <div key={k}>
                  <span style={{ color: "#4a5568" }}>const </span>
                  <span style={{ color: t.accent }}>{k}</span>
                  <span style={{ color: t.textMuted }}> = </span>
                  <span style={{ color: col }}>{v}</span>
                  <span style={{ color: "#4a5568" }}>;</span>
                </div>
              ))}
              <div style={{ marginTop: "8px" }}>
                <span style={{ color: "#4a5568" }}>{"// "}</span>
                <span style={{ color: "#10b981" }}>Actively looking 🚀</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function SkillCategory({ cat, skills, idx, active, setActive, t }) {
  const [ref, inView] = useInView(0.1);
  const isActive = active === cat;
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)", transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${idx * 0.07}s` }}>
      <div onClick={() => setActive(isActive ? null : cat)} style={{
        background: isActive ? `linear-gradient(135deg,${t.accent}14,${t.accentSecondary}08)` : t.bgCard,
        border: `1px solid ${isActive ? t.accent : t.border}`,
        borderRadius: "16px", backdropFilter: "blur(14px)", padding: "24px", cursor: "pointer",
        transition: "all 0.3s", boxShadow: isActive ? `0 0 28px ${t.accentGlow}` : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <span style={{ fontSize: "22px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: t.tagBg, borderRadius: "10px", border: `1px solid ${t.border}` }}>{SKILL_ICONS[cat]}</span>
          <div>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: isActive ? t.accent : t.textMuted }}>{cat}</div>
            <div style={{ fontSize: "11px", color: t.textDim }}>{skills.length} technologies</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
          {skills.map(s => {
            const logo = SKILL_LOGOS[s];
            const isDark = t.bg === THEMES.dark.bg;
            return (
              <span key={s} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 11px", borderRadius: "6px", fontSize: "12px", background: t.tagBg, border: `1px solid ${t.border}`, color: t.text, transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.color = t.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.text; }}
              >
                {logo?.src ? (
                  <img
                    src={logo.src}
                    alt={s}
                    width={15}
                    height={15}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                    style={{ width: "15px", height: "15px", objectFit: "contain", flexShrink: 0, filter: logo.darkInvert && isDark ? "invert(1) brightness(1.1)" : "none" }}
                  />
                ) : logo?.emoji ? (
                  <span style={{ fontSize: "13px", lineHeight: 1 }}>{logo.emoji}</span>
                ) : null}
                {s}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Skills({ t }) {
  const [active, setActive] = useState(null);
  return (
    <Section id="skills" t={t}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        <div style={{ textAlign: "center", marginBottom: "-20px", position: "relative", zIndex: 2 }}>
          <VGLogo size={80} accent={t.accent} secondary={t.accentSecondary} />
        </div>
        <SectionTitle label="// tech_stack.json" title="Technical Skills" t={t} />
        <CodeTag text="{ skills: 'crafted with precision' }" style={{ top: "-20px", right: "4%" }} t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "20px" }}>
          {Object.entries(SKILLS).map(([cat, skills], idx) => (
            <SkillCategory key={cat} cat={cat} skills={skills} idx={idx} active={active} setActive={setActive} t={t} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function ExperienceItem({ exp, eIdx, t, expanded, setExpanded }) {
  const [ref, inView] = useInView(0.05);
  return (
    <div ref={ref} style={{ paddingLeft: "clamp(48px,6vw,72px)", marginBottom: "48px", opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-32px)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${eIdx * 0.15}s`, position: "relative" }}>
      <div style={{ position: "absolute", left: "clamp(8px,1.5vw,18px)", top: "20px", width: "20px", height: "20px", borderRadius: "50%", background: `linear-gradient(135deg,${exp.color},${t.accentSecondary})`, boxShadow: `0 0 12px ${exp.color}88`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", zIndex: 2 }}>{exp.icon}</div>
      <div style={{ marginBottom: "20px" }}>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(18px,2.5vw,22px)", fontWeight: 700, color: t.text, margin: "0 0 4px" }}>{exp.role}</h3>
        <div style={{ fontSize: "15px", color: exp.color, fontWeight: 600 }}>{exp.company}</div>
        <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "4px" }}>{exp.location} · {exp.period}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {exp.projects.map((proj, pIdx) => {
          const key = `${eIdx}-${pIdx}`;
          return (
            <Card key={proj.name} t={t} noTilt style={{ padding: "20px" }}>
              <div onClick={() => setExpanded(e => ({ ...e, [key]: !e[key] }))} style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                <div>
                  <div style={{ fontWeight: 600, color: t.text, fontSize: "15px", marginBottom: "8px" }}>{proj.name}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {proj.stack.map(s => <span key={s} style={{ padding: "3px 10px", borderRadius: "4px", fontSize: "11px", background: t.tagBg, border: `1px solid ${t.border}`, color: t.accent, fontFamily: "monospace" }}>{s}</span>)}
                  </div>
                </div>
                <span style={{ color: t.accent, fontSize: "18px", flexShrink: 0, transform: expanded[key] ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s", display: "block" }}>▾</span>
              </div>
              {expanded[key] && (
                <ul style={{ margin: "16px 0 0", paddingLeft: "16px", borderTop: `1px solid ${t.border}`, paddingTop: "16px" }}>
                  {proj.points.map((pt, i) => <li key={i} style={{ color: t.textMuted, fontSize: "14px", lineHeight: 1.8, marginBottom: "8px" }}>{pt}</li>)}
                  {proj.url && <li style={{ listStyle: "none", marginTop: "8px" }}><a href={`https://${proj.url}`} target="_blank" rel="noreferrer" style={{ color: t.accent, fontSize: "13px" }}>🔗 {proj.url}</a></li>}
                </ul>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Experience({ t }) {
  const [expanded, setExpanded] = useState({});
  return (
    <Section id="experience" t={t} style={{ background: `linear-gradient(180deg,${t.bgSecondary},${t.bg})` }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        <SectionTitle label="// career_path.ts" title="Experience" t={t} />
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "clamp(16px,3vw,28px)", top: 0, bottom: 0, width: "2px", background: `linear-gradient(180deg,${t.accent},${t.accentSecondary},transparent)`, opacity: 0.4 }} />
          {EXPERIENCE.map((exp, eIdx) => (
            <ExperienceItem key={exp.company} exp={exp} eIdx={eIdx} t={t} expanded={expanded} setExpanded={setExpanded} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECTS (3x3 VERTICAL CARD GRID) ───────────────────────────────────────
function ProjectItem({ proj, idx, t }) {
  const [ref, inView] = useInView(0.1);
  const tilt = useTilt();
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${idx * 0.08}s`, height: "100%" }}>
      <div ref={tilt.ref} onMouseMove={tilt.onMouseMove}
        style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: "20px", overflow: "hidden", backdropFilter: "blur(14px)", transition: "transform 0.15s ease,border-color 0.3s,box-shadow 0.3s", display: "flex", flexDirection: "column", height: "100%" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = proj.accentColor; e.currentTarget.style.boxShadow = `0 0 32px ${proj.accentColor}30`; }}
        onMouseLeave={(e) => { tilt.onMouseLeave(e); e.currentTarget.style.borderColor = t.border; e.currentTarget.style.boxShadow = "none"; }}
      >
        <div style={{ padding: "28px 24px 20px", background: `linear-gradient(135deg,${proj.accentColor}18,transparent)`, borderBottom: `1px solid ${t.border}`, position: "relative" }}>
          {proj.logo ? (
            <img src={proj.logo} alt={proj.name} style={{ height: "40px", width: "auto", maxWidth: "65%", objectFit: "contain", display: "block", marginBottom: "12px", borderRadius: "6px", background: "#fff", padding: "3px 8px" }} />
          ) : (
            <div style={{ fontSize: "40px", marginBottom: "12px", lineHeight: 1 }}>{proj.icon}</div>
          )}
          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "16px", fontWeight: 700, color: t.text, margin: 0 }}>{proj.name}</h3>
          {proj.badge && <span style={{ position: "absolute", top: "14px", right: "14px", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", background: `${proj.accentColor}22`, border: `1px solid ${proj.accentColor}55`, color: proj.accentColor, fontWeight: 700 }}>{proj.badge}</span>}
        </div>
        <div style={{ padding: "20px 24px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
          <p style={{ fontSize: "14px", color: t.textMuted, lineHeight: 1.75, marginBottom: "16px", flex: 1 }}>{proj.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
            {proj.stack.map(s => <span key={s} style={{ padding: "4px 10px", borderRadius: "4px", fontSize: "11px", background: t.tagBg, border: `1px solid ${t.border}`, color: t.textMuted, fontFamily: "monospace" }}>{s}</span>)}
          </div>
          {proj.url ? (
            <a href={proj.url} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, background: `linear-gradient(135deg,${proj.accentColor},${proj.accentColor}bb)`, color: "#fff", textDecoration: "none", width: "fit-content", transition: "gap 0.2s,transform 0.2s", boxShadow: `0 4px 14px ${proj.accentColor}40` }}
              onMouseEnter={(e) => { e.currentTarget.style.gap = "10px"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.gap = "6px"; e.currentTarget.style.transform = "translateY(0)"; }}
            >{proj.badge === "Live Demo" ? "🎨 Try it Live" : "View Live"} →</a>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: t.tagBg, border: `1px solid ${t.border}`, color: t.textDim, width: "fit-content" }}>{proj.badge?.includes("Completed") ? "✅ Completed" : "🔒 Private / In Progress"}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function Projects({ t }) {
  return (
    <Section id="projects" t={t}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        <SectionTitle label="// projects.config.js" title="Featured Projects" t={t} />
        <CodeTag text="export const projects = [" style={{ top: "-20px", right: "4%" }} t={t} />
        <div className="projects-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }}>
          {PROJECTS.map((proj, idx) => (
            <ProjectItem key={proj.name} proj={proj} idx={idx} t={t} />
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
function CertificationItem({ cert, idx, t }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0) rotateX(0)" : "translateY(32px) rotateX(15deg)", transition: `all 0.7s cubic-bezier(0.22,1,0.36,1) ${idx * 0.15}s` }}>
      <Card t={t} style={{ padding: "28px", textAlign: "center" }}>
        <div style={{ width: "68px", height: "68px", borderRadius: "50%", margin: "0 auto 16px", background: `linear-gradient(135deg,${t.accent}22,${t.accentSecondary}22)`, border: `2px solid ${t.accent}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>{cert.icon}</div>
        <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "17px", fontWeight: 700, color: t.text, margin: "0 0 6px" }}>{cert.title}</h3>
        <div style={{ color: t.accent, fontSize: "13px", fontWeight: 600, marginBottom: "4px" }}>{cert.issuer}</div>
        <div style={{ display: "inline-block", padding: "3px 12px", borderRadius: "12px", background: t.tagBg, border: `1px solid ${t.border}`, fontSize: "12px", color: t.textMuted, marginBottom: "14px" }}>{cert.year}</div>
        <p style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.7, margin: "0 0 12px" }}>{cert.desc}</p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "12px", color: "#10b981" }}>✓ Verified</div>
      </Card>
    </div>
  );
}

function Certifications({ t }) {
  return (
    <Section id="certifications" t={t} style={{ background: `linear-gradient(180deg,${t.bg},${t.bgSecondary})` }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        <SectionTitle label="// credentials.verify()" title="Certifications & Education" t={t} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "24px", marginBottom: "40px" }}>
          {CERTIFICATIONS.map((cert, idx) => (
            <CertificationItem key={cert.title} cert={cert} idx={idx} t={t} />
          ))}
        </div>
        <Card t={t} noTilt style={{ padding: "28px", display: "flex", gap: "24px", alignItems: "center", flexWrap: "wrap", background: `linear-gradient(135deg,${t.accent}08,${t.accentSecondary}08)` }}>
          <div style={{ width: "64px", height: "64px", borderRadius: "50%", flexShrink: 0, background: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>🎓</div>
          <div>
            <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "18px", fontWeight: 700, color: t.text, margin: "0 0 4px" }}>Master of Science (M.Sc.) in Computer Science</h3>
            <div style={{ color: t.accent, fontWeight: 600, marginBottom: "4px" }}>ECMT, West Bengal</div>
            <div style={{ fontSize: "13px", color: t.textMuted }}>Dhanbad, Jharkhand · Graduated 2021</div>
          </div>
        </Card>
      </div>
    </Section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);
  const MAX = 500;

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) e.email = "Please enter a valid email address.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    if (form.message.length > MAX) e.message = `Message cannot exceed ${MAX} characters.`;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/xnnqkpjv", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(), message: form.message.trim(),
          _replyto: form.email.trim(), _subject: `Portfolio Contact from ${form.name.trim()}`,
        }),
      }).catch(() => null);

      setLoading(false);
      if (res && res.ok) {
        setForm({ name: "", email: "", message: "" }); setErrors({}); setShowModal(true);
      } else {
        // Fallback: open mail client
        const sub = encodeURIComponent(`Portfolio Contact from ${form.name.trim()}`);
        const body = encodeURIComponent(`Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`);
        window.open(`mailto:vgoswami492@gmail.com?subject=${sub}&body=${body}`, "_blank");
        setForm({ name: "", email: "", message: "" }); setErrors({}); setShowModal(true);
      }
    } catch {
      setLoading(false);
      setToast({ msg: "Something went wrong. Please try again.", type: "error" });
    }
  };

  const fld = (hasErr) => ({
    width: "100%", padding: "11px 14px", borderRadius: "10px",
    background: t.inputBg, border: `1px solid ${hasErr ? "#ef4444" : t.border}`,
    color: t.text, fontSize: "14px", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s",
  });

  return (
    <Section id="contact" t={t} style={{ background: `linear-gradient(180deg,${t.bgSecondary},${t.bg})` }}>
      <div style={{ maxWidth: "920px", margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>
        <SectionTitle label="// send_message.post()" title="Get In Touch" t={t} />
        <CodeTag text="POST /api/contact HTTP/1.1" style={{ top: "-20px", right: "4%" }} t={t} />

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div>
            <p style={{ fontSize: "16px", color: t.textMuted, lineHeight: 1.8, marginBottom: "32px" }}>
              I'm actively looking for new opportunities. Whether you have a project in mind, a role to discuss, or just want to say hi — my inbox is always open.
            </p>
            {[
              { icon: "📧", label: "Email", value: "vgoswami492@gmail.com", href: "mailto:vgoswami492@gmail.com" },
              { icon: "📱", label: "Phone", value: "+91 79790 40859", href: "tel:+917979040859" },
              { icon: "📍", label: "Location", value: "Dhanbad, Jharkhand, India", href: null },
              { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/vikash-goswami", href: "https://linkedin.com/in/vikash-goswami" },
              { icon: "🐙", label: "GitHub", value: "github.com/VikashGoswami", href: "https://github.com/VikashGoswami" },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 0", borderBottom: `1px solid ${t.border}` }}>
                <span style={{ width: "40px", height: "40px", borderRadius: "10px", background: t.tagBg, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontSize: "11px", color: t.textDim, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</div>
                  {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ color: t.accent, fontSize: "14px", textDecoration: "none" }}
                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
                  >{value}</a> : <span style={{ color: t.text, fontSize: "14px" }}>{value}</span>}
                </div>
              </div>
            ))}
          </div>

          <Card t={t} noTilt style={{ padding: "28px" }}>
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", color: t.textMuted, marginBottom: "6px", letterSpacing: "0.05em" }}>Full Name <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="text" placeholder="John Doe" value={form.name}
                  onChange={e => { setForm(f => ({ ...f, name: e.target.value })); if (errors.name) setErrors(er => ({ ...er, name: "" })); }}
                  style={fld(errors.name)}
                  onFocus={(e) => e.currentTarget.style.borderColor = errors.name ? "#ef4444" : t.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors.name ? "#ef4444" : t.border}
                />
                {errors.name && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>⚠ {errors.name}</div>}
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "12px", color: t.textMuted, marginBottom: "6px", letterSpacing: "0.05em" }}>Email Address <span style={{ color: "#ef4444" }}>*</span></label>
                <input type="email" placeholder="john@company.com" value={form.email}
                  onChange={e => { setForm(f => ({ ...f, email: e.target.value })); if (errors.email) setErrors(er => ({ ...er, email: "" })); }}
                  style={fld(errors.email)}
                  onFocus={(e) => e.currentTarget.style.borderColor = errors.email ? "#ef4444" : t.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors.email ? "#ef4444" : t.border}
                />
                {errors.email && <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>⚠ {errors.email}</div>}
              </div>

              <div style={{ marginBottom: "22px" }}>
                <label style={{ display: "block", fontSize: "12px", color: t.textMuted, marginBottom: "6px", letterSpacing: "0.05em" }}>Message <span style={{ color: "#ef4444" }}>*</span></label>
                <textarea rows={5} placeholder="Tell me about the opportunity or project…"
                  value={form.message}
                  onChange={e => { if (e.target.value.length <= MAX) { setForm(f => ({ ...f, message: e.target.value })); if (errors.message) setErrors(er => ({ ...er, message: "" })); } }}
                  style={{ ...fld(errors.message), resize: "vertical", minHeight: "120px" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = errors.message ? "#ef4444" : t.accent}
                  onBlur={(e) => e.currentTarget.style.borderColor = errors.message ? "#ef4444" : t.border}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  {errors.message ? <div style={{ color: "#ef4444", fontSize: "12px" }}>⚠ {errors.message}</div> : <div />}
                  <div style={{ fontSize: "12px", color: form.message.length > MAX * 0.85 ? "#f59e0b" : t.textDim }}>{form.message.length}/{MAX}</div>
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                width: "100%", padding: "13px", borderRadius: "12px",
                background: loading ? t.tagBg : `linear-gradient(135deg,${t.accent},${t.accentSecondary})`,
                border: "none", color: loading ? t.textMuted : "#fff",
                fontSize: "15px", fontWeight: 700, cursor: loading ? "wait" : "pointer",
                fontFamily: "inherit", boxShadow: loading ? "none" : `0 4px 18px ${t.accentGlow}`,
                transition: "all 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${t.accentGlow}`; } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
              >{loading ? <><span style={{ animation: "spin 0.8s linear infinite", display: "inline-block" }}>⟳</span>Sending…</> : "Send Message →"}</button>
            </form>
          </Card>
        </div>
      </div>

      {showModal && <SuccessModal t={t} onClose={() => setShowModal(false)} />}
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ t }) {
  return (
    <footer style={{ position: "relative", zIndex: 8, background: t.bg, padding: "40px 24px", borderTop: `1px solid ${t.border}` }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <VGLogo size={24} accent={t.accent} secondary={t.accentSecondary} />
          {/* KEY FIX: solid color only in footer, no clip */}
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: "15px", letterSpacing: "0.08em", textTransform: "uppercase", color: t.accent }}>Vikash Goswami</span>
        </div>
        <div style={{ color: t.textDim, fontSize: "13px" }}>
          Crafted with ❤️ using React · © {new Date().getFullYear()} Vikash Goswami · All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function ScrollProgress({ t }) {
  const [pct, setPct] = useState(0);
  useEffect(() => { const fn = () => { const h = document.documentElement.scrollHeight - window.innerHeight; setPct(h > 0 ? (window.scrollY / h) * 100 : 0); }; window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: "3px", width: `${pct}%`, zIndex: 200, background: `linear-gradient(90deg,${t.accent},${t.accentSecondary})`, transition: "width 0.08s linear", boxShadow: `0 0 10px ${t.accent}88` }} />;
}

function BackToTop({ t }) {
  const [show, setShow] = useState(false);
  useEffect(() => { const fn = () => setShow(window.scrollY > 500); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: "32px", right: "32px", zIndex: 50, width: "46px", height: "46px", borderRadius: "50%", background: `linear-gradient(135deg,${t.accent},${t.accentSecondary})`, border: "none", color: "#fff", fontSize: "20px", cursor: "pointer", boxShadow: `0 4px 20px ${t.accentGlow}`, transition: "transform 0.2s" }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px) scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
    >↑</button>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [themeKey, setThemeKey] = useState("dark");
  const t = THEMES[themeKey];
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const ids = ["hero", "about", "skills", "experience", "projects", "certifications", "contact"];
    const onScroll = () => {
      const y = window.scrollY + 140;
      const main = document.querySelector("main");
      if (!main) return;
      let acc = 0;
      let current = "hero";
      for (const child of main.children) {
        if (y >= acc && ids.includes(child.id)) current = child.id;
        acc += child.offsetHeight;
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: t.bg, color: t.text, fontFamily: "'Inter','Space Grotesk',sans-serif", minHeight: "100vh", position: "relative", transition: "background 0.4s,color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Space+Mono&display=swap');
        *{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;overflow-x:hidden;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${t.accent}55;border-radius:3px;}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{box-shadow:0 0 8px #10b981}50%{box-shadow:0 0 20px #10b981,0 0 32px #10b98155}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes toastIn{from{opacity:0;transform:translate(-50%,24px)}to{opacity:1;transform:translate(-50%,0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes popIn{from{opacity:0;transform:scale(0.82)}to{opacity:1;transform:scale(1)}}
        @media(max-width:1024px){
          .projects-grid-3{grid-template-columns:repeat(2,1fr)!important;}
        }
        @media(max-width:768px){
          .nav-links{display:none!important;}
          .hamburger{display:block!important;}
          .about-grid{grid-template-columns:1fr!important;}
          .contact-grid{grid-template-columns:1fr!important;}
          .projects-grid-3{grid-template-columns:1fr!important;}
        }
      `}</style>

      <ParticleCanvas theme={themeKey} />
      <ScrollProgress t={t} />
      <Nav t={t} themeKey={themeKey} setThemeKey={setThemeKey} activeSection={activeSection} />
      <DateTimeWeather t={t} />

      <main>
        <Hero t={t} />
        <About t={t} />
        <Skills t={t} />
        <Experience t={t} />
        <Projects t={t} />
        <Certifications t={t} />
        <Contact t={t} />
      </main>

      <Footer t={t} />
      <BackToTop t={t} />
    </div>
  );
}