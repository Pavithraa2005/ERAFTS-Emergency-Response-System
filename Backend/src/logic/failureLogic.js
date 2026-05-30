// src/logic/failureLogic.js
function detectFailures(timeline) {
  const failures = [];

  const call = timeline.find(e => e.event_type === "call");
  const arrival = timeline.find(e => e.event_type === "arrival");
  const rejection = timeline.find(e => e.event_type === "rejection");

  if (call && !arrival) {
    failures.push({
      type: "non-arrival",
      reason: "Emergency call placed but no arrival recorded"
    });
  }

  if (call && arrival) {
    const delay =
      (new Date(arrival.event_time) - new Date(call.event_time)) / 60000;

    if (delay > 30) {
      failures.push({
        type: "delay",
        reason: `Arrival delayed by ${Math.round(delay)} minutes`
      });
    }
  }

  if (rejection) {
    failures.push({
      type: "rejection",
      reason: "Hospital admission was rejected"
    });
  }

  return failures;
}

module.exports = detectFailures;
