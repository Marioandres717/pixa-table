import { Header } from "@tanstack/react-table";
import { Icon } from "./icon";

type Props<TData> = {
  header: Header<TData, unknown>;
};
export default function ColumnFilter<TData>({ header }: Props<TData>) {
  if (!header.column.getCanFilter()) {
    return null;
  }
  return (
    <Icon
      icon="filter"
      color="var(--ml-gray-400)"
      size={16}
      className="cursor-pointer"
    />
  );
}
