import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    label: "Newborn Collection",
    src: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&q=80",
    bg: "#F7F1E8",
    panel: "#EDE6D6",
  },
  {
    label: "Baby Boys",
    src: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    bg: "#DDEEFF",
    panel: "#C8E4FF",
  },
  {
    label: "Baby Girls",
    src: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    bg: "#FADADD",
    panel: "#F5C2C7",
  },
  {
    label: "Toys & Accessories",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    bg: "#DFF5E1",
    panel: "#C5ECC8",
  },
];

// Grain SVG as data URI
const grainStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
  backgroundSize: "200px 200px",
  backgroundRepeat: "repeat",
};

export default function ChandCenter() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  // Preload images
  useEffect(() => {
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  // Responsive listener
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navigate = useCallback(
    (dir) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) =>
        dir === "next" ? (prev + 1) % 4 : (prev + 3) % 4
      );
      setTimeout(() => setIsAnimating(false), 650);
    },
    [isAnimating]
  );

  const center = activeIndex;
  const left = (activeIndex + 3) % 4;
  const right = (activeIndex + 1) % 4;
  const back = (activeIndex + 2) % 4;

  function getRoleStyle(idx) {
    const transition =
      "transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)";
    const base = {
      position: "absolute",
      aspectRatio: "0.6 / 1",
      transition,
      willChange: "transform, filter, opacity",
    };
    if (idx === center) {
      return {
        ...base,
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: "none",
        opacity: 1,
        zIndex: 20,
        left: "50%",
        height: isMobile ? "60%" : "92%",
        bottom: isMobile ? "22%" : 0,
      };
    }
    if (idx === left) {
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "20%" : "30%",
        height: isMobile ? "16%" : "28%",
        bottom: isMobile ? "32%" : "12%",
      };
    }
    if (idx === right) {
      return {
        ...base,
        transform: "translateX(-50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "80%" : "70%",
        height: isMobile ? "16%" : "28%",
        bottom: isMobile ? "32%" : "12%",
      };
    }
    // back
    return {
      ...base,
      transform: "translateX(-50%) scale(1)",
      filter: "blur(4px)",
      opacity: 0,
      zIndex: 5,
      left: "50%",
      height: isMobile ? "13%" : "22%",
      bottom: isMobile ? "32%" : "12%",
    };
  }

  return (
    <div
      style={{
        backgroundColor: SLIDES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4,0,0.2,1)",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Load fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { margin: 0; }
      `}</style>

      <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

        {/* Grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 50,
            opacity: 0.35,
            ...grainStyle,
          }}
        />

        {/* Giant ghost text */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            userSelect: "none",
            zIndex: 2,
            top: "18%",
          }}
        >
          <span
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(72px, 22vw, 320px)",
              fontWeight: 900,
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
              textShadow: "0 4px 32px rgba(0,0,0,0.06)",
            }}
          >
            BABY FASHION
          </span>
        </div>

        {/* Top-left brand */}
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: isMobile ? "1rem" : "2rem",
            zIndex: 60,
          }}
        >
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(80,60,50,0.85)",
              letterSpacing: "0.18em",
            }}
          >
            CHAND CENTER
          </span>
        </div>

        {/* Slide label top-center */}
        <div
          style={{
            position: "absolute",
            top: "1.5rem",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            zIndex: 60,
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              textTransform: "uppercase",
              color: "rgba(80,60,50,0.7)",
              letterSpacing: "0.22em",
              transition: "opacity 400ms",
            }}
          >
            {SLIDES[activeIndex].label}
          </span>
        </div>

        {/* Carousel */}
        <div style={{ position: "absolute", inset: 0, zIndex: 3 }}>
          {SLIDES.map((slide, idx) => (
            <div key={idx} style={getRoleStyle(idx)}>
              <img
                src={slide.src}
                alt={slide.label}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "bottom center",
                  borderRadius: "16px",
                  filter: idx === center ? "drop-shadow(0 20px 40px rgba(0,0,0,0.18))" : "none",
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom-left: title + description + nav */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "1.5rem" : "5rem",
            left: isMobile ? "1rem" : "6rem",
            zIndex: 60,
            maxWidth: "340px",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: isMobile ? "1rem" : "1.35rem",
              color: "rgba(60,40,30,0.95)",
              marginBottom: isMobile ? "0.5rem" : "0.75rem",
            }}
          >
            CHAND CENTER
          </p>
          {!isMobile && (
            <p
              style={{
                fontSize: "0.8rem",
                color: "rgba(60,40,30,0.75)",
                lineHeight: 1.65,
                marginBottom: "1.25rem",
                maxWidth: "280px",
              }}
            >
              Premium baby garments, newborn essentials, toys, and accessories. Soft fabrics, adorable designs, and quality products for your little ones.
            </p>
          )}
          {/* Nav buttons */}
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {[
              { dir: "prev", Icon: ArrowLeft },
              { dir: "next", Icon: ArrowRight },
            ].map(({ dir, Icon }) => (
              <button
                key={dir}
                onClick={() => navigate(dir)}
                style={{
                  width: isMobile ? "48px" : "60px",
                  height: isMobile ? "48px" : "60px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.45)",
                  border: "2px solid rgba(60,40,30,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 150ms, background-color 150ms",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.08)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.65)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.45)";
                }}
              >
                <Icon size={isMobile ? 20 : 26} strokeWidth={2.25} color="rgba(60,40,30,0.85)" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom-right CTA */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "1.5rem" : "5rem",
            right: isMobile ? "1rem" : "2.5rem",
            zIndex: 60,
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "'Anton', sans-serif",
              fontSize: `clamp(18px, 4vw, 52px)`,
              fontWeight: 400,
              color: "rgba(60,40,30,0.9)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
              transition: "opacity 200ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.9")}
          >
            SHOP NOW
            <ArrowRight
              style={{ width: isMobile ? "20px" : "32px", height: isMobile ? "20px" : "32px" }}
              strokeWidth={2.25}
            />
          </a>
        </div>

        {/* Dot indicators */}
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? "1.2rem" : "2rem",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            zIndex: 60,
          }}
        >
          {SLIDES.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: idx === activeIndex ? "20px" : "6px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor:
                  idx === activeIndex
                    ? "rgba(60,40,30,0.75)"
                    : "rgba(60,40,30,0.25)",
                transition: "width 400ms cubic-bezier(0.4,0,0.2,1), background-color 400ms",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
