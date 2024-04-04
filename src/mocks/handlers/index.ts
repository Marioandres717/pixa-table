import { HttpResponse, http } from "msw";

// create function to generate 100 mock data
function generateMockData(n: number) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push({
      name: `Anomali ${i + 1}`,
      company: "Anomali",
      location: "Redwood City, CA",
      date: "2021-01-01",
    });
  }
  return data;
}

export const handlers = [
  http.get("/api", () => HttpResponse.json([...generateMockData(100)])),
];
