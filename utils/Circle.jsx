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
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const getAngleIndexFromEvent = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    const angle = Math.atan2(dy, dx);

    const adjustedAngle = angle + Math.PI / 2;
    const normalizedAngle = (adjustedAngle + 2 * Math.PI) % (2 * Math.PI);
    const index = Math.round((normalizedAngle / (2 * Math.PI)) * count) % count;

    return index;
  };

  const handlePointerMove = (clientX, clientY) => {
    if (!isDragging || !containerRef.current) return;
    const index = getAngleIndexFromEvent(clientX, clientY);
    if (index !== permanentHighlightIndex) {
      setUserHighlightedIndex(index);
    }
  };

  // Mouse
  const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
  const handleMouseUp = () => setIsDragging(false);

  // Touch
  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      handlePointerMove(touch.clientX, touch.clientY);
    }
  };
  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  const squares = [];

  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count + Math.PI / 2;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    const isPermanent = i === permanentHighlightIndex;
    const isUserHighlighted = i === userHighlightedIndex;

    let backgroundColor = "#ccc";
    if (isPermanent) backgroundColor = permanentHighlightColor;
    else if (isUserHighlighted) backgroundColor = userHighlightColor;

    const isHighlighted = isPermanent || isUserHighlighted;

    squares.push(
      <div
        key={i}
        onMouseDown={() => {
          if (i !== permanentHighlightIndex) {
            setUserHighlightedIndex(i);
            setIsDragging(true);
          }
        }}
        onTouchStart={(e) => {
          const touch = e.touches[0];
          const index = getAngleIndexFromEvent(touch.clientX, touch.clientY);
          if (index !== permanentHighlightIndex) {
            setUserHighlightedIndex(index);
            setIsDragging(true);
          }
        }}
        style={{
          position: "absolute",
          left: `calc(50% + ${x}px - ${size / 2}px - ${
            isHighlighted ? "5px" : "0px"
          })`,
          top: `calc(50% + ${y}px - ${size / 2}px - ${
            isHighlighted ? "5px" : "0px"
          })`,
          width: `${isHighlighted ? size * 1.4 : size}px`,
          height: `${isHighlighted ? size * 1.4 : size}px`,
          backgroundColor,
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
          cursor: isPermanent ? "default" : "pointer",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        {isHighlighted && i}
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
        touchAction: "none", // disables zooming/scrolling during touch drag
      }}
    >
      {squares}
    </div>
  );
};

export default CircleSquares;
