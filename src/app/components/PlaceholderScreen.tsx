import { Award, StickyNote, LifeBuoy } from "lucide-react";

type ScreenType = "certificates" | "notes" | "help";

const CONFIG: Record<ScreenType, { Icon: React.ElementType; title: string; sub: string; color: string }> = {
  certificates: { Icon: Award,     title: "Certificate Center", sub: "Your earned certificates will appear here once you complete a full training room.", color: "#D4A017" },
  notes:        { Icon: StickyNote, title: "My Study Notes",    sub: "Notes you save during lessons will be collected here for easy review.", color: "#2BA89A" },
  help:         { Icon: LifeBuoy,  title: "Help & Support",     sub: "Contact your administrator or visit the knowledge base for assistance.", color: "#7B5EA7" },
};

export function PlaceholderScreen({ screen }: { screen: ScreenType }) {
  const { Icon, title, sub, color } = CONFIG[screen];
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#F4F6F9" }}>
      <div style={{ textAlign: "center", maxWidth: 340 }}>
        <div style={{
          width: 70, height: 70, borderRadius: 20, margin: "0 auto 18px",
          background: `${color}12`, border: `1px solid ${color}25`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={30} style={{ color }} />
        </div>
        <h2 style={{ color: "#1E3A6E", fontFamily: "Montserrat,sans-serif", fontWeight: 800, fontSize: 20, marginBottom: 10 }}>{title}</h2>
        <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7 }}>{sub}</p>
      </div>
    </div>
  );
}
