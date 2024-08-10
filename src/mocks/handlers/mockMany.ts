import { createColumnHelper } from "@tanstack/react-table";
import { HttpResponse, http } from "msw";

export type MockDataManyCols = {
  [key: string]: string | number | Date;
};

export function generateMockDataManyCols(cols: number, rows: number) {
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

export const handlerMockDataManyCols = http.get(
  "/api/many-cols",
  ({ request }) => {
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
  },
);

const columnHelper = createColumnHelper<MockDataManyCols>();

export const mockDataManyColumnsDefs = [
  ...Array.from({ length: 22 }).map((_, i) =>
    columnHelper.accessor(`col${i}`, {
      id: `col${i}`,
      header: `Col ${i}`,
      minSize: 50,
      maxSize: 200,
      enableSorting: true,
      enableResizing: true,
    }),
  ),
];
