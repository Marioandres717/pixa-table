import { Table } from "@tanstack/react-table";

// eslint-disable-next-line
type RowData = any;

export type PluggableComponents = {
  PageSize?: React.ComponentType<{ table: Table<RowData> }>;
  Pagination?: React.ComponentType<{ table: Table<RowData> }>;
};

export interface PluggableComponentsOptions {
  pluggableComponents?: PluggableComponents;
}

export interface PluggableComponentsInstance {
  getPluggableComponents: () => PluggableComponents;
  //   setPluggableComponents: (components: PluggableComponents) => void;
}
