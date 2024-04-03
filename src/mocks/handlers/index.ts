import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api", () =>
    HttpResponse.json([
      {
        name: "Anomali 1",
        company: "Anomali",
        location: "Redwood City, CA",
        date: "2021-01-01",
      },
      {
        name: "Anomali 2",
        company: "Anomali",
        location: "Redwood City, CA",
        date: "2021-01-01",
      },
      {
        name: "Anomali 3",
        company: "Anomali",
        location: "Redwood City, CA",
        date: "2021-01-01",
      },
      {
        name: "Anomali 4",
        company: "Anomali",
        location: "Redwood City, CA",
        date: "2021-01-01",
      },
      {
        name: "Anomali 5",
        company: "Anomali",
        location: "Redwood City, CA",
        date: "2021-01-01",
      },
    ])
  ),
];
