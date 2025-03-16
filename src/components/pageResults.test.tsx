import { PageResults } from "./pageResults";
import { usePixaTable } from "../hooks";
import { generateMockData, MockData } from "../mocks/handlers/mockData";

type HookReturnType = ReturnType<typeof usePixaTable<MockData>>;

describe("PageResults", () => {
  let hook: ReturnType<typeof renderHook<HookReturnType, unknown>>;
  beforeEach(() => {
    hook = renderHook(() =>
      usePixaTable({
        data: generateMockData(30),
        columns: mockDataColumnDefs,
      }),
    );
  });

  it("renders correctly with pagination", () => {
    const { getByRole } = render(<PageResults table={hook.result.current} />);
    const status = getByRole("status");
    expect(status).toBeVisible();
    expect(status).toHaveTextContent("1-10 of 30 results");
  });

  it("renders correctly without pagination", () => {
    const { result } = renderHook(() =>
      usePixaTable({
        data: generateMockData(30),
        columns: mockDataColumnDefs,
        layout: {
          showPagination: false,
        },
      }),
    );
    const { getByRole } = render(<PageResults table={result.current} />);
    const status = getByRole("status");
    expect(status).toBeVisible();
    expect(status).toHaveTextContent("30 results");
  });

  it("renders correctly with custom className", () => {
    const { getByRole } = render(
      <PageResults table={hook.result.current} className="custom-class" />,
    );
    const status = getByRole("status");
    expect(status).toBeVisible();
    expect(status).toHaveClass("custom-class");
  });

  it("updates label when pagination changes", () => {
    hook.result.current.setPageIndex(1);
    hook.rerender();
    const { getByRole } = render(<PageResults table={hook.result.current} />);
    const status = getByRole("status");
    expect(status).toBeVisible();
    expect(status).toHaveTextContent("11-20 of 30 results");
  });
});
