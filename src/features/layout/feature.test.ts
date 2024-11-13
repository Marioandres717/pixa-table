import { usePixaTable } from "../../hooks";

describe("layout feature", () => {
  const {
    result: { current: config },
  } = renderHook(() =>
    usePixaTable({
      columns: [],
      data: [],
    }),
  );

  it("should have default layout options", ({ expect }) => {
    const layout = config.getLayout();
    expect(layout.showFooter).toBe(true);
    expect(layout.showHeader).toBe(true);
    expect(layout.showSidebar).toBe(false);
    expect(layout.maxHeight).toBe("fluid");
    expect(layout.showPagination).toBe("bottom");
    expect(layout.showTotalResults).toBe(true);
    expect(layout.rowHeight).toBe(36);
    expect(layout.expandableRowHeight).toBe(100);
    expect(layout.enableVirtualization).toBe(true);
    expect(layout.showViewOptions).toBe(false);
  });

  it("should allow overriding layout options", ({ expect }) => {
    config.options.layout.showFooter = false;
    config.options.layout.rowHeight = 50;
    config.options.layout.showHeader = false;
    config.options.layout.showSidebar = true;
    config.options.layout.maxHeight = 333;
    config.options.layout.showPagination = "both";
    config.options.layout.showTotalResults = false;
    config.options.layout.expandableRowHeight = 200;
    config.options.layout.enableVirtualization = false;
    config.options.layout.showViewOptions = true;

    const layout = config.getLayout();
    expect(layout.showFooter).toBe(false);
    expect(layout.rowHeight).toBe(50);
    expect(layout.showHeader).toBe(false);
    expect(layout.showSidebar).toBe(true);
    expect(layout.maxHeight).toBe(333);
    expect(layout.showPagination).toBe("both");
    expect(layout.showTotalResults).toBe(false);
    expect(layout.expandableRowHeight).toBe(200);
    expect(layout.enableVirtualization).toBe(false);
    expect(layout.showViewOptions).toBe(true);
  });

  it("get default values if set to undefined", ({ expect }) => {
    config.options.layout.showFooter = undefined;
    config.options.layout.rowHeight = undefined;
    config.options.layout.showHeader = undefined;
    config.options.layout.showSidebar = undefined;
    config.options.layout.maxHeight = undefined;
    config.options.layout.showPagination = undefined;
    config.options.layout.showTotalResults = undefined;
    config.options.layout.expandableRowHeight = undefined;
    config.options.layout.enableVirtualization = undefined;
    config.options.layout.showViewOptions = undefined;

    const layout = config.getLayout();
    expect(layout.showFooter).toBe(true);
    expect(layout.rowHeight).toBe(36);
    expect(layout.showHeader).toBe(true);
    expect(layout.showSidebar).toBe(false);
    expect(layout.maxHeight).toBe("fluid");
    expect(layout.showPagination).toBe("bottom");
    expect(layout.showTotalResults).toBe(true);
    expect(layout.expandableRowHeight).toBe(100);
    expect(layout.enableVirtualization).toBe(true);
    expect(layout.showViewOptions).toBe(false);
  });
});
