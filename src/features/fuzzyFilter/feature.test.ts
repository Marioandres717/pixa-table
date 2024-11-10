import { describe, it } from "vitest";
import { fuzzyFilter } from "./feature";
import { renderHook } from "@testing-library/react";
import { usePixaTable } from "../../hooks";
import { fn } from "@storybook/test";

describe("fuzzyFilter feature", () => {
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      columns: [
        { id: "name", accessorKey: "name" },
        { id: "age", accessorKey: "age" },
        { id: "email", accessorKey: "email" },
      ],
      data: [
        { name: "John", age: 30, email: "" },
        { name: "Jane", age: 25, email: "" },
        { name: "Doe", age: 40, email: "" },
      ],
    }),
  );

  const mockAddMeta = fn();

  it("should filter in items that match the value", ({ expect }) => {
    const rows = config.getRowModel().rows;
    const result = fuzzyFilter(rows[0], "name", "John", mockAddMeta);
    expect(result).toBe(true);
  });

  it("should filter out items that do not match the value", ({ expect }) => {
    const rows = config.getRowModel().rows;
    const result = fuzzyFilter(rows[0], "name", "Jane", mockAddMeta);
    expect(result).toBe(false);
  });

  it("should add itemRank meta information", ({ expect }) => {
    const rows = config.getRowModel().rows;
    fuzzyFilter(rows[0], "name", "John", mockAddMeta);
    expect(mockAddMeta).toHaveBeenCalled();
    const columnMeta = mockAddMeta.mock.calls[0][0];
    expect(columnMeta.itemRank).toBeDefined();
    const { itemRank } = columnMeta;
    expect(itemRank.passed).toBe(true);
    expect(itemRank.rank).toBeGreaterThan(0);
    expect(itemRank.rankedValue).toBe("John");
  });
});
