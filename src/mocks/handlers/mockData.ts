import {
  randEmail,
  randAddress,
  randCompanyName,
  randSubscriptionPlan,
  incrementalDate,
  incrementalNumber,
} from "@ngneat/falso";
import { createColumnHelper } from "@tanstack/react-table";
import { http, HttpResponse } from "msw";

export type MockData = {
  id: number;
  name: string;
  email: string;
  address: string;
  date: string;
  subscription: string;
};

const columnHelper = createColumnHelper<MockData>();

export const MockDataColumnDefs = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
  }),
  columnHelper.accessor("address", {
    id: "address",
    header: "Address",
  }),
  columnHelper.accessor("date", {
    id: "date",
    header: "Date",
  }),
  columnHelper.accessor("subscription", {
    id: "subscription",
    header: "Subscription",
  }),
];

export function generateMockData(n: number) {
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

export const handlerMockData = http.get("/api/mock-data", ({ request }) => {
  const url = new URL(request.url);
  const skip = url.searchParams.get("skip") || 0;
  const limit = url.searchParams.get("limit") || 10;
  const fetchSize = url.searchParams.get("fetchSize") || 100;
  const data = generateMockData(+fetchSize).slice(+skip, +skip + +limit);
  return HttpResponse.json(data, {
    status: 200,
  });
});