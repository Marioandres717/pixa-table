import { usePixaTable } from "../../hooks";

describe("theme feature", () => {
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      columns: [],
      data: [],
    }),
  );

  it("should have dark theme by default", ({ expect }) => {
    expect(config.options.theme).toBe("dark");
    expect(config.getTheme()).toBe("dark");
  });

  it("should be able to switch to light theme", ({ expect }) => {
    config.options.theme = "light";
    expect(config.getTheme()).toBe("light");
  });

  it("should call onThemeChange when calling setTheme", ({ expect }) => {
    const mockOnThemeChange = fn();
    config.options.onThemeChange = mockOnThemeChange;
    config.setTheme("light");
    expect(mockOnThemeChange).toHaveBeenCalled();
    expect(mockOnThemeChange.mock.calls[0][0]("light")).toBe("light");
  });
});
