import { PageSize } from "./pageSize";
import { usePixaTable } from "../hooks";
import { MockData, RenderHookUsePixaTable } from "../mocks/handlers/mockData";

describe("PageSize", () => {
  let hook: RenderHookUsePixaTable;
  beforeEach(() => {
    hook = renderHook(() =>
      usePixaTable({
        data: [] as MockData[],
        columns: mockDataColumnDefs,
      }),
    );
  });

  it("renders correctly with default page options", () => {
    const { getByRole } = render(<PageSize table={hook.result.current} />);
    const listbox = getByRole("listbox");
    expect(listbox).toBeVisible();
    expect(listbox).toHaveValue("10");
    expect(listbox.children).toHaveLength(7);
  });

  it("renders correctly with custom page options", () => {
    const customOptions = [5, 15, 30];
    const { getByRole } = render(
      <PageSize table={hook.result.current} pageOptions={customOptions} />,
    );
    const listbox = getByRole("listbox");
    expect(listbox).toBeVisible();
    expect(listbox).toHaveValue("5");
    expect(listbox.children).toHaveLength(3);
  });

  it("changes page size on selection", () => {
    const { getByRole } = render(<PageSize table={hook.result.current} />);
    const listbox = getByRole("listbox");
    fireEvent.change(listbox, { target: { value: "25" } });
    expect(hook.result.current.getState().pagination.pageSize).toBe(25);
  });

  it("applies custom className", () => {
    const { getByRole } = render(
      <PageSize table={hook.result.current} className="custom-class" />,
    );
    const listbox = getByRole("listbox");
    expect(listbox).toHaveClass("custom-class");
  });
});
