import { usePixaTable } from "../../hooks";

describe("setup", () => {
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      enableRowActions: true,
      rowActions: [
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
      ],
      columns: [
        { id: "name", accessorKey: "name" },
        { id: "age", accessorKey: "age" },
        { id: "email", accessorKey: "email" },
      ],
      data: [
        { name: "John", age: 30, email: "" },
        { name: "Jane", age: 25, email: "" },
        { name: "Doe", age: 40, email: "" },
      ],
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
    expect(config.getRowModel().rows[0].getRowActions()).toEqual([
      {
        Component: expect.any(Function),
        onAction: expect.any(Function),
        name: "action 1",
      },
      {
        Component: expect.any(Function),
        onAction: expect.any(Function),
        name: "action 2",
      },
    ]);
  });
});
