import { useState } from "react";

function RebrandBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div
      style={{
        width: "100%",
        background: "#1f1f1f",
        color: "white",
        padding: "12px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        position: "sticky",
        top: '60px',
        zIndex: 999,
        cursor:'pointer',
        boxSizing:'border-box'
      }}
    >
      <span>
        Note: Ammuseum has since been rebranded as ParaDice. This project is
        maintained as a portfolio/demo application.
      </span>

      <button
        onClick={() => setVisible(false)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
          marginLeft: "16px",
        }}
      >
        ×
      </button>
    </div>
  );
}

export default RebrandBanner;