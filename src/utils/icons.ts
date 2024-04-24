/* eslint-disable @typescript-eslint/no-explicit-any */
import iconSet from "../assets/icons/selection.json";

export const getIconList = (iconSet: any) => {
  const list: any[] = [];
  iconSet.icons.forEach((icon: any) => {
    list.push(icon.properties.name.split(", ")[0]);
  });

  return list;
};

export const getIcon = (icon: any) => {
  const find = (iconEl: any) =>
    iconEl.properties.name.split(", ").includes(icon);

  const currentIcon = iconSet.icons.filter(find)[0];
  return currentIcon;
};
