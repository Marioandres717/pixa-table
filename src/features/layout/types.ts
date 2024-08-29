export type TableLayout = {
  showFooter?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
  maxHeight?: number | "fluid";
  showPagination?: "top" | "bottom" | "both" | false;
  showTotalResults?: boolean;
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
}
