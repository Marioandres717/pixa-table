import { TableToolbar } from "./tableToolbar";
import { usePixaTable } from "../hooks";

describe("TableToolbar", () => {
  it("renders correctly", ({ expect }) => {
    const { result } = renderHook(() =>
      usePixaTable({ data: [], columns: mockDataColumnDefs }),
    );
    render(<TableToolbar table={result.current} />);
    const toolbar = sc.getByRole("toolbar");
    expect(toolbar).toBeVisible();
    expect(toolbar.classList).toContain("bg-surface-overlay");
    expect(toolbar.classList).toContain("dark:bg-surface");
  });

  it("renders correctly when items are selected", ({ expect }) => {
    const { result } = renderHook(() =>
      usePixaTable({
        data: [{ id: 1, name: "John Doe" }],
        columns: mockDataColumnDefs.slice(0, 1),
        initialState: {
          rowSelection: {
            "0": true,
          },
        },
      }),
    );
    render(<TableToolbar table={result.current} />);

    const toolbar = sc.getByRole("toolbar");
    expect(toolbar).toBeVisible();
    expect(toolbar.classList).toContain("!bg-interaction-accent");
  });
});
