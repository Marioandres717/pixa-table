import { usePixaTable } from "../../hooks";

describe("table actions feature", () => {
  const tableActions = [
    {
      name: "action 1",
      onAction: fn(),
    },
    {
      name: "action 2",
      onAction: fn(),
    },
  ];

  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      columns: [],
      data: [],
      enableTableActions: true,
      tableActions: tableActions,
    }),
  );

  it("should have table actions disabled by default", ({ expect }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        columns: [],
        data: [],
      }),
    );

    expect(config.options.enableTableActions).toBe(false);
    expect(config.getTableActions()).toEqual([]);
  });

  it("should be able to get table actions", ({ expect }) => {
    expect(config.options.enableTableActions).toBe(true);
    expect(config.getTableActions()).toEqual(tableActions);
  });

  it("should return empty table actions if enableTableActions option is disabled", ({
    expect,
  }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        enableTableActions: false,
        tableActions,
        columns: [],
        data: [],
      }),
    );

    expect(config.getTableActions()).toEqual([]);
  });
});
