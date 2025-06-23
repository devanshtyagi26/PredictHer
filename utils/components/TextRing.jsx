import React from "react";

function TextRing() {
  const cx = 200;
  const cy = 190;
  const r = 150;
  const circumference = 2 * Math.PI * r;

  function degreesToLength(deg) {
    return (deg / 360) * circumference;
  }

  const arcs = [
    { start: -28, end: 30, color: "red", width: 2 },
    { start: 145, end: 192, color: "red", width: 2 },
    { start: 52, end: 97, color: "blue", width: 2 },
    { start: 237, end: 278, color: "green", width: 2 },
  ];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
      className="varela-round-regular"
    >
      <svg width="400" height="400" viewBox="0 0 400 400">
        <defs>
          {/* Circular path (clockwise) for Word 1 and Word 2 */}
          <path
            id="circlePathCW"
            d="M 200,200 m -150,0 a 150,150 0 1,1 300,0 a 150,150 0 1,1 -300,0"
          />

          {/* Flipped path (counter-clockwise) for Word 3 */}
          <path
            id="circlePathCCW"
            d="M 200,200 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0"
          />
        </defs>

        {/* Text on the circular path */}
        <text fontSize="20" fontWeight="bold">
          <textPath fill="black" href="#circlePathCW" startOffset="5%">
            FERTILITY
          </textPath>
        </text>
        <text fill="black" fontSize="20" fontWeight="bold">
          <textPath href="#circlePathCW" startOffset="28%">
            OVULATION
          </textPath>
        </text>
        <text fill="black" fontSize="20" fontWeight="bold">
          <textPath href="#circlePathCCW" startOffset="37%">
            PMS
          </textPath>
        </text>
        <text fill="black" fontSize="20" fontWeight="bold">
          <textPath href="#circlePathCCW" startOffset="9%">
            THE PERIOD
          </textPath>
        </text>

        {/* Colored arcs on the circle */}
        {arcs.map(({ start, end, color, width }, i) => {
          const arcLength = degreesToLength(end - start);
          const gapLength = circumference - arcLength;

          // strokeDasharray: dash length (arc), gap length (rest of circle)
          // strokeDashoffset: offset start point on circle
          // Note: SVG stroke starts at 3 o'clock (0°) and goes clockwise
          const dashArray = `${arcLength} ${gapLength}`;

          // Offset moves dash starting point around circle
          // To start at angle 'start', offset = circumference - length from 0° to start angle
          const dashOffset = circumference - degreesToLength(start);

          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={color}
              strokeWidth={width}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          );
        })}
      </svg>
    </div>
  );
}

export default TextRing;
