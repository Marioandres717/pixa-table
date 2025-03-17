import { PageResults } from "./pageResults";
import { usePixaTable } from "../hooks";
import {
  generateMockData,
  RenderHookUsePixaTable,
} from "../mocks/handlers/mockData";

describe("PageResults", () => {
  let hook: RenderHookUsePixaTable;
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

  it("updates label when pagination changes", async () => {
    await act(async () => hook.result.current.setPageIndex(1));
    render(<PageResults table={hook.result.current} />);
    const status = sc.getByRole("status");
    expect(status).toBeVisible();
    expect(status).toHaveTextContent("11-20 of 30 results");
  });
});
