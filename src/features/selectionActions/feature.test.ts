import { renderHook } from "@testing-library/react";
import { usePixaTable } from "../../hooks";
import { describe, it } from "vitest";
import { fn } from "@storybook/test";

describe("selection actions feature", () => {
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      columns: [],
      data: [],
      enableSelectionActions: true,
      selectionActions: [
        {
          name: "action 1",
          onAction: fn(),
        },
        {
          name: "action 2",
          onAction: fn(),
        },
      ],
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
    const selectionActions = config.getSelectionActions();
    expect(config.options.enableSelectionActions).toBe(true);
    expect(selectionActions).toEqual([
      {
        name: "action 1",
        onAction: expect.any(Function),
      },
      {
        name: "action 2",
        onAction: expect.any(Function),
      },
    ]);
  });
});
