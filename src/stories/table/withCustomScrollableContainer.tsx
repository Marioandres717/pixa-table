import { Table } from "@tanstack/react-table";
import { usePixaTable } from "../../hooks";
import { Story, UsePixaTableOptions } from "./pixaTable.stories";
import { MockData, MockDataColumnDefs } from "../../mocks/handlers/mockData";
import { useMemo, useState } from "react";
import React from "react";

export const TableWithCustomScrollableContainer: Story = {
  loaders: [
    async () => {
      const response = await fetch(
        "/api/mock-data?skip=" + 0 + "&limit=" + 1000 + "&fetchSize=" + 1000,
      );
      const data = await response.json();
      return { data };
    },
  ],
  decorators: [
    (Story, context) => {
      const [tab, setTab] = useState<"table" | "text">("table");
      const ref = React.useRef<HTMLDivElement>(null);
      const config = useMemo<UsePixaTableOptions>(
        () => ({
          data: context.loaded.data,
          columns: MockDataColumnDefs,
          theme: context.globals.theme,
          layout: {
            scrollableContainerRef: ref,
            scrollMargin: 250,
            rowHeight: "dynamic",
          },
          initialState: {
            pagination: {
              pageSize: 250,
            },
          },
        }),
        [context.loaded.data, context.globals.theme, ref],
      );

      const table = usePixaTable<MockData>(config);

      return (
        <div ref={ref} className="h-screen w-full overflow-auto bg-black-40">
          <div className="size-40 text-7xl font-bold uppercase">
            scrollable container
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-blue-500 px-4 py-2 text-white"
              onClick={() => setTab("table")}
            >
              Table
            </button>
            <button
              className="bg-blue-500 px-4 py-2 text-white"
              onClick={() => setTab("text")}
            >
              Text
            </button>
          </div>
          {tab === "table" && (
            <Story
              args={{
                ...context.args,
                table: table as Table<unknown>,
              }}
            />
          )}
          {tab === "text" && <div>text</div>}
        </div>
      );
    },
  ],
};
