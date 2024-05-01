import "@tanstack/react-table";

type AlignValue = "left" | "right" | "center";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    align: AlignValue;
  }
}
