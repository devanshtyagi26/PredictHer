"use client";
import React, { useState, useRef, useEffect } from "react";

const CircleSquares = ({
  count = 28,
  radius = 100,
  size = 30,
  permanentHighlightIndex = 14,
  permanentHighlightColor = "#6A0DAD",
  userHighlightColor = "#FF6B81",
}) => {
  const [userHighlightedIndex, setUserHighlightedIndex] = useState(-1);
  const containerRef = useRef(null);

  const getIndexFromCoords = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx);
    const adjustedAngle = angle - Math.PI / 2;
    const normalizedAngle = (adjustedAngle + 2 * Math.PI) % (2 * Math.PI);

    return Math.round((normalizedAngle / (2 * Math.PI)) * count) % count;
  };

  const handlePointerMove = (clientX, clientY) => {
    if (!containerRef.current) return;
    const index = getIndexFromCoords(clientX, clientY);
    setUserHighlightedIndex(index); // remove the condition
  };

  // Mouse
  const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);

  // Touch
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const squares = [];

  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count + Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const isPermanent = i === permanentHighlightIndex;
    const isUserHighlighted = i === userHighlightedIndex;

    let backgroundColor = "#ccc";
    let border = "none";

    if (isPermanent && isUserHighlighted) {
      backgroundColor = userHighlightColor;
      border = `4px solid ${permanentHighlightColor}`;
    } else if (isPermanent) {
      backgroundColor = permanentHighlightColor;
    } else if (isUserHighlighted) {
      backgroundColor = userHighlightColor;
    }

    const isHighlighted = isPermanent || isUserHighlighted;
    const shouldOffset = isHighlighted && !(isPermanent && isUserHighlighted);

    squares.push(
      <div
        key={i}
        style={{
          position: "absolute",
          left: `calc(50% + ${
            x - (isHighlighted ? (shouldOffset ? 10 : 15) : 0)
          }px - ${size / 2}px)`,
          top: `calc(50% + ${
            y - (isHighlighted ? (shouldOffset ? 10 : 15) : 0)
          }px - ${size / 2}px)`,
          width: `${isHighlighted ? size * 2 : size}px`,
          height: `${isHighlighted ? size * 2 : size}px`,
          backgroundColor,
          border,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: isHighlighted ? "1rem" : "0.85rem",
          fontWeight: "bold",
          color: "#fff",
          transition: "all 0.2s ease",
          boxShadow: isHighlighted ? "0 0 12px rgba(0,0,0,0.2)" : "none",
          zIndex: isHighlighted ? 10 : 1,
          userSelect: "none",
          cursor: "pointer",
          touchAction: "none",
        }}
      >
        {isHighlighted && i + 1}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: `${radius * 2 + size}px`,
        height: `${radius * 2 + size}px`,
        margin: "auto",
        touchAction: "none", // disable scroll while dragging
      }}
    >
      {squares}
    </div>
  );
};

export default CircleSquares;
