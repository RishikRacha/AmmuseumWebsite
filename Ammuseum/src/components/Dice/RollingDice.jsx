import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

function RollingDice() {
  const [face, setFace] = useState(1);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();

  const animateRoll = (spin = 360) => {
    const nextRotation = rotation + spin;
    setRotation(nextRotation);

    const randX = Math.random() * 80 - 40;
    const randY = Math.random() * 80 - 40;

    controls.start({
      rotate: nextRotation,
      x: [0, randX, -randX / 2, 0],
      y: [0, -randY, randY / 2, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    });

    setTimeout(() => {
      setFace(Math.floor(Math.random() * 6) + 1);
    }, 300);
  };

  const rollDice = () => animateRoll(360);

  // 👇 Animate when component mounts
  useEffect(() => {
    animateRoll(720); // do a double spin on mount
  }, []);

  const dot = (cx, cy) => (
    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="6" fill="#111" />
  );

  const getDots = (num) => {
    switch (num) {
      case 1: return [dot(50, 50)];
      case 2: return [dot(30, 30), dot(70, 70)];
      case 3: return [dot(30, 30), dot(50, 50), dot(70, 70)];
      case 4: return [dot(30, 30), dot(70, 30), dot(30, 70), dot(70, 70)];
      case 5: return [dot(30, 30), dot(70, 30), dot(50, 50), dot(30, 70), dot(70, 70)];
      case 6: return [dot(30, 25), dot(30, 50), dot(30, 75), dot(70, 25), dot(70, 50), dot(70, 75)];
      default: return [];
    }
  };

  return (
    <motion.div
      onClick={rollDice}
      animate={controls}
      style={{
        width: 120,
        height: 120,
        display: "inline-block",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="2"
              floodColor="#000"
              floodOpacity="0.3"
            />
          </filter>
        </defs>

        <rect
          x="5"
          y="5"
          width="90"
          height="90"
          rx="15"
          fill="#fff"
          stroke="#222"
          strokeWidth="3"
          filter="url(#shadow)"
        />

        {getDots(face)}
      </motion.svg>
    </motion.div>
  );
}

export default RollingDice;
