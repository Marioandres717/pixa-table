import { RowData, TableFeature } from "@tanstack/react-table";

export const LayoutFeature: TableFeature<RowData> = {
  getDefaultOptions() {
    return {
      layout: {
        showFooter: true,
        showHeader: true,
        showSidebar: false,
        maxHeight: "fluid",
        showPagination: "bottom",
        showTotalResults: true,
        rowHeight: 36,
        expandableRowHeight: 100,
        enableVirtualization: true,
        showViewOptions: false,
        scrollableContainerRef: null,
        scrollMargin: 0,
        showTitle: false,
      },
    };
  },

  createTable(table) {
    table.getLayout = () => ({
      showFooter: table.getShowFooter(),
      showHeader: table.getShowHeader(),
      showSidebar: table.getShowSidebar(),
      maxHeight: table.getMaxHeight(),
      showPagination: table.getShowPagination(),
      showTotalResults: table.getShowTotalResults(),
      rowHeight: table.getRowHeight(),
      expandableRowHeight: table.getExpandableRowHeight(),
      enableVirtualization: table.getEnableVirtualization(),
      showViewOptions: table.getShowViewOptions(),
      scrollableContainerRef: table.getScrollableContainerRef(),
      scrollMargin: table.getScrollMargin(),
      showTitle: table.getShowTitle(),
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
    table.getShowPagination = () =>
      typeof table.options.layout.showPagination === "undefined"
        ? "bottom"
        : table.options.layout.showPagination;
    table.getShowTotalResults = () =>
      typeof table.options.layout.showTotalResults === "undefined"
        ? true
        : table.options.layout.showTotalResults;
    table.getRowHeight = () =>
      typeof table.options.layout.rowHeight === "undefined"
        ? 36
        : table.options.layout.rowHeight;
    table.getExpandableRowHeight = () =>
      typeof table.options.layout.expandableRowHeight === "undefined"
        ? 100
        : table.options.layout.expandableRowHeight;
    table.getEnableVirtualization = () =>
      typeof table.options.layout.enableVirtualization === "undefined"
        ? true
        : table.options.layout.enableVirtualization;
    table.getShowViewOptions = () =>
      typeof table.options.layout.showViewOptions === "undefined"
        ? false
        : table.options.layout.showViewOptions;
    table.getScrollableContainerRef = () =>
      typeof table.options.layout.scrollableContainerRef === "undefined"
        ? null
        : table.options.layout.scrollableContainerRef;
    table.getScrollMargin = () =>
      typeof table.options.layout.scrollMargin === "undefined"
        ? 0
        : table.options.layout.scrollMargin;
    table.getShowTitle = () => {
      if (table.options.enableTableActions) return true;
      if (typeof table.options.layout.showTitle === "undefined") {
        return false;
      } else {
        return table.options.layout.showTitle;
      }
    };
  },
};
