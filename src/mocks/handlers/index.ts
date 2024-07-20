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

export type MockDataManyCols = {
  [key: string]: string | number | Date;
};

function generateMockDataManyCols(cols: number, rows: number) {
  const data: MockDataManyCols[] = [];
  for (let i = 0; i < rows; i++) {
    const row: MockDataManyCols = {};
    for (let j = 0; j < cols; j++) {
      const key = `col${j}`;
      row[key] = `col${j} - ${i}`;
    }
    data.push(row);
  }
  return data;
}

const handlersMockData = http.get("/api", ({ request }) => {
  const url = new URL(request.url);
  const skip = url.searchParams.get("skip") || 0;
  const limit = url.searchParams.get("limit") || 10;
  const fetchSize = url.searchParams.get("fetchSize") || 100;
  const data = generateMockData(+fetchSize).slice(+skip, +skip + +limit);
  return HttpResponse.json(data);
});

const handlerMockDataManyCols = http.get("/api-many-cols", ({ request }) => {
  const url = new URL(request.url);
  const skip = url.searchParams.get("skip") || 0;
  const limit = url.searchParams.get("limit") || 10;
  const cols = url.searchParams.get("cols") || 10;
  const rows = url.searchParams.get("rows") || 10;
  const data = generateMockDataManyCols(+cols, +rows).slice(
    +skip,
    +skip + +limit,
  );
  return HttpResponse.json(data);
});

export const handlers = [handlersMockData, handlerMockDataManyCols];
