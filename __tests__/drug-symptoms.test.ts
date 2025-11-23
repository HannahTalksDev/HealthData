import { GET } from "../src/app/api/drug-symptoms/route";
import { NextRequest } from "next/server";

global.fetch = jest.fn();

describe("GET /api/drug-symptoms", () => {
  it("computes total reports correctly from FDA results", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { term: "HEADACHE", count: 100 },
          { term: "NAUSEA", count: 50 },
        ],
      }),
    });

    const request = new NextRequest(new URL("http://localhost/api/drug-symptoms?drugName=Aspirin"));

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.drugName).toBe("Aspirin");
    expect(data.totalReports).toBe(150);
    expect(data.symptoms).toHaveLength(2);
  });
});
