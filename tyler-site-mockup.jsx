import { useState, useEffect, useRef } from "react";

const PAGES = {
  HOME: "home",
  ACTING: "acting",
  ENGINEERING: "engineering",
};

// ─── Shared Nav ────────────────────────────────────────────
function Nav({ current, onNavigate }) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "linear-gradient(180deg, rgba(10,10,14,0.95) 0%, rgba(10,10,14,0) 100%)",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.5px",
      }}
    >
      <div
        onClick={() => onNavigate(PAGES.HOME)}
        style={{
          cursor: "pointer",
          fontFamily: "'Playfair Display', serif",
          fontSize: "18px",
          color: "#e8e4de",
          fontWeight: 500,
        }}
      >
        Tyler Lastname
      </div>
      <div style={{ display: "flex", gap: "32px", fontSize: "13px", textTransform: "uppercase" }}>
        {[
          { key: PAGES.HOME, label: "Home" },
          { key: PAGES.ACTING, label: "Acting" },
          { key: PAGES.ENGINEERING, label: "Engineering" },
        ].map((item) => (
          <span
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              cursor: "pointer",
              color: current === item.key ? "#c9a96e" : "#8a8680",
              borderBottom: current === item.key ? "1px solid #c9a96e" : "1px solid transparent",
              paddingBottom: "4px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (current !== item.key) e.target.style.color = "#c9bfb0";
            }}
            onMouseLeave={(e) => {
              if (current !== item.key) e.target.style.color = "#8a8680";
            }}
          >
            {item.label}
          </span>
        ))}
      </div>
    </nav>
  );
}

// ─── Animated text reveal ──────────────────────────────────
function RevealText({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── HOME PAGE ─────────────────────────────────────────────
function HomePage({ onNavigate }) {
  const [hoveredSide, setHoveredSide] = useState(null);

  const sideStyle = (side) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "60px 40px",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
    transition: "flex 0.6s cubic-bezier(0.16,1,0.3,1)",
    ...(hoveredSide === side ? { flex: 1.3 } : hoveredSide && hoveredSide !== side ? { flex: 0.7 } : {}),
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0e", color: "#e8e4de", position: "relative" }}>
      {/* Grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 99,
        }}
      />

      {/* Hero Section */}
      <div
        style={{
          height: "55vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: "48px",
          position: "relative",
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(ellipse, rgba(201,169,110,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <RevealText delay={200}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "6px",
              color: "#c9a96e",
              marginBottom: "20px",
            }}
          >
            Actor &nbsp;·&nbsp; Engineer &nbsp;·&nbsp; Builder
          </div>
        </RevealText>

        <RevealText delay={400}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 8vw, 96px)",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1,
              textAlign: "center",
              letterSpacing: "-1px",
            }}
          >
            Tyler Lastname
          </h1>
        </RevealText>

        <RevealText delay={600}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: "#8a8680",
              marginTop: "20px",
              fontWeight: 300,
              letterSpacing: "0.3px",
            }}
          >
            Building things real and imagined.
          </p>
        </RevealText>
      </div>

      {/* Dual Entry Cards */}
      <RevealText delay={900}>
        <div
          style={{
            display: "flex",
            minHeight: "45vh",
            borderTop: "1px solid rgba(201,169,110,0.15)",
          }}
        >
          {/* Acting Side */}
          <div
            style={sideStyle("acting")}
            onMouseEnter={() => setHoveredSide("acting")}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => onNavigate(PAGES.ACTING)}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  hoveredSide === "acting"
                    ? "linear-gradient(135deg, rgba(201,169,110,0.08) 0%, rgba(10,10,14,0) 60%)"
                    : "transparent",
                transition: "background 0.6s ease",
              }}
            />
            <div style={{ position: "relative", textAlign: "center" }}>
              <div
                style={{
                  width: "120px",
                  height: "160px",
                  background: "linear-gradient(145deg, #1a1a1e, #252528)",
                  borderRadius: "4px",
                  margin: "0 auto 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(201,169,110,0.12)",
                  boxShadow: hoveredSide === "acting" ? "0 8px 40px rgba(201,169,110,0.1)" : "none",
                  transition: "box-shadow 0.6s ease",
                  overflow: "hidden",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c9a96e" strokeWidth="1.2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  <path d="M2 4l3 2M22 4l-3 2" strokeLinecap="round" />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  margin: "0 0 8px",
                }}
              >
                Acting
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "#8a8680",
                  margin: 0,
                  maxWidth: "260px",
                  lineHeight: 1.6,
                }}
              >
                Reels, credits, headshots &amp; profiles
              </p>
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "#c9a96e",
                  opacity: hoveredSide === "acting" ? 1 : 0.5,
                  transition: "opacity 0.4s ease",
                }}
              >
                Explore →
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "1px",
              background: "rgba(201,169,110,0.15)",
            }}
          />

          {/* Engineering Side */}
          <div
            style={sideStyle("engineering")}
            onMouseEnter={() => setHoveredSide("engineering")}
            onMouseLeave={() => setHoveredSide(null)}
            onClick={() => onNavigate(PAGES.ENGINEERING)}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  hoveredSide === "engineering"
                    ? "linear-gradient(225deg, rgba(110,160,201,0.08) 0%, rgba(10,10,14,0) 60%)"
                    : "transparent",
                transition: "background 0.6s ease",
              }}
            />
            <div style={{ position: "relative", textAlign: "center" }}>
              <div
                style={{
                  width: "120px",
                  height: "160px",
                  background: "linear-gradient(145deg, #1a1a1e, #252528)",
                  borderRadius: "4px",
                  margin: "0 auto 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(110,160,201,0.12)",
                  boxShadow: hoveredSide === "engineering" ? "0 8px 40px rgba(110,160,201,0.1)" : "none",
                  transition: "box-shadow 0.6s ease",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6ea0c9" strokeWidth="1.2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
              </div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  margin: "0 0 8px",
                }}
              >
                Engineering
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  color: "#8a8680",
                  margin: 0,
                  maxWidth: "260px",
                  lineHeight: 1.6,
                }}
              >
                Projects, stack &amp; how I build
              </p>
              <div
                style={{
                  marginTop: "20px",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "3px",
                  color: "#6ea0c9",
                  opacity: hoveredSide === "engineering" ? 1 : 0.5,
                  transition: "opacity 0.4s ease",
                }}
              >
                Explore →
              </div>
            </div>
          </div>
        </div>
      </RevealText>
    </div>
  );
}

// ─── ACTING PAGE ───────────────────────────────────────────
function ActingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0e",
        color: "#e8e4de",
        paddingTop: "100px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <RevealText delay={100}>
          <div
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "5px",
              color: "#c9a96e",
              marginBottom: "12px",
            }}
          >
            Acting Portfolio
          </div>
        </RevealText>
        <RevealText delay={200}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              margin: "0 0 40px",
            }}
          >
            On Screen &amp; On Stage
          </h1>
        </RevealText>

        {/* Headshot + Bio Row */}
        <RevealText delay={350}>
          <div style={{ display: "flex", gap: "40px", marginBottom: "64px", flexWrap: "wrap" }}>
            <div
              style={{
                width: "200px",
                height: "260px",
                background: "linear-gradient(145deg, #1a1a1e, #252528)",
                borderRadius: "4px",
                border: "1px solid rgba(201,169,110,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <div style={{ textAlign: "center", color: "#5a5854" }}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#5a5854"
                  strokeWidth="1"
                  style={{ marginBottom: "8px" }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <div style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase" }}>
                  Primary Headshot
                </div>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: "250px" }}>
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#b0aca6", margin: "0 0 20px" }}>
                Tyler Lastname is a New York-based actor and improviser. He performs long-form improv
                regularly and has appeared in independent films, sketches, and digital content. When he's
                not on stage or on set, he's building software — which, honestly, is just another kind of
                performance.
              </p>
              {/* Profile Links */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                {[
                  { label: "IMDb", color: "#c9a96e" },
                  { label: "Actors Access", color: "#c9a96e" },
                  { label: "YouTube", color: "#c9a96e" },
                  { label: "Instagram", color: "#c9a96e" },
                ].map((link) => (
                  <span
                    key={link.label}
                    style={{
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: link.color,
                      padding: "8px 16px",
                      border: `1px solid ${link.color}33`,
                      borderRadius: "2px",
                      cursor: "pointer",
                    }}
                  >
                    {link.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealText>

        {/* Demo Reel Embed */}
        <RevealText delay={500}>
          <div style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              Demo Reel
            </h2>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                background: "linear-gradient(145deg, #111114, #1a1a1e)",
                borderRadius: "4px",
                border: "1px solid rgba(201,169,110,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ textAlign: "center", color: "#5a5854" }}>
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c9a96e"
                  strokeWidth="1"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <div
                  style={{
                    fontSize: "11px",
                    marginTop: "12px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "#8a8680",
                  }}
                >
                  YouTube Embed — Demo Reel
                </div>
              </div>
            </div>
          </div>
        </RevealText>

        {/* Credits */}
        <RevealText delay={650}>
          <div style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "24px",
              }}
            >
              Selected Credits
            </h2>
            {[
              { title: "Project Title", role: "Lead", type: "Short Film", year: "2025" },
              { title: "Another Project", role: "Supporting", type: "Web Series", year: "2024" },
              { title: "Stage Show Name", role: "Ensemble", type: "Improv / Theater", year: "2024" },
              { title: "Yet Another Film", role: "Featured", type: "Independent Film", year: "2023" },
            ].map((credit, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <span style={{ fontSize: "15px", color: "#e8e4de" }}>{credit.title}</span>
                  <span style={{ fontSize: "13px", color: "#6a6660", marginLeft: "12px" }}>
                    {credit.role}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "#5a5854", textTransform: "uppercase", letterSpacing: "1px" }}>
                    {credit.type}
                  </span>
                  <span style={{ fontSize: "13px", color: "#4a4844" }}>{credit.year}</span>
                </div>
              </div>
            ))}
          </div>
        </RevealText>

        {/* Headshot Gallery */}
        <RevealText delay={800}>
          <div style={{ marginBottom: "80px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "24px",
              }}
            >
              Headshots
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
              {["Commercial", "Theatrical", "Character", "Casual"].map((type) => (
                <div
                  key={type}
                  style={{
                    aspectRatio: "3/4",
                    background: "linear-gradient(145deg, #1a1a1e, #202024)",
                    borderRadius: "3px",
                    border: "1px solid rgba(255,255,255,0.04)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "#5a5854",
                    }}
                  >
                    {type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealText>
      </div>
    </div>
  );
}

// ─── ENGINEERING PAGE ──────────────────────────────────────
function EngineeringPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0e",
        color: "#e8e4de",
        paddingTop: "100px",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <RevealText delay={100}>
          <div
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              letterSpacing: "5px",
              color: "#6ea0c9",
              marginBottom: "12px",
            }}
          >
            Engineering
          </div>
        </RevealText>
        <RevealText delay={200}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 400,
              margin: "0 0 16px",
            }}
          >
            What I Build
          </h1>
        </RevealText>
        <RevealText delay={300}>
          <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#8a8680", margin: "0 0 56px", maxWidth: "600px" }}>
            Full-stack developer who ships real products. I build with Vue 3, Node.js, and PostgreSQL,
            deployed on Cloudflare Pages and Hetzner infrastructure. I care about clean architecture,
            fast load times, and building things people actually use.
          </p>
        </RevealText>

        {/* Featured Projects */}
        <RevealText delay={450}>
          <div style={{ marginBottom: "64px" }}>
            <div
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "4px",
                color: "#5a5854",
                marginBottom: "24px",
              }}
            >
              Featured Projects
            </div>
            <div style={{ display: "grid", gap: "20px" }}>
              {[
                {
                  name: "The Career Actor",
                  desc: "A career management platform for working actors — audition tracking, booking management, and professional growth tools.",
                  tags: ["Vue 3", "Node.js", "PostgreSQL", "Cloudflare"],
                  accent: "#6ea0c9",
                  status: "Live",
                },
                {
                  name: "Improv Jam Manager",
                  desc: "An app for hosting and managing improv jam nights — participant sign-ups, pair generation, and show flow tools.",
                  tags: ["Vue 3", "Fastify", "Neon"],
                  accent: "#c9a96e",
                  status: "In Development",
                },
                {
                  name: "Project Three",
                  desc: "Description of another project that demonstrates range and different problem-solving approaches.",
                  tags: ["Tech", "Stack", "Here"],
                  accent: "#7ec99e",
                  status: "Open Source",
                },
              ].map((project, i) => (
                <div
                  key={i}
                  style={{
                    background: "linear-gradient(145deg, #111114, #161618)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "6px",
                    padding: "32px",
                    cursor: "pointer",
                    transition: "border-color 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${project.accent}33`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)")}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "3px",
                      height: "100%",
                      background: project.accent,
                      opacity: 0.5,
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "20px",
                        fontWeight: 400,
                        margin: 0,
                      }}
                    >
                      {project.name}
                    </h3>
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        color: project.accent,
                        border: `1px solid ${project.accent}33`,
                        padding: "4px 10px",
                        borderRadius: "2px",
                      }}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p style={{ fontSize: "14px", color: "#8a8680", lineHeight: 1.7, margin: "0 0 16px" }}>
                    {project.desc}
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "11px",
                          color: "#5a5854",
                          background: "rgba(255,255,255,0.03)",
                          padding: "4px 10px",
                          borderRadius: "2px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealText>

        {/* How I Work */}
        <RevealText delay={600}>
          <div style={{ marginBottom: "64px" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px",
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              How I Work
            </h2>
            <div
              style={{
                background: "linear-gradient(145deg, #111114, #141416)",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "6px",
                padding: "32px",
              }}
            >
              <p style={{ fontSize: "14px", lineHeight: 1.9, color: "#a09c96", margin: 0 }}>
                I'm a solo full-stack developer who handles everything from database design to deployment
                pipelines. My go-to stack is <span style={{ color: "#6ea0c9" }}>Vue 3</span> on the frontend,{" "}
                <span style={{ color: "#6ea0c9" }}>Node.js</span> (Express or Fastify) on the backend, and{" "}
                <span style={{ color: "#6ea0c9" }}>PostgreSQL</span> (via Neon) for data. I deploy frontends
                to <span style={{ color: "#6ea0c9" }}>Cloudflare Pages</span> and run backend services on{" "}
                <span style={{ color: "#6ea0c9" }}>Hetzner VPS</span> infrastructure with Docker. I prefer
                building real products over toy projects — software that solves actual problems I've
                encountered in my own life and work.
              </p>
            </div>
          </div>
        </RevealText>

        {/* Resume CTA */}
        <RevealText delay={750}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "80px",
              padding: "24px 32px",
              border: "1px solid rgba(110,160,201,0.12)",
              borderRadius: "6px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div style={{ fontSize: "15px", color: "#e8e4de", marginBottom: "4px" }}>Want the full picture?</div>
              <div style={{ fontSize: "13px", color: "#6a6660" }}>Download my résumé or check out my GitHub.</div>
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { label: "Résumé ↓", accent: "#6ea0c9" },
                { label: "GitHub →", accent: "#e8e4de" },
              ].map((btn) => (
                <span
                  key={btn.label}
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: btn.accent,
                    padding: "10px 20px",
                    border: `1px solid ${btn.accent}33`,
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  {btn.label}
                </span>
              ))}
            </div>
          </div>
        </RevealText>
      </div>
    </div>
  );
}

// ─── FOOTER ────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0e",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "40px",
        textAlign: "center",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ fontSize: "12px", color: "#4a4844", letterSpacing: "1px" }}>
        © {new Date().getFullYear()} Tyler Lastname &nbsp;·&nbsp; Built with care
      </div>
    </footer>
  );
}

// ─── APP ───────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(PAGES.HOME);
  const [fadeKey, setFadeKey] = useState(0);

  const navigate = (p) => {
    setFadeKey((k) => k + 1);
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0e; overflow-x: hidden; }
        ::selection { background: rgba(201,169,110,0.3); color: #e8e4de; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0e; }
        ::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 3px; }
      `}</style>
      <Nav current={page} onNavigate={navigate} />
      <div key={fadeKey}>
        {page === PAGES.HOME && <HomePage onNavigate={navigate} />}
        {page === PAGES.ACTING && <ActingPage />}
        {page === PAGES.ENGINEERING && <EngineeringPage />}
        <Footer />
      </div>
    </>
  );
}
