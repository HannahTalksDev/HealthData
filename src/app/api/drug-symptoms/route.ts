import { NextRequest, NextResponse } from "next/server";

interface Symptom {
  term: string;
  count: number;
}

interface DrugData {
  drugName: string;
  totalReports: number;
  symptoms: Symptom[];
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const drugName = searchParams.get("drugName");

  if (!drugName) {
    return NextResponse.json({ error: "Drug name is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.fda.gov/drug/event.json?search=patient.drug.medicinalproduct:"${encodeURIComponent(
        drugName,
      )}"&count=patient.reaction.reactionmeddrapt.exact&limit=20`,
    );

    if (!response.ok) {
      throw new Error(`FDA API returned ${response.status}`);
    }

    const data = (await response.json()) as { results?: Symptom[] };

    const symptoms: Symptom[] = Array.isArray(data.results) ? data.results : [];

    const totalReports = symptoms.reduce((sum, s) => sum + (s.count ?? 0), 0);

    const result: DrugData = {
      drugName,
      totalReports,
      symptoms,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching drug data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch drug data. Please check the drug name and try again.",
      },
      { status: 500 },
    );
  }
}
