import { Table, TableOptions, useReactTable } from "@tanstack/react-table";
import { DEFAULT_TABLE_CONFIG } from "../main";

type Props<TData> = {
  children: (props: RenderProps<TData>) => JSX.Element;
  options: TableOptions<TData>;
};

type RenderProps<TData> = Table<TData>;

export function TableBase<TData>({
  children,
  options = DEFAULT_TABLE_CONFIG,
}: Props<TData>) {
  const table = useReactTable<TData>(options);

  if (!children || typeof children !== "function") {
    throw new Error("TableBase requires a render function as its child");
  }

  return children({ ...table });
}
