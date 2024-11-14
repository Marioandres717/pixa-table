export type Layout = {
  showFooter?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
  maxHeight?: number | "fluid";
  showPagination?: "top" | "bottom" | "both" | false;
  showTotalResults?: boolean;
  rowHeight?: number | "dynamic";
  expandableRowHeight?: number;
  enableVirtualization?: boolean;
  showViewOptions?: boolean;
  scrollableContainerRef?: React.RefObject<HTMLDivElement> | null;
  scrollMargin?: number;
};

export interface LayoutOptions {
  layout: Layout;
}

export interface LayoutInstance {
  getLayout(): Layout;
  getShowFooter(): boolean;
  getShowHeader(): boolean;
  getShowSidebar(): boolean;
  getMaxHeight(): number | "fluid";
  getShowPagination(): "top" | "bottom" | "both" | false;
  getShowTotalResults(): boolean;
  getRowHeight(): number | "dynamic";
  getExpandableRowHeight(): number;
  getEnableVirtualization(): boolean;
  getShowViewOptions(): boolean;
  getScrollableContainerRef(): React.RefObject<HTMLDivElement> | null;
  getScrollMargin(): number;
}
