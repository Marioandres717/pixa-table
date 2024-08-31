import iconSet from "../assets/icons/selection.json";
import { SortDirection } from "@tanstack/react-table";

type sortIconOptions = {
  sortDirection: SortDirection;
  index: number;
};

export function SortIconBase(options: sortIconOptions) {
  const maxIndex = 8;
  const sortBaseIndex = options.index + 1;

  const sortIconDir = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      options.sortDirection === "asc"
        ? icon.properties.name === "sort-base-asc"
        : icon.properties.name === "sort-base-desc",
  );

  const sortIconCircle = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      icon.properties.name === "sort-base-circle",
  );

  const sortIndex = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      icon.properties.name ===
      `sort-base-index-${sortBaseIndex > maxIndex ? 9 : sortBaseIndex}`,
  );

  const plusIcon = sortingIcons.find(
    (icon: { properties: { name: string } }) =>
      icon.properties.name === `sort-base-index-max`,
  );

  const tailwindFill = "fill-aqua-120 dark:fill-aqua-100";

  return (
    <svg
      width={36}
      height="12"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      {sortIconDir?.icon.paths.map(
        renderPath(sortIconDir.icon as { attrs: unknown[] }, tailwindFill),
      )}
      {sortIconCircle?.icon.paths.map(
        renderPath(
          sortIconCircle.icon as { attrs: unknown[] },
          "stroke-aqua-120 dark:stroke-aqua-100",
        ),
      )}
      {sortIndex?.icon.paths.map(
        renderPath(sortIndex.icon as { attrs: unknown[] }, tailwindFill),
      )}

      {options.index > maxIndex && (
        <>
          {plusIcon?.icon.paths.map(
            renderPath(plusIcon.icon as { attrs: unknown[] }, tailwindFill),
          )}
        </>
      )}
    </svg>
  );
}

const sortingIcons = iconSet.icons.filter(
  (icon: { properties: { name: string } }) =>
    icon.properties.name.search("sort-base") !== -1,
);

const renderPath =
  (iconObj: { attrs: unknown[] }, className?: string) =>
  (path: string, index: number) => {
    const attrs = (iconObj.attrs && iconObj.attrs[index]) || {};
    return <path key={index} d={path} {...attrs} className={className} />;
  };
