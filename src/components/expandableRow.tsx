import Icon from "./icon";
import "./expandableRow.css";

type Props = {
  isExpanded: boolean;
  toggleExpanded: () => void;
};

export default function ExpandableRow({ isExpanded, toggleExpanded }: Props) {
  return (
    <span className="expandableRowIcon" onClick={toggleExpanded}>
      <Icon
        icon="arrow"
        size="15px"
        color="transparent"
        className={isExpanded ? "arrowRight arrowDown" : "arrowRight"}
      />
    </span>
  );
}
