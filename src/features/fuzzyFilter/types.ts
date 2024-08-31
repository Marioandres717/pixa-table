import { RankingInfo } from "@tanstack/match-sorter-utils";
import { FilterFn } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
