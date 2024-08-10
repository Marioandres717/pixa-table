import { Header, RowData } from "@tanstack/react-table";
import { Icon } from "./icon";

type Props<TData> = {
  header: Header<TData, RowData>;
};
export default function ColumnFilter<TData>({ header }: Props<TData>) {
  if (!header.column.getCanFilter()) {
    return null;
  }
  return (
    <div className="cursor-pointer">
      <Icon icon="filter" size={16} className="fill-black-70" />
    </div>
  );
}
