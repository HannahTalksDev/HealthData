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

interface FdaEventResponse {
  results?: Symptom[];
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const drugName = searchParams.get("drugName");

  if (!drugName) {
    return NextResponse.json({ error: "Drug name is required" }, { status: 400 });
  }

  try {
    const query = new URLSearchParams({
      search: `patient.drug.medicinalproduct:"${drugName}"`,
      count: "patient.reaction.reactionmeddrapt.exact",
      limit: "20",
    });

    const response = await fetch(`https://api.fda.gov/drug/event.json?${query.toString()}`);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const fdaData: FdaEventResponse = await response.json();

    const symptoms: Symptom[] = Array.isArray(fdaData.results) ? fdaData.results : [];

    const totalReports = symptoms.reduce((sum, symptom) => sum + symptom.count, 0);

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
