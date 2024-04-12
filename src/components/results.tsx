import "./pagination.css";

type Props = {
  totalItems: number;
  approximateCount: boolean;
};

export default function PageResults({ totalItems, approximateCount }: Props) {
  return totalItems ? (
    <div className="results">
      {totalItems}
      {approximateCount && "+"} Results
    </div>
  ) : null;
}
