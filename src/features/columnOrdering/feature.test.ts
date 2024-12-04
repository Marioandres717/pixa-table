import { usePixaTable } from "../../hooks";

describe("column ordering feature", () => {
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      columns: [],
      data: [],
    }),
  );

  it("should have column ordering enabled by default", ({ expect }) => {
    expect(config.options.enableColumnOrdering).toBe(true);
  });

  it("should be able to disable column ordering", ({ expect }) => {
    const {
      result: { current: config },
    } = renderHook(() =>
      usePixaTable({
        columns: [],
        data: [],
        enableColumnOrdering: false,
      }),
    );

    expect(config.options.enableColumnOrdering).toBe(false);
  });
});
