/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, ColumnDef } from "@tanstack/react-table";

type MockColumnOptions = {
  id?: string;
  getIsPinned?: () => boolean | string;
  columnDef?: Partial<ColumnDef<any, any>>;
};

export function createMockColumn({
  getIsPinned,
  columnDef,
  id,
}: MockColumnOptions): Column<any, any> {
  return {
    id: id || "mock-column-id",
    getIsPinned: fn(getIsPinned),
    columnDef: columnDef || {},
  } as unknown as Column<any, any>;
}
