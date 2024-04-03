import { HttpResponse, http } from "msw";

export const handlers = [
  http.get("/api", () => HttpResponse.json({ name: "John DoeFromTheMSW" })),
];
