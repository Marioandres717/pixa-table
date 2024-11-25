import { usePixaTable } from "../../hooks";

describe("setup", () => {
  const columns = [
    { id: "name", accessorKey: "name" },
    { id: "age", accessorKey: "age" },
    { id: "email", accessorKey: "email" },
  ];

  const data = [
    { name: "John", age: 30, email: "" },
    { name: "Jane", age: 25, email: "" },
    { name: "Doe", age: 40, email: "" },
  ];
  const rowActions = [
    {
      name: "action 1",
      Component: fn(),
      onAction: fn(),
    },
    {
      name: "action 2",
      Component: fn(),
      onAction: fn(),
    },
  ];
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      enableRowActions: true,
      rowActions,
      columns,
      data,
    }),
  );

  it("should have row actions disabled by default", ({ expect }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        columns: [],
        data: [],
      }),
    );

    expect(config.options.enableRowActions).toBe(false);
  });

  it("should have row actions enabled", ({ expect }) => {
    expect(config.options.enableRowActions).toBe(true);
    expect(config.getRowModel().rows[0].getRowActions()).toEqual(rowActions);
  });

  it("should return empty row actions if enableRowActions option is disabled", ({
    expect,
  }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        enableRowActions: false,
        rowActions,
        columns,
        data,
      }),
    );

    expect(config.getRowModel().rows[0].getRowActions()).toEqual([]);
  });
});
