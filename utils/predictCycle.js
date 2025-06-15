function weightedAverage(values, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  return (
    values.reduce((sum, val, i) => sum + val * weights[i], 0) / totalWeight
  );
}

function removeOutliers(data, threshold = 10) {
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  return data.filter((x) => Math.abs(x - avg) <= threshold);
}

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

/**
 * Predicts cycle using weighted average, outlier removal, and duration modeling.
 * @param {Array} logs - Array of period objects: { from: "YYYY-MM-DD", to: "YYYY-MM-DD" }
 */
export function predictNextCycle(logs) {
  if (!logs || logs.length < 2) return null;

  const sortedLogs = logs
    .map((log) => {
      const from = new Date(log.from);
      const to = new Date(log.to);
      return {
        from,
        to,
        duration: (to - from) / (1000 * 60 * 60 * 24),
      };
    })
    .filter(
      (log) => isValidDate(log.from) && isValidDate(log.to) && log.duration > 0
    )
    .sort((a, b) => a.from - b.from);

  if (sortedLogs.length < 2) return null;

  // Cycle gaps (between starts)
  const cycleGaps = [];
  for (let i = 1; i < sortedLogs.length; i++) {
    const diff =
      (sortedLogs[i].from - sortedLogs[i - 1].from) / (1000 * 60 * 60 * 24);
    if (diff > 0) cycleGaps.push(diff);
  }

  const cleanedCycles = removeOutliers(cycleGaps);
  const cycleWeights = cleanedCycles.map((_, i) => i + 1);

  const cleanedDurationsRaw = sortedLogs
    .map((log) => log.duration)
    .filter((d) => !isNaN(d) && d > 0);
  const cleanedDurations = removeOutliers(cleanedDurationsRaw);
  const durationWeights = cleanedDurations.map((_, i) => i + 1);

  // Defaults in case of no clean data
  const avgCycle = cleanedCycles.length
    ? Math.round(weightedAverage(cleanedCycles, cycleWeights))
    : 28;

  const avgDuration = cleanedDurations.length
    ? Math.round(weightedAverage(cleanedDurations, durationWeights))
    : 5;

  const lastStart = sortedLogs[sortedLogs.length - 1].from;

  const predictedStart = new Date(lastStart);
  predictedStart.setDate(predictedStart.getDate() + avgCycle);

  const predictedEnd = new Date(predictedStart);
  predictedEnd.setDate(predictedStart.getDate() + avgDuration);

  const predictedOvulation = new Date(predictedStart);
  predictedOvulation.setDate(predictedStart.getDate() - 14);

  const predictedPMSStart = new Date(predictedStart);
  predictedPMSStart.setDate(predictedStart.getDate() - 5);

  const stdDev = Math.sqrt(
    cleanedCycles.reduce((sum, x) => sum + Math.pow(x - avgCycle, 2), 0) /
      cleanedCycles.length
  );

  const isIrregular = stdDev > 7;

  return {
    averageCycleLength: avgCycle,
    averagePeriodDuration: avgDuration,
    cycleStandardDeviation: Math.round(stdDev),
    isIrregular,
    lastPeriodStart: isValidDate(lastStart)
      ? lastStart.toISOString().split("T")[0]
      : null,
    predictedPeriodStart: isValidDate(predictedStart)
      ? predictedStart.toISOString().split("T")[0]
      : null,
    predictedPeriodEnd: isValidDate(predictedEnd)
      ? predictedEnd.toISOString().split("T")[0]
      : null,
    predictedOvulation: isValidDate(predictedOvulation)
      ? predictedOvulation.toISOString().split("T")[0]
      : null,
    predictedPMSStart: isValidDate(predictedPMSStart)
      ? predictedPMSStart.toISOString().split("T")[0]
      : null,
  };
}
