export type TableLayout = {
  showFooter?: boolean;
  showHeader?: boolean;
  showSidebar?: boolean;
};

export interface TableLayoutOptions {
  layout: TableLayout;
}

export interface TableLayoutInstance {
  getLayout(): TableLayout;
  getShowFooter(): boolean;
  getShowHeader(): boolean;
  getShowSidebar(): boolean;
}
