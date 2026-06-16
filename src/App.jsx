import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, ArrowUpRight, ArrowRight,
  MapPin, Menu, X, Code2, Server, Database, Smartphone, Boxes,
} from "lucide-react";

/* ───────────────────────────────────────────────────────────
   CUSTOMIZE ME — replace these placeholders with your details:
   • name / role / intro            → HERO block below
   • spec panel rows                → SPEC array
   • skill groups                   → STACK array
   • projects                       → PROJECTS array
   • work history                   → PATH array
   • email + social links           → LINKS object
   ─────────────────────────────────────────────────────────── */

const LINKS = {
  email: "pawanthilakarathne@gmail.com",
  github: "https://github.com/yourhandle",
  linkedin: "https://linkedin.com/in/yourhandle",
};

const SPEC = [
  ["location", "Kegalle, LK"],
  ["focus", "Backend · Fullstack"],
  ["experience", "4+ years"],
  ["status", "Open to work"],
  ["stack", "Java · Spring · Kafka · Postgres · MySQL · MongoDB · ReactJS"],
];

const STACK = [
  { icon: Code2, label: "Languages", items: ["Java", "Kotlin", "SQL", "TypeScript"] },
  { icon: Server, label: "Backend", items: ["Spring Boot", "Hibernate / JPA", "REST", "gRPC"] },
  { icon: Database, label: "Data & messaging", items: ["PostgreSQL", "Redis", "Kafka", "RabbitMQ", "Ehcache"] },
  { icon: Smartphone, label: "Mobile & web", items: ["Android", "Jetpack Compose", "React", "Tailwind"] },
  { icon: Boxes, label: "Platform", items: ["Docker", "GitHub Actions", "AWS", "Linux"] },
];

const PROJECTS = [
  {
    title: "Multi-vertical ERP platform",
    blurb: "One shared core serving gyms, pharmacies and hardware retailers, with per-vertical modules and multi-tenant data isolation.",
    tags: ["Java", "Spring", "PostgreSQL", "Multi-tenant"],
    href: "#",
  },
  {
    title: "Cache coherence layer",
    blurb: "Broker-driven cache invalidation across nodes using Kafka and a transactional outbox — no stale reads, even under write load.",
    tags: ["Kafka", "Hibernate", "Outbox", "Redis"],
    href: "#",
  },
  {
    title: "IQ Challenge — Android",
    blurb: "A timed reasoning game built with Kotlin and Jetpack Compose, taken from question engine all the way to a Play Store release.",
    tags: ["Kotlin", "Compose", "Room"],
    href: "#",
  },
  {
    title: "Unit-aware inventory engine",
    blurb: "Inventory with batch and expiry tracking plus bulk unit pricing — modelled for building-materials retail.",
    tags: ["Spring", "JPA", "Domain modeling"],
    href: "#",
  },
];

const PATH = [
  { role: "Associate Software Engineer", org: "Payable Lanka, Colombo, LK", period: "2025 May — Present", note: "Designing service boundaries, caching and messaging for a multi-tenant platform." },
  { role: "Associate Software Engineer", org: "Avernir IT, Kandy, LK", period: "2022 March — 2025 Jan", note: "Built and RD project EHR, working with Mern Stack, Java Hibernate, MySQL, PostGres" },
  { role: "M.Sc. Data Science", org: "Cardiff Metropolitan University, UK", period: "2026 — Present", note: "Big Data, Statictis, Internet Security" },
  { role: "B.Sc. Software Engineering", org: "Cardiff Metropolitan University, UK", period: "2023 — 2025", note: "Second Upper Class" },
];

const NAV = ["about", "stack", "work", "path", "contact"];

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

.pf-root{
  --bg:#0B0F17; --surface:#111725; --surface2:#161F2F; --border:#243049;
  --text:#E8ECF3; --muted:#828FA6; --amber:#F4A93C; --cyan:#56C7DE;
  --maxw:1080px;
  background:var(--bg); color:var(--text);
  font-family:'Inter',system-ui,sans-serif; line-height:1.6;
  -webkit-font-smoothing:antialiased; overflow-x:hidden; min-height:100vh;
}
.pf-root *{box-sizing:border-box;}
.pf-root h1,.pf-root h2,.pf-root h3{
  font-family:'Bricolage Grotesque','Inter',sans-serif;
  font-weight:700; line-height:1.04; letter-spacing:-0.025em; margin:0;
}
.pf-root a{color:inherit; text-decoration:none;}
.pf-mono{font-family:'JetBrains Mono',ui-monospace,monospace;}
.pf-wrap{max-width:var(--maxw); margin:0 auto; padding:0 24px;}

/* eyebrow label */
.pf-eyebrow{
  font-family:'JetBrains Mono',monospace; font-size:.74rem; letter-spacing:.08em;
  color:var(--cyan); text-transform:lowercase; display:inline-flex; gap:.5rem; align-items:center;
}
.pf-eyebrow::before{content:''; width:18px; height:1px; background:var(--cyan); opacity:.6;}

/* NAV */
.pf-nav{position:sticky; top:0; z-index:50; backdrop-filter:blur(10px);
  background:color-mix(in srgb, var(--bg) 80%, transparent);
  border-bottom:1px solid var(--border);}
.pf-nav-in{display:flex; align-items:center; justify-content:space-between; height:64px;}
.pf-logo{font-family:'Bricolage Grotesque',sans-serif; font-weight:800; font-size:1.05rem; letter-spacing:-.02em;}
.pf-logo span{color:var(--amber);}
.pf-links{display:flex; gap:30px; align-items:center;}
.pf-link{font-family:'JetBrains Mono',monospace; font-size:.82rem; color:var(--muted);
  position:relative; padding:4px 0; transition:color .2s;}
.pf-link:hover,.pf-link.active{color:var(--text);}
.pf-link::after{content:''; position:absolute; left:0; bottom:0; height:1.5px; width:0; background:var(--amber); transition:width .25s;}
.pf-link:hover::after,.pf-link.active::after{width:100%;}
.pf-burger{display:none; background:none; border:1px solid var(--border); color:var(--text);
  border-radius:8px; padding:8px; cursor:pointer;}
.pf-mobile{display:none;}

/* HERO */
.pf-hero{padding:96px 0 84px; position:relative;}
.pf-hero::before{content:''; position:absolute; top:-120px; left:-10%; width:520px; height:520px;
  background:radial-gradient(circle, color-mix(in srgb,var(--amber) 16%, transparent), transparent 65%);
  filter:blur(20px); pointer-events:none; z-index:0;}
.pf-hero-grid{display:grid; grid-template-columns:1.55fr 1fr; gap:48px; align-items:center; position:relative; z-index:1;}
.pf-name{font-size:clamp(2.8rem,8vw,5.6rem); font-weight:800; margin:18px 0 6px;}
.pf-role{font-size:clamp(1.1rem,2.4vw,1.5rem); color:var(--amber); font-family:'Bricolage Grotesque',sans-serif; font-weight:600; letter-spacing:-.01em;}
.pf-intro{color:var(--muted); font-size:1.05rem; max-width:46ch; margin:22px 0 30px;}
.pf-intro b{color:var(--text); font-weight:600;}
.pf-cta-row{display:flex; gap:14px; flex-wrap:wrap;}
.pf-btn{display:inline-flex; align-items:center; gap:8px; padding:13px 22px; border-radius:10px;
  font-weight:600; font-size:.95rem; cursor:pointer; transition:transform .2s, background .2s, border-color .2s; border:1px solid transparent;}
.pf-btn-primary{background:var(--amber); color:#1a1205;}
.pf-btn-primary:hover{transform:translateY(-2px);}
.pf-btn-ghost{border-color:var(--border); color:var(--text);}
.pf-btn-ghost:hover{border-color:var(--cyan); color:var(--cyan); transform:translateY(-2px);}

/* SPEC panel — the signature readout */
.pf-spec{background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:6px 0; overflow:hidden;}
.pf-spec-head{display:flex; align-items:center; gap:7px; padding:12px 18px; border-bottom:1px solid var(--border);}
.pf-dot{width:9px; height:9px; border-radius:50%; background:var(--amber);}
.pf-dot.live{background:#46d18a; animation:pfBlink 2.2s infinite;}
.pf-spec-title{font-family:'JetBrains Mono',monospace; font-size:.72rem; color:var(--muted); letter-spacing:.06em;}
.pf-spec-row{display:flex; justify-content:space-between; gap:16px; padding:11px 18px; border-bottom:1px solid color-mix(in srgb,var(--border) 55%, transparent); font-family:'JetBrains Mono',monospace; font-size:.8rem;}
.pf-spec-row:last-child{border-bottom:none;}
.pf-spec-k{color:var(--muted); text-transform:uppercase; letter-spacing:.05em; font-size:.7rem;}
.pf-spec-v{color:var(--text); text-align:right;}

/* SECTIONS */
.pf-section{padding:72px 0; opacity:0; transform:translateY(22px); transition:opacity .6s ease, transform .6s ease; scroll-margin-top:88px;}
.pf-section.pf-in{opacity:1; transform:none;}
.pf-h2{font-size:clamp(1.7rem,4vw,2.5rem); margin:14px 0 0;}
.pf-lead{color:var(--muted); max-width:60ch; margin-top:18px; font-size:1.02rem;}
.pf-lead b{color:var(--text); font-weight:600;}

/* STACK */
.pf-stack-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:16px; margin-top:36px;}
.pf-stack-card{background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:20px; transition:border-color .25s, transform .25s;}
.pf-stack-card:hover{border-color:color-mix(in srgb,var(--cyan) 50%, var(--border)); transform:translateY(-3px);}
.pf-stack-ic{color:var(--cyan); margin-bottom:12px;}
.pf-stack-label{font-family:'JetBrains Mono',monospace; font-size:.78rem; color:var(--text); letter-spacing:.04em; margin-bottom:12px;}
.pf-chips{display:flex; flex-wrap:wrap; gap:7px;}
.pf-chip{font-family:'JetBrains Mono',monospace; font-size:.72rem; color:var(--muted); background:var(--surface2); border:1px solid var(--border); padding:4px 9px; border-radius:6px;}

/* WORK */
.pf-work-grid{display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-top:36px;}
.pf-card{position:relative; background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:26px; transition:border-color .25s, transform .25s; overflow:hidden;}
.pf-card:hover{border-color:color-mix(in srgb,var(--amber) 55%, var(--border)); transform:translateY(-4px);}
.pf-card-corner{position:absolute; top:14px; right:14px; color:var(--muted); opacity:.5; transition:opacity .25s, transform .25s;}
.pf-card:hover .pf-card-corner{opacity:1; color:var(--amber); transform:translate(2px,-2px);}
.pf-card-num{font-family:'JetBrains Mono',monospace; font-size:.72rem; color:var(--cyan);}
.pf-card-title{font-size:1.22rem; margin:10px 0 8px; padding-right:24px;}
.pf-card-blurb{color:var(--muted); font-size:.93rem; margin-bottom:18px;}

/* PATH timeline */
.pf-path{margin-top:38px; border-left:1px solid var(--border); padding-left:0;}
.pf-path-item{position:relative; padding:0 0 30px 28px;}
.pf-path-item:last-child{padding-bottom:0;}
.pf-path-item::before{content:''; position:absolute; left:-5px; top:5px; width:9px; height:9px; border-radius:50%; background:var(--bg); border:2px solid var(--amber);}
.pf-path-period{font-family:'JetBrains Mono',monospace; font-size:.74rem; color:var(--cyan);}
.pf-path-role{font-family:'Bricolage Grotesque',sans-serif; font-weight:700; font-size:1.1rem; margin:4px 0 2px;}
.pf-path-org{color:var(--muted); font-size:.9rem;}
.pf-path-note{color:var(--muted); font-size:.9rem; margin-top:6px; max-width:54ch;}

/* CONTACT */
.pf-contact{text-align:center;}
.pf-contact .pf-eyebrow{justify-content:center;}
.pf-contact-h{font-size:clamp(2rem,5vw,3.2rem); margin:16px 0;}
.pf-contact-sub{color:var(--muted); max-width:46ch; margin:0 auto 30px;}
.pf-socials{display:flex; gap:14px; justify-content:center; margin-top:26px;}
.pf-soc{width:46px; height:46px; display:flex; align-items:center; justify-content:center; border:1px solid var(--border); border-radius:11px; color:var(--muted); transition:color .2s, border-color .2s, transform .2s;}
.pf-soc:hover{color:var(--cyan); border-color:var(--cyan); transform:translateY(-3px);}

/* FOOTER */
.pf-footer{border-top:1px solid var(--border); padding:28px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;}
.pf-foot-t{font-family:'JetBrains Mono',monospace; font-size:.76rem; color:var(--muted);}

/* load reveal */
.pf-reveal{opacity:0; transform:translateY(16px); animation:pfUp .7s cubic-bezier(.2,.7,.2,1) forwards;}
@keyframes pfUp{to{opacity:1; transform:none;}}
@keyframes pfBlink{0%,100%{opacity:1;} 50%{opacity:.35;}}

:focus-visible{outline:2px solid var(--cyan); outline-offset:3px; border-radius:4px;}

@media (max-width:860px){
  .pf-hero-grid{grid-template-columns:1fr; gap:36px;}
  .pf-work-grid{grid-template-columns:1fr;}
  .pf-links{display:none;}
  .pf-burger{display:inline-flex;}
  .pf-mobile{display:block; border-bottom:1px solid var(--border); background:var(--surface);}
  .pf-mobile a{display:block; padding:14px 24px; font-family:'JetBrains Mono',monospace; font-size:.9rem; color:var(--muted); border-top:1px solid var(--border);}
}
@media (prefers-reduced-motion:reduce){
  .pf-root *{animation:none!important; transition:none!important;}
  .pf-section{opacity:1; transform:none;}
  .pf-reveal{opacity:1; transform:none;}
}
`;

export default function Portfolio() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const rootRef = useRef(null);

  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll(".pf-section") || [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("pf-in");
            if (e.intersectionRatio > 0.4) setActive(e.target.id);
          }
        });
      },
      { threshold: [0.15, 0.4], rootMargin: "-10% 0px -40% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pf-root" ref={rootRef} style={{ scrollBehavior: "smooth" }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="pf-nav">
        <div className="pf-wrap pf-nav-in">
          <a className="pf-logo" href="#top" onClick={(e) => { e.preventDefault(); go("top"); }}>
            SJ<span>.</span>
          </a>
          <div className="pf-links">
            {NAV.map((n) => (
              <a key={n} className={`pf-link ${active === n ? "active" : ""}`} href={`#${n}`}
                 onClick={(e) => { e.preventDefault(); go(n); }}>
                {n}
              </a>
            ))}
          </div>
          <button className="pf-burger" aria-label="Toggle menu" onClick={() => setMenu((m) => !m)}>
            {menu ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menu && (
          <div className="pf-mobile">
            {NAV.map((n) => (
              <a key={n} href={`#${n}`} onClick={(e) => { e.preventDefault(); go(n); }}>{`// ${n}`}</a>
            ))}
          </div>
        )}
      </nav>

      <main className="pf-wrap" id="top">
        {/* HERO */}
        <header className="pf-hero">
          <div className="pf-hero-grid">
            <div>
              <span className="pf-eyebrow pf-reveal" style={{ animationDelay: ".05s" }}>
                open to fullstack &amp; backend roles
              </span>
              {/* CUSTOMIZE: your name */}
              <h1 className="pf-name pf-reveal" style={{ animationDelay: ".12s" }}>Jasitha Thilakrathne</h1>
              <div className="pf-role pf-reveal" style={{ animationDelay: ".2s" }}>
                Fullstack &amp; Distributed Systems Engineer
              </div>
              <p className="pf-intro pf-reveal" style={{ animationDelay: ".28s" }}>
                I build server-side systems that stay <b>correct under load</b> — distributed data,
                caching layers, and the messaging that keeps services in sync. Lately that means
                Java, Spring and event-driven architecture.
              </p>
              <div className="pf-cta-row pf-reveal" style={{ animationDelay: ".36s" }}>
                <a className="pf-btn pf-btn-primary" href="#work" onClick={(e) => { e.preventDefault(); go("work"); }}>
                  View work <ArrowRight size={17} />
                </a>
                <a className="pf-btn pf-btn-ghost" href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }}>
                  Get in touch
                </a>
              </div>
            </div>

            {/* SPEC panel */}
            <aside className="pf-spec pf-reveal" style={{ animationDelay: ".44s" }} aria-label="Quick facts">
              <div className="pf-spec-head">
                <span className="pf-dot live" />
                <span className="pf-spec-title">~/engineer.spec</span>
              </div>
              {SPEC.map(([k, v]) => (
                <div className="pf-spec-row" key={k}>
                  <span className="pf-spec-k">{k}</span>
                  <span className="pf-spec-v">{v}</span>
                </div>
              ))}
            </aside>
          </div>
        </header>

        {/* ABOUT */}
        <section className="pf-section" id="about">
          <span className="pf-eyebrow">// about</span>
          <h2 className="pf-h2">From schema to throughput</h2>
          <p className="pf-lead">
            I like the unglamorous parts of software — the data model that doesn't fall apart,
            the cache that doesn't go stale, the queue that doesn't lose a message. Most of my work
            lives behind the API, where <b>correctness and reliability</b> matter more than novelty.
          </p>
          <p className="pf-lead">
            I move comfortably across the stack when a project needs it — shipping Android clients
            and React front-ends — but my centre of gravity is the backend: domain modelling,
            persistence, and the messaging between services.
          </p>
        </section>

        {/* STACK */}
        <section className="pf-section" id="stack">
          <span className="pf-eyebrow">// stack</span>
          <h2 className="pf-h2">What I build with</h2>
          <div className="pf-stack-grid">
            {STACK.map(({ icon: Icon, label, items }) => (
              <div className="pf-stack-card" key={label}>
                <Icon className="pf-stack-ic" size={22} />
                <div className="pf-stack-label">{label}</div>
                <div className="pf-chips">
                  {items.map((it) => <span className="pf-chip" key={it}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WORK */}
        <section className="pf-section" id="work">
          <span className="pf-eyebrow">// work</span>
          <h2 className="pf-h2">Selected work</h2>
          <div className="pf-work-grid">
            {PROJECTS.map((p, i) => (
              <a className="pf-card" key={p.title} href={p.href} target="_blank" rel="noreferrer">
                <ArrowUpRight className="pf-card-corner" size={18} />
                <span className="pf-card-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="pf-card-title">{p.title}</h3>
                <p className="pf-card-blurb">{p.blurb}</p>
                <div className="pf-chips">
                  {p.tags.map((t) => <span className="pf-chip" key={t}>{t}</span>)}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* PATH */}
        <section className="pf-section" id="path">
          <span className="pf-eyebrow">// path</span>
          <h2 className="pf-h2">Where I've been</h2>
          <div className="pf-path">
            {PATH.map((p) => (
              <div className="pf-path-item" key={p.role + p.period}>
                <div className="pf-path-period">{p.period}</div>
                <div className="pf-path-role">{p.role}</div>
                <div className="pf-path-org">{p.org}</div>
                <div className="pf-path-note">{p.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="pf-section pf-contact" id="contact">
          <span className="pf-eyebrow">// contact</span>
          <h2 className="pf-h2 pf-contact-h">Let's build something</h2>
          <p className="pf-contact-sub">
            Have a system that needs to scale, or a role you think I'd fit? I read every message.
          </p>
          <a className="pf-btn pf-btn-primary" href={`mailto:${LINKS.email}`} style={{ margin: "0 auto" }}>
            <Mail size={17} /> {LINKS.email}
          </a>
          <div className="pf-socials">
            <a className="pf-soc" href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a>
            <a className="pf-soc" href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a className="pf-soc" href={`mailto:${LINKS.email}`} aria-label="Email"><Mail size={20} /></a>
          </div>
        </section>
      </main>

      <footer className="pf-wrap pf-footer">
        <span className="pf-foot-t">© {new Date().getFullYear()} Jasitha Thilakrathne</span>
        <span className="pf-foot-t">Built with React</span>
      </footer>
    </div>
  );
}
