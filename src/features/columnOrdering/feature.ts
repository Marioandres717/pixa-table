import { RowData, TableFeature } from "@tanstack/react-table";

export const ColumnOrderingFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      enableColumnOrdering: true,
    };
  },
};
