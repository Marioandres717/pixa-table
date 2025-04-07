/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePixaTable } from "../hooks";
import { generateMockData } from "../mocks/handlers/mockData";
import { DefaultToolbar } from "./defaultToolbar";

const PageSize = fn((_table: any) => <span>PageSize</span>);
const Pagination = fn((_table: any) => <span>Pagination</span>);
const ViewOptions = fn((_table: any) => <span>ViewOptions</span>);

describe("DefaultToolbar", () => {
  it("renders correctly", async ({ expect }) => {
    const hook = renderHook(() =>
      usePixaTable({ data: [], columns: mockDataColumnDefs }),
    );
    render(<DefaultToolbar table={hook.result.current} />);
    const pageSize = sc.getByRole("listbox");
    const pageResults = sc.getByRole("status");
    const settings = sc.getByTestId("table-settings-dropdown");
    expect(pageSize).toBeVisible();
    expect(pageResults).toBeVisible();
    expect(settings).toBeVisible();

    const settingsDropdown = within(settings).getByRole("button");
    await act(async () => settingsDropdown.click());
    expect(within(settings).getByRole("dialog")).toBeVisible();
  });

  it("should update the page results after changing the page size", async ({
    expect,
  }) => {
    const hook = renderHook(() =>
      usePixaTable({
        columns: mockDataColumnDefs,
        data: generateMockData(50),
        layout: { showPagination: "top" },
      }),
    );
    const { rerender } = render(<DefaultToolbar table={hook.result.current} />);
    const listbox = sc.getByRole("listbox");

    fireEvent.change(listbox, { target: { value: "25" } });
    rerender(<DefaultToolbar table={hook.result.current} />);

    const pageResults = sc.getByRole("status");
    expect(pageResults).toHaveTextContent(/1-25 of 50 results/i);
  });

  it("should update the page results after changing the page index", ({
    expect,
  }) => {
    const hook = renderHook(() =>
      usePixaTable({
        columns: mockDataColumnDefs,
        data: generateMockData(50),
        layout: { showPagination: "top" },
        pluggableComponents: {},
      }),
    );
    const { rerender } = render(<DefaultToolbar table={hook.result.current} />);
    const pagination = sc.getByTestId("pagination");
    const nextButton = within(pagination).getByTestId("next");
    fireEvent.click(nextButton);
    rerender(<DefaultToolbar table={hook.result.current} />);

    const pageResults = sc.getByRole("status");
    expect(pageResults).toHaveTextContent(/11-20 of 50 results/i);
  });

  describe("Page Size Component", () => {
    it("renders default PageSizeComponent", ({ expect }) => {
      const hook = renderHook(() =>
        usePixaTable({
          columns: mockDataColumnDefs,
          data: [],
          pluggableComponents: {},
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      const pageSizeDropdown = sc.getByRole("listbox");
      expect(pageSizeDropdown).toBeVisible();
    });

    it("renders PageSizeComponent from PluggableComponents option", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          columns: mockDataColumnDefs,
          data: [],
          pluggableComponents: {
            PageSize,
          },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      expect(sc.getByText("PageSize")).toBeInTheDocument();
      const arg = PageSize.mock.calls[0][0];
      expect(arg.table).toEqual(hook.result.current);
    });

    it("does not render PageSizeComponent when showPagination is false", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          columns: mockDataColumnDefs,
          data: [],
          layout: { showPagination: false },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      expect(sc.queryByText("PageSize")).not.toBeInTheDocument();
    });
  });

  describe("Pagination Component", () => {
    it("renders default PaginationComponent when layout.showPagination: 'top' is enabled", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          columns: mockDataColumnDefs,
          data: [],
          pluggableComponents: {},
          layout: { showPagination: "top" },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      const pagination = sc.getByTestId("pagination");
      expect(pagination).toBeVisible();
    });

    it("renders PaginationComponent from PluggableComponents option when layout.showPagination: 'both' is enabled", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          columns: mockDataColumnDefs,
          data: [],
          layout: { showPagination: "both" },
          pluggableComponents: {
            Pagination,
          },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      expect(sc.getByText("Pagination")).toBeInTheDocument();
      const arg = Pagination.mock.calls[0][0];
      expect(arg.table).toEqual(hook.result.current);
    });

    it("does not render PaginationComponent when showPagination is false", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          data: [],
          columns: mockDataColumnDefs,
          layout: { showPagination: false },
          pluggableComponents: {
            Pagination,
          },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      expect(sc.queryByText("Pagination")).not.toBeInTheDocument();
    });
  });

  describe("View Options Component", () => {
    it("renders default ViewOptionsComponent", ({ expect }) => {
      const hook = renderHook(() =>
        usePixaTable({
          data: [],
          columns: mockDataColumnDefs,
          pluggableComponents: {},
          layout: { showViewOptions: true },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      const viewOptions = sc.getByTestId("view-options");
      expect(viewOptions).toBeVisible();
    });

    it("renders ViewOptionsComponent from PluggableComponents option", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          data: [],
          columns: mockDataColumnDefs,
          layout: { showViewOptions: true },
          pluggableComponents: {
            ViewOptions,
          },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      expect(sc.getByText("ViewOptions")).toBeInTheDocument();
      const arg = ViewOptions.mock.calls[0][0];
      expect(arg.table).toEqual(hook.result.current);
    });

    it("does not render ViewOptionsComponent when showViewOptions is false", ({
      expect,
    }) => {
      const hook = renderHook(() =>
        usePixaTable({
          data: [],
          columns: mockDataColumnDefs,
          layout: { showViewOptions: false },
          pluggableComponents: {
            ViewOptions,
          },
        }),
      );
      render(<DefaultToolbar table={hook.result.current} />);
      expect(sc.queryByText("ViewOptions")).not.toBeInTheDocument();
    });
  });
});
