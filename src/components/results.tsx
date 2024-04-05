// CSS
import "./pagination.css";

const PageResults = ({ totalItems, approximateCount }: Props) => {
  return totalItems ? (
    <div className="results">
      {totalItems}
      {approximateCount && "+"} Results
    </div>
  ) : null;
};

type Props = {
  totalItems: number;
  approximateCount: boolean;
};

export default PageResults;
