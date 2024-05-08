import { HttpResponse, http } from "msw";
import {
  randEmail,
  randAddress,
  randCompanyName,
  randSubscriptionPlan,
  incrementalDate,
  incrementalNumber,
} from "@ngneat/falso";

export type MockData = {
  id: number;
  name: string;
  email: string;
  address: string;
  date: string;
  subscription: string;
};

// create function to generate 100 mock data
function generateMockData(n: number) {
  const data = [];
  const id = incrementalNumber();
  const date = incrementalDate();
  for (let i = 0; i < n; i++) {
    data.push({
      id: id(),
      date: date(),
      name: randCompanyName(),
      email: randEmail(),
      address: randAddress().country,
      subscription: randSubscriptionPlan(),
    });
  }
  return data;
}

export const handlers = [
  http.get("/api", ({ request }) => {
    const url = new URL(request.url);
    const skip = url.searchParams.get("skip") || 0;
    const limit = url.searchParams.get("limit") || 10;
    const response = generateMockData(100).slice(+skip, +skip + +limit);
    return HttpResponse.json(response);
  }),
];
