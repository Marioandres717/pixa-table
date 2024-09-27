export type TableLayout = {
  showFooter?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
  maxHeight?: number | "fluid";
  showPagination?: "top" | "bottom" | "both" | false;
  showTotalResults?: boolean;
  rowHeight?: number | "dynamic";
  expandableRowHeight?: number;
  enableVirtualization?: boolean;
};

export interface TableLayoutOptions {
  layout: TableLayout;
}

export interface TableLayoutInstance {
  getLayout(): TableLayout;
  getShowFooter(): boolean;
  getShowHeader(): boolean;
  getShowSidebar(): boolean;
  getMaxHeight(): number | "fluid";
  getShowPagination(): "top" | "bottom" | "both" | false;
  getShowTotalResults(): boolean;
  getRowHeight(): number | "dynamic";
  getExpandableRowHeight(): number;
  getEnableVirtualization(): boolean;
}
