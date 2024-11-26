import { usePixaTable } from "../../hooks";

describe("selection actions feature", () => {
  const selectionActions = [
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
      enableSelectionActions: true,
      selectionActions,
    }),
  );

  it("should have selection actions disabled by default", ({ expect }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        columns: [],
        data: [],
      }),
    );

    expect(config.options.enableSelectionActions).toBe(false);
    expect(config.getSelectionActions()).toEqual([]);
  });

  it("should be able to get selection actions", ({ expect }) => {
    expect(config.options.enableSelectionActions).toBe(true);
    expect(config.getSelectionActions()).toEqual(selectionActions);
  });

  it("should return empty row actions if enableRowActions option is disabled", ({
    expect,
  }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        enableSelectionActions: false,
        selectionActions,
        columns: [],
        data: [],
      }),
    );

    expect(config.getSelectionActions()).toEqual([]);
  });
});
