import { PageSize } from "./pageSize";
import { usePixaTable } from "../hooks";

describe("PageSize", () => {
  it("renders correctly with default page options", () => {
    const { result } = renderHook(() =>
      usePixaTable({ data: [], columns: mockDataColumnDefs }),
    );
    render(<PageSize table={result.current} />);
    const listbox = sc.getByRole("listbox");
    expect(listbox).toBeVisible();
    expect(listbox).toHaveValue("10");
    expect(listbox.children).toHaveLength(7);
  });

  it("renders correctly with custom page options", () => {
    const { result } = renderHook(() =>
      usePixaTable({ data: [], columns: mockDataColumnDefs }),
    );
    const customOptions = [5, 15, 30];
    render(<PageSize table={result.current} pageOptions={customOptions} />);
    const listbox = sc.getByRole("listbox");
    expect(listbox).toBeVisible();
    expect(listbox).toHaveValue("5");
    expect(listbox.children).toHaveLength(3);
  });

  it("changes page size on selection", () => {
    const { result } = renderHook(() =>
      usePixaTable({ data: [], columns: mockDataColumnDefs }),
    );
    render(<PageSize table={result.current} />);
    const listbox = sc.getByRole("listbox");
    fireEvent.change(listbox, { target: { value: "25" } });
    expect(result.current.getState().pagination.pageSize).toBe(25);
  });

  it("applies custom className", () => {
    const { result } = renderHook(() =>
      usePixaTable({ data: [], columns: mockDataColumnDefs }),
    );
    render(<PageSize table={result.current} className="custom-class" />);
    const listbox = sc.getByRole("listbox");
    expect(listbox).toHaveClass("custom-class");
  });
});
