import {
  randEmail,
  randAddress,
  randCompanyName,
  randSubscriptionPlan,
  incrementalDate,
  incrementalNumber,
  randText,
  seed,
  // randJSON,
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
  longText: string;
  // json: Record<string, unknown>;
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
  columnHelper.accessor("longText", {
    id: "longText",
    header: "Long Text",
  }),
  // columnHelper.accessor("json", {
  //   id: "json",
  //   header: "JSON",
  // }),
];

export function generateMockData(n: number) {
  const data = [];
  const id = incrementalNumber();
  seed("mock-data");
  for (let i = 0; i < n; i++) {
    data.push({
      id: id(),
      date: "9999-99-99T99:99:99.999Z",
      name: randCompanyName(),
      email: randEmail(),
      address: randAddress().country,
      subscription: randSubscriptionPlan(),
      longText: randText({ length: i < 50 ? i : 50 }),
      // json: JSON.stringify(randJSON()),
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
