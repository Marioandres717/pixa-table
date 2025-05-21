import { Icon } from "./icon";

type Props = {
  isExpanded: boolean;
  toggleExpanded: () => void;
};

export function ExpandableColumn({ isExpanded, toggleExpanded }: Props) {
  return (
    <span className="cursor-pointer" onClick={toggleExpanded}>
      <Icon
        icon="arrow-new"
        size="12px"
        className={`fill-interaction-accent ${isExpanded && "rotate-90"}`}
      />
    </span>
  );
}
