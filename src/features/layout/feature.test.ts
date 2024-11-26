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
    expect(layout).toMatchInlineSnapshot(`
      {
        "enableVirtualization": true,
        "expandableRowHeight": 100,
        "maxHeight": "fluid",
        "rowHeight": 36,
        "scrollMargin": 0,
        "scrollableContainerRef": null,
        "showFooter": true,
        "showHeader": true,
        "showPagination": "bottom",
        "showSidebar": false,
        "showTitle": false,
        "showTotalResults": true,
        "showViewOptions": false,
      }
    `);
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
    config.options.layout.scrollableContainerRef = {
      current: document.createElement("div"),
    };
    config.options.layout.scrollMargin = 20;
    config.options.layout.showTitle = "My Table";
    const layout = config.getLayout();
    expect(layout).toMatchInlineSnapshot(`
      {
        "enableVirtualization": false,
        "expandableRowHeight": 200,
        "maxHeight": 333,
        "rowHeight": 50,
        "scrollMargin": 20,
        "scrollableContainerRef": {
          "current": <div />,
        },
        "showFooter": false,
        "showHeader": false,
        "showPagination": "both",
        "showSidebar": true,
        "showTitle": "My Table",
        "showTotalResults": false,
        "showViewOptions": true,
      }
    `);
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
    config.options.layout.scrollableContainerRef = undefined;

    const layout = config.getLayout();
    expect(layout).toMatchInlineSnapshot(`
      {
        "enableVirtualization": true,
        "expandableRowHeight": 100,
        "maxHeight": "fluid",
        "rowHeight": 36,
        "scrollMargin": 20,
        "scrollableContainerRef": null,
        "showFooter": true,
        "showHeader": true,
        "showPagination": "bottom",
        "showSidebar": false,
        "showTitle": "My Table",
        "showTotalResults": true,
        "showViewOptions": false,
      }
    `);
  });

  it("should have showTitle as true if table actions are enabled", ({
    expect,
  }) => {
    config.options.enableTableActions = true;
    config.options.layout.showTitle = false;
    const layout = config.getLayout();
    expect(layout.showTitle).toBe(true);
  });
});
