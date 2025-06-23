"use client";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDay } from "../store/slices/cycleSlice";

const CircleSquares = ({
  count = 28,
  radius = 100,
  size = 30,
  permanentHighlightColor = "#6A0DAD",
  userHighlightColor = "#FF6B81",
}) => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const selectedDay = useSelector((state) => state.cycle.selectedDay);
  const permanentDay = useSelector((state) => state.cycle.permanentDay);

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
    if (index !== permanentDay) {
      dispatch(setSelectedDay(index));
    }
  };

  const handleMouseMove = (e) => handlePointerMove(e.clientX, e.clientY);
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

    const isPermanent = i === permanentDay;
    const isUserHighlighted = i === selectedDay;

    let backgroundColor = "#ccc";
    if (isPermanent) backgroundColor = permanentHighlightColor;
    else if (isUserHighlighted) backgroundColor = userHighlightColor;

    const isHighlighted = isPermanent || isUserHighlighted;

    squares.push(
      <div
        key={i}
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
        touchAction: "none",
      }}
    >
      {squares}
    </div>
  );
};

export default CircleSquares;
