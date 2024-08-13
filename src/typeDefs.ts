/* eslint-disable @typescript-eslint/no-unused-vars */

import "@tanstack/react-table";
import {
  SelectionActionOptions,
  SelectionActionsInstance,
  SelectionActionsTableState,
} from "./features";
import { RowData } from "@tanstack/react-table";
import {
  RowActionOptions,
  RowActionsInstance,
  RowActionsTableState,
  TableRowActionsInstance,
} from "./features/rowActions/types";
import {
  ThemeInstance,
  ThemeOptions,
  ThemeState,
} from "./features/theme/types";

type AlignValue = "left" | "right" | "center";

type ColumnMetaExtras = {
  align?: AlignValue;
  padding?: string | number;
  className?: string;
};
declare module "@tanstack/react-table" {
  /* COLUMN META */
  interface ColumnMeta<TData, TValue> extends ColumnMetaExtras {}

  /* SELECTION TABLE FEATURE */
  interface TableState extends SelectionActionsTableState {}
  interface TableOptionsResolved<TData extends RowData>
    extends SelectionActionOptions {}
  interface Table<TData extends RowData> extends SelectionActionsInstance {}

  /* ROW ACTIONS TABLE FEATURE */
  interface TableState extends RowActionsTableState {}
  interface TableOptionsResolved<TData extends RowData>
    extends RowActionOptions {}
  interface Table<TData extends RowData> extends RowActionsInstance {}
  interface Row<TData extends RowData> extends TableRowActionsInstance {}

  /* TABLE THEME FEATURE */
  interface TableState extends ThemeState {}
  interface TableOptionsResolved<TData extends RowData> extends ThemeOptions {}
  interface Table<TData extends RowData> extends ThemeInstance {}
}
