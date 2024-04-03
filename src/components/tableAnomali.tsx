import { Table } from "@tanstack/react-table";

export type AnomaliData = {
  name: string;
};

type Props = Table<AnomaliData>;

export default function TableAnomali(table: Props) {
  console.log(table);
  if (!table) {
    throw new Error("TableAnomali requires a table object");
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John</td>
        </tr>
      </tbody>
    </table>
  );
}
