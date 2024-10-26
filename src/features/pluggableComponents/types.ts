import { Table, Header, Row } from "@tanstack/react-table";

export type PluggableComponents<TData> = {
  PageSize?: React.ComponentType<{ table: Table<TData> }>;
  ExpandableRow?: React.ComponentType<{ row: Row<TData> }>;
  Pagination?: React.ComponentType<{ table: Table<TData> }>;
  ViewOptions?: React.ComponentType<{ table: Table<TData> }>;
  HeaderFilter?: React.ComponentType<{ header: Header<TData, unknown> }>;
};

export interface PluggableComponentsOptions<TData> {
  pluggableComponents?: PluggableComponents<TData>;
}

export interface PluggableComponentsTableInstance<TData> {
  getPluggableComponents: () => PluggableComponents<TData>;
  getPageSizeComponent: () => PluggableComponents<TData>["PageSize"];
  getPaginationComponent: () => PluggableComponents<TData>["Pagination"];
  getViewOptionsComponent: () => PluggableComponents<TData>["ViewOptions"];
}

export interface PluggableComponentsHeaderInstance<TData> {
  getHeaderFilterComponent: () => PluggableComponents<TData>["HeaderFilter"];
}

export interface PluggableComponentsRowInstance<TData> {
  getExpandableRowComponent: () => PluggableComponents<TData>["ExpandableRow"];
}
