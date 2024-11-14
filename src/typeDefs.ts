/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type */

import "@tanstack/react-table";
import { RowData } from "@tanstack/react-table";

import {
  SelectionActionOptions,
  SelectionActionsInstance,
  RowActionOptions,
  TableRowActionsInstance,
  ThemeInstance,
  ThemeOptions,
  ThemeState,
  LoadingState,
  LoadingOptions,
  PluggableComponentsOptions,
  PluggableComponentsTableInstance,
  PluggableComponentsRowInstance,
  PluggableComponentsHeaderInstance,
  LayoutOptions,
  LayoutInstance,
} from "./features";

type ColumnMetaExtras = {
  headerClassName?: string;
  className?: string;
};

interface ColumnSizingColumnDefWithGrow {
  grow?: boolean;
}

declare module "@tanstack/react-table" {
  /* COLUMN META */
  interface ColumnMeta<TData, TValue> extends ColumnMetaExtras {}

  /* SELECTION TABLE FEATURE */
  interface TableOptionsResolved<TData extends RowData>
    extends SelectionActionOptions {}
  interface Table<TData extends RowData> extends SelectionActionsInstance {}

  /* ROW ACTIONS TABLE FEATURE */
  interface TableOptionsResolved<TData extends RowData>
    extends RowActionOptions {}
  interface Row<TData extends RowData> extends TableRowActionsInstance {}

  /* TABLE THEME FEATURE */
  interface TableState extends ThemeState {}
  interface TableOptionsResolved<TData extends RowData> extends ThemeOptions {}
  interface Table<TData extends RowData> extends ThemeInstance {}

  /* TABLE LOADING STATE FEATURE */
  interface TableState extends LoadingState {}
  interface TableOptionsResolved<TData extends RowData>
    extends LoadingOptions {}

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
  interface TableOptionsResolved<TData extends RowData> extends LayoutOptions {}
  interface Table<TData extends RowData> extends LayoutInstance {}

  /* COLUMN GROW */
  interface ColumnSizingColumnDef extends ColumnSizingColumnDefWithGrow {}
}
