import { Table, TableOptions, useReactTable } from "@tanstack/react-table";

type Props<TData> = TableOptions<TData> & {
  children: (props: RenderProps<TData>) => JSX.Element;
};

type RenderProps<TData> = Table<TData>;

export default function TableBase<TData>({
  children,
  ...options
}: Props<TData>) {
  const table = useReactTable<TData>(options);

  if (!children || typeof children !== "function") {
    throw new Error("TableBase requires a render function as its child");
  }

  return children({ ...table });
}
