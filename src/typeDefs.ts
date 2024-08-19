/* eslint-disable @typescript-eslint/no-unused-vars */

import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

import {
  SelectionActionOptions,
  SelectionActionsInstance,
  SelectionActionsTableState,
  RowActionOptions,
  RowActionsInstance,
  RowActionsTableState,
  TableRowActionsInstance,
  ThemeInstance,
  ThemeOptions,
  ThemeState,
  LoadingState,
  PluggableComponentsOptions,
  PluggableComponentsTableInstance,
  PluggableComponentsRowInstance,
  PluggableComponentsHeaderInstance,
  TableLayoutOptions,
  TableLayoutInstance,
} from "./features";

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

  /* TABLE LOADING STATE FEATURE */
  interface TableState extends LoadingState {}

  /* TABLE PLUGGALE COMPONENTS FEATURE */
  interface TableOptionsResolved<TData extends RowData>
    extends PluggableComponentsOptions<TData> {}
  interface Table<TData extends RowData>
    extends PluggableComponentsTableInstance<TData> {}
  interface Row<TData extends RowData>
    extends PluggableComponentsRowInstance<TData> {}
  interface Header<TData extends RowData, TValue>
    extends PluggableComponentsHeaderInstance<TData> {}

  /* TABLE LAYOUT FEATURE */
  interface TableOptionsResolved<TData extends RowData>
    extends TableLayoutOptions {}
  interface Table<TData extends RowData> extends TableLayoutInstance {}
}
