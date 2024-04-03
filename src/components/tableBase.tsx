import { Table, TableOptions, useReactTable } from "@tanstack/react-table";

type Props<T> = TableOptions<T> & {
  children: (props: RenderProps<T>) => JSX.Element;
};

type RenderProps<T> = Table<T>;

export default function TableBase<T>({ children, ...options }: Props<T>) {
  const table = useReactTable<T>(options);

  if (!children || typeof children !== "function") {
    throw new Error("TableBase requires a render function as its child");
  }

  return children({ ...table });
}
