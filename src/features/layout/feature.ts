import { RowData, TableFeature } from "@tanstack/react-table";

export const LayoutFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      layout: {
        showFooter: true,
        showHeader: true,
        showSidebar: false,
        maxHeight: "fluid",
      },
    };
  },

  createTable(table) {
    table.getLayout = () => ({
      showFooter: table.getShowFooter(),
      showHeader: table.getShowHeader(),
      showSidebar: table.getShowSidebar(),
      maxHeight: table.getMaxHeight(),
    });
    table.getShowFooter = () =>
      typeof table.options.layout.showFooter === "undefined"
        ? true
        : table.options.layout.showFooter;
    table.getShowHeader = () =>
      typeof table.options.layout.showHeader === "undefined"
        ? true
        : table.options.layout.showHeader;
    table.getShowSidebar = () =>
      typeof table.options.layout.showSidebar === "undefined"
        ? false
        : table.options.layout.showSidebar;
    table.getMaxHeight = () =>
      typeof table.options.layout.maxHeight === "undefined"
        ? "fluid"
        : table.options.layout.maxHeight;
  },
};
