import React from "react";
import { predictNextCycle } from "../../utils/predictCycle";

function testing() {
  const periodLogs = [
    { from: "2025-01-18", to: "2025-01-20" },
    { from: "2025-02-15", to: "2025-02-19" },
    { from: "2025-03-13", to: "2025-03-17" },
    { from: "2025-04-18", to: "2025-04-22" },
    { from: "2025-05-20", to: "2025-05-23" },
  ];

  const prediction = predictNextCycle(periodLogs);
  console.log(prediction);

  return <div>This is a testing page. Open Console log.</div>;
}

export default testing;
