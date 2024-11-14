import { RowData, TableFeature } from "@tanstack/react-table";

export const PluggableComponentsFeature: TableFeature<RowData> = {
  createTable(table) {
    table.getPluggableComponents = () =>
      table.options.pluggableComponents || {};

    table.getPageSizeComponent = () => table.getPluggableComponents().PageSize;

    table.getPaginationComponent = () =>
      table.getPluggableComponents().Pagination;

    table.getViewOptionsComponent = () =>
      table.getPluggableComponents().ViewOptions;
  },
  createHeader(header, table) {
    header.getHeaderFilterComponent = () =>
      table.getPluggableComponents().HeaderFilter;
  },
  createRow(row, table) {
    row.getExpandableRowComponent = () =>
      table.getPluggableComponents().ExpandableRow;
  },
};
