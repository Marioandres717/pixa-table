import { Column, SortDirection } from "@tanstack/react-table";

import iconSet from "../assets/icons/selection.json";
import styles from "./columnSort.module.css";
import { Icon } from "./icon";

const sortingIcons = iconSet.icons.filter(
  (icon: { properties: { name: string } }) =>
    icon.properties.name.search("sort-base") !== -1
);

export function getSortIcon<TData>(column: Column<TData, unknown>) {
  const colSortIndex = column.getSortIndex();
  const colSortDir = column.getIsSorted();

  if (!colSortDir)
    return (
      <Icon
        icon={"sort-asc"}
        color={"var(--ml-gray-400)"}
        className={styles["sort-icon"]}
      />
    );
  return SortIconBase({ sortDirection: colSortDir, index: colSortIndex });
}

type sortIconOptions = {
  sortDirection: SortDirection;
  index: number;
};

const renderPath =
  (iconObj: { attrs: unknown[] }) => (path: string, index: number) => {
    const attrs = (iconObj.attrs && iconObj.attrs[index]) || {};
    return <path key={index} d={path} {...attrs} />;
  };

function SortIconBase(options: sortIconOptions) {
  const sortIconDir = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      options.sortDirection === "asc"
        ? icon.properties.name === "sort-base-asc"
        : icon.properties.name === "sort-base-desc"
  );

  const sortIconCircle = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      icon.properties.name === "sort-base-circle"
  );

  const sortIndex = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      icon.properties.name === `sort-base-index-${options.index + 1}`
  );

  const plusIcon = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      icon.properties.name === `sort-base-index-max`
  );

  return (
    <svg
      width={36}
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {sortIconDir?.icon.paths.map(
        renderPath(sortIconDir.icon as { attrs: unknown[] })
      )}
      {sortIconCircle?.icon.paths.map(
        renderPath(sortIconCircle.icon as { attrs: unknown[] })
      )}
      {sortIndex?.icon.paths.map(
        renderPath(sortIndex.icon as { attrs: unknown[] })
      )}

      {options.index > 2 && (
        <>
          {plusIcon?.icon.paths.map(
            renderPath(plusIcon.icon as { attrs: unknown[] })
          )}
        </>
      )}
    </svg>
  );
}
