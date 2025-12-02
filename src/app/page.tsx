"use client";

import { useState, FormEvent } from "react";
import styles from "./page.module.css";

interface Symptom {
  term: string;
  count: number;
}

interface Data {
  drugName: string;
  totalReports: number;
  symptoms: Symptom[];
}

export default function Home() {
  const [drugName, setDrugName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  const searchDrug = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!drugName.trim()) {
      setError("Please enter a drug name");
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/drug-symptoms?drugName=${encodeURIComponent(drugName)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to get data on drug");
      }

      console.log("testingggg that this is working");

      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Drug Symptom Lookup</h1>
        <p className={styles.subtitle}>Search for a medication to see reported adverse events</p>

        <form onSubmit={searchDrug} className={styles.form}>
          <input
            type="text"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            placeholder="Enter drug name (e.g. Aspirin, Ibuprofen)"
            className={styles.input}
          />
          <button
            type="submit"
            disabled={loading}
            className={`${styles.button} ${loading ? styles.buttonDisabled : ""}`}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className={styles.disclaimer}>
          <strong>Note:</strong> These are reported adverse events, not proven side effects. Always
          consult healthcare professionals about medications.
        </div>

        {error && (
          <div className={styles.error}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {data && (
          <div className={styles.results}>
            <div className={styles.header}>
              <h2 className={styles.drugTitle}>{data.drugName}</h2>
              <p className={styles.totalReports}>
                Total Adverse Event Reports: <strong>{data.totalReports.toLocaleString()}</strong>
              </p>
            </div>

            <h2 className={styles.sectionTitle}>Top 20 Reported Symptoms:</h2>

            <div className={styles.symptomsList}>
              {data.symptoms.map((symptom, index) => (
                <div key={index} className={styles.symptomItem}>
                  <div className={styles.symptomRank}>{index + 1}</div>
                  <div className={styles.symptomDetails}>
                    <div className={styles.symptomName}>{symptom.term}</div>
                    <div className={styles.symptomCount}>
                      {symptom.count.toLocaleString()} reports
                    </div>
                  </div>
                  <div className={styles.symptomBar}>
                    <div
                      className={styles.symptomBarFill}
                      style={{ width: `${(symptom.count / data.symptoms[0].count) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!data && !error && !loading && (
          <div className={styles.placeholder}>
            <p>Enter a drug name above to see reported adverse events</p>
          </div>
        )}
      </div>
    </div>
  );
}
