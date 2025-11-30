"use client";

import { useState } from "react";

interface Symptom {
  term: string;
  count: number;
}

interface DrugData {
  drugName: string;
  totalReports: number;
  symptoms: Symptom[];
}

export function SymptomThresholdPercent({ data }: { data: DrugData }) {
  const [threshold, setThreshold] = useState<string>("");

  const numericThreshold = Number(threshold);
  const totalSymptoms = data.symptoms.length;
  const hasThreshold = threshold.trim() !== "";

  const symptomsAboveThreshold = hasThreshold
    ? data.symptoms.filter((symptom) => symptom.count >= numericThreshold)
    : [];

  const percentAboveThreshold =
    hasThreshold && totalSymptoms > 0
      ? Math.round((symptomsAboveThreshold.length / totalSymptoms) * 100)
      : 0;

  const hasResults = symptomsAboveThreshold.length > 0;

  return (
    <section
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        marginTop: "24px",
        borderRadius: "8px",
        width: "600px",
        color: "black",
      }}
    >
      <h3 style={{ margin: "0 0 12px" }}>
        Percentage of all reports occurring more than {threshold || "…"} times
      </h3>

      <input
        type="number"
        placeholder="Enter a threshold"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        style={{ padding: "6px 10px", marginBottom: "12px", width: "200px" }}
      />

      {hasThreshold && (
        <p style={{ margin: "0 0 8px" }}>
          <strong>{percentAboveThreshold}%</strong> of all reports occur more than {threshold}{" "}
          times.
        </p>
      )}

      {hasResults && (
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          {symptomsAboveThreshold.map((symptom) => (
            <li key={symptom.term}>{symptom.term}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
