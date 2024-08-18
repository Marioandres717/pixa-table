import { RowData, TableFeature } from "@tanstack/react-table";

export const PluggableComponentsFeature: TableFeature<RowData> = {
  createTable(table) {
    table.getPluggableComponents = () =>
      table.options.pluggableComponents || {};
    table.getPageSize = () => table.getPluggableComponents().PageSize;
    table.getPagination = () => table.getPluggableComponents().Pagination;
  },
  createHeader(header, table) {
    header.getHeaderFilter = () => table.getPluggableComponents().HeaderFilter;
  },
  createRow(row, table) {
    row.getExpandableRow = () => table.getPluggableComponents().ExpandableRow;
  },
};
