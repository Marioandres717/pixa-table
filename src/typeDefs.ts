import "@tanstack/react-table";
import {
  SelectionActionOptions,
  SelectionActionsInstance,
  SelectionActionsTableState,
} from "./features";
import { RowData } from "@tanstack/react-table";

type AlignValue = "left" | "right" | "center";

type ColumnMetaExtras = {
  align?: AlignValue;
  padding?: string | number;
  className?: string;
};
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> extends ColumnMetaExtras {}

  interface TableState extends SelectionActionsTableState {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface TableOptionsResolved<TData extends RowData>
    extends SelectionActionOptions {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Table<TData extends RowData> extends SelectionActionsInstance {}
}
