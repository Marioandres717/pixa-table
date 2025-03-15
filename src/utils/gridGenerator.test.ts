/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  calculateGridTemplate,
  calculateTableBodyHeight,
  colRangeExtractor,
  divideAvailableSpaceWithColumns,
  getPinnedCols,
  rowRangeExtractor,
} from "./gridGenerator";
import { createMockColumn } from "./testUtilities";

describe("gridGenerator utility file", () => {
  it("should match grid template layout", ({ expect }) => {
    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: true,
        showSidebar: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid  grid-cols-[1fr,32px] grid-rows-[44px_minMax(44px,auto)_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: true,
        showSidebar: false,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr] grid-rows-[44px_minMax(44px,auto)]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: false,
        showSidebar: false,
      }),
    ).toMatchInlineSnapshot(`"grid grid-cols-[1fr] grid-rows-[auto]"`);

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: false,
        showSidebar: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr,32px] grid-rows-[auto_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: false,
        showSidebar: false,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr] grid-rows-[minMax(44px,auto)_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: true,
        showSidebar: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr,32px] grid-rows-[44px_minMax(44px,auto)]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: false,
        showSidebar: true,
      }),
    ).toMatchInlineSnapshot(`"grid grid-cols-[1fr,32px] grid-rows-[auto]"`);

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: true,
        showSidebar: false,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr] grid-rows-[44px_minMax(44px,auto)_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: true,
        showSidebar: true,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr,32px] grid-rows-[44px_44px_minMax(44px,auto)_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: true,
        showSidebar: true,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr,32px] grid-rows-[44px_44px_minMax(44px,auto)]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: false,
        showSidebar: true,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr,32px] grid-rows-[auto_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: true,
        showSidebar: false,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr] grid-rows-[44px_44px_minMax(44px,auto)_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: true,
        showHeader: false,
        showSidebar: false,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(
      `"grid grid-cols-[1fr] grid-rows-[minMax(44px,auto)_44px]"`,
    );

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: true,
        showSidebar: false,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(`"grid grid-cols-[1fr] grid-rows-[auto]"`);

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: false,
        showSidebar: true,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(`"grid grid-cols-[1fr,32px] grid-rows-[auto]"`);

    expect(
      calculateGridTemplate({
        showFooter: false,
        showHeader: false,
        showSidebar: false,
        showTitle: true,
      }),
    ).toMatchInlineSnapshot(`"grid grid-cols-[1fr] grid-rows-[auto]"`);
  });

  it("should return correct table body height", ({ expect }) => {
    expect(calculateTableBodyHeight({})).toBe("auto");
    expect(
      calculateTableBodyHeight({
        showHeader: true,
        showTitle: true,
        showFooter: true,
      }),
    ).toMatchInlineSnapshot(`"auto"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: true,
        showTitle: false,
        showFooter: false,
      }),
    ).toMatchInlineSnapshot(`"calc(956px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: true,
        showTitle: true,
        showFooter: true,
      }),
    ).toMatchInlineSnapshot(`"calc(868px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: true,
        showTitle: false,
        showFooter: true,
      }),
    ).toMatchInlineSnapshot(`"calc(912px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: false,
        showTitle: true,
        showFooter: true,
      }),
    ).toMatchInlineSnapshot(`"calc(956px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: false,
        showTitle: true,
        showFooter: false,
      }),
    ).toMatchInlineSnapshot(`"calc(1000px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: true,
        showTitle: true,
        showFooter: false,
      }),
    ).toMatchInlineSnapshot(`"calc(912px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: true,
        showTitle: false,
        showFooter: false,
      }),
    ).toMatchInlineSnapshot(`"calc(956px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: false,
        showTitle: false,
        showFooter: true,
      }),
    ).toMatchInlineSnapshot(`"calc(956px - 2px)"`);

    expect(
      calculateTableBodyHeight({
        maxHeight: 1000,
        showHeader: false,
        showTitle: false,
        showFooter: false,
      }),
    ).toMatchInlineSnapshot(`"calc(1000px - 2px)"`);
  });

  describe("getPinnedCols", () => {
    it("should return an empty object if no columns are pinned", ({
      expect,
    }) => {
      const mockColumns = [
        { getIsPinned: fn(() => false) },
        { getIsPinned: fn(() => false) },
      ];

      const result = getPinnedCols(mockColumns as any);
      expect(result).toEqual({
        left: [],
        right: [],
      });
    });

    it("should correctly separate left and right pinned columns", ({
      expect,
    }) => {
      const mockColumns = [
        { getIsPinned: fn(() => "left") },
        { getIsPinned: fn(() => "right") },
        { getIsPinned: fn(() => false) },
        { getIsPinned: fn(() => "left") },
      ];

      const result = getPinnedCols(mockColumns as any);
      expect(result).toEqual({
        left: [mockColumns[0], mockColumns[3]],
        right: [mockColumns[1]],
      });
    });

    it("should ignore columns with invalid pinned values", ({ expect }) => {
      const mockColumns = [
        { getIsPinned: fn(() => "invalid") },
        { getIsPinned: fn(() => "left") },
        { getIsPinned: fn(() => "right") },
        { getIsPinned: fn(() => "invalid") },
      ];
      const result = getPinnedCols(mockColumns as any);
      expect(result).toEqual({
        left: [mockColumns[1]],
        right: [mockColumns[2]],
      });
    });

    it("should handle an empty array of columns", ({ expect }) => {
      const result = getPinnedCols([] as any);
      expect(result).toEqual({
        left: [],
        right: [],
      });
    });
  });

  describe("colRangeExtractor", () => {
    it("should return correct column indexes", ({ expect }) => {
      const mockColumns = [
        { id: 1, getIsPinned: fn(() => "left") },
        { id: 2, getIsPinned: fn(() => "right") },
        { id: 3, getIsPinned: fn(() => false) },
        { id: 4, getIsPinned: fn(() => false) },
        { id: 5, getIsPinned: fn(() => false) },
        { id: 6, getIsPinned: fn(() => false) },
      ];

      const result = colRangeExtractor(
        { startIndex: 3, endIndex: 5 } as any,
        mockColumns as any,
      );
      expect(result).toEqual([0, 1, 3, 4, 5]);
    });

    it("should handle an empty array of columns", ({ expect }) => {
      const result = colRangeExtractor(
        { startIndex: 1, endIndex: 4 } as any,
        [] as any,
      );
      expect(result).toEqual([]);
    });

    it("should handle an empty range", ({ expect }) => {
      const mockColumns = [
        { id: 1, getIsPinned: fn(() => "left") },
        { id: 2, getIsPinned: fn(() => "right") },
        { id: 3, getIsPinned: fn(() => false) },
        { id: 4, getIsPinned: fn(() => false) },
        { id: 5, getIsPinned: fn(() => false) },
        { id: 6, getIsPinned: fn(() => false) },
      ];

      const result = colRangeExtractor(
        { startIndex: 0, endIndex: 0 } as any,
        mockColumns as any,
      );
      expect(result).toEqual([0, 1]);
    });

    it("should handle a range that is out of bounds", ({ expect }) => {
      const mockColumns = [
        { id: 1, getIsPinned: fn(() => "left") },
        { id: 2, getIsPinned: fn(() => "right") },
        { id: 3, getIsPinned: fn(() => false) },
        { id: 4, getIsPinned: fn(() => false) },
        { id: 5, getIsPinned: fn(() => false) },
        { id: 6, getIsPinned: fn(() => false) },
      ];

      const result = colRangeExtractor(
        { startIndex: 0, endIndex: 10 } as any,
        mockColumns as any,
      );
      expect(result).toEqual([0, 1, 2, 3, 4, 5]);
    });

    it("should correctly handle pinned columns", ({ expect }) => {
      const mockColumns = [
        { id: 1, getIsPinned: fn(() => "right") },
        { id: 2, getIsPinned: fn(() => false) },
        { id: 3, getIsPinned: fn(() => "right") },
        { id: 4, getIsPinned: fn(() => false) },
        { id: 5, getIsPinned: fn(() => false) },
        { id: 6, getIsPinned: fn(() => "left") },
      ];

      const result = colRangeExtractor(
        { startIndex: 3, endIndex: 5 } as any,
        mockColumns as any,
      );

      const left = [5];
      const right = [0, 2];
      const visible = [3, 4];

      expect(result).toEqual([...left, ...right, ...visible]);
    });
  });

  describe("rowRangeExtractor", () => {
    it("should return correct row indexes", ({ expect }) => {
      const mockRows = [
        { id: 1, getIsExpanded: fn(() => true) },
        { id: 2, getIsExpanded: fn(() => false) },
        { id: 3, getIsExpanded: fn(() => false) },
        { id: 4, getIsExpanded: fn(() => true) },
        { id: 5, getIsExpanded: fn(() => false) },
        { id: 6, getIsExpanded: fn(() => true) },
      ];

      const result = rowRangeExtractor(
        { startIndex: 1, endIndex: 4 } as any,
        mockRows as any,
      );
      expect(result).toEqual([0, 3, 5, 1, 2, 4]);
    });

    it("should handle an empty array of rows", ({ expect }) => {
      const result = rowRangeExtractor(
        { startIndex: 1, endIndex: 4 } as any,
        [] as any,
      );
      expect(result).toEqual([]);
    });

    it("should handle an empty range", ({ expect }) => {
      const mockRows = [
        { id: 1, getIsExpanded: fn(() => true) },
        { id: 2, getIsExpanded: fn(() => false) },
        { id: 3, getIsExpanded: fn(() => false) },
        { id: 4, getIsExpanded: fn(() => true) },
        { id: 5, getIsExpanded: fn(() => false) },
        { id: 6, getIsExpanded: fn(() => true) },
      ];

      const result = rowRangeExtractor(
        { startIndex: 0, endIndex: 0 } as any,
        mockRows as any,
      );
      expect(result).toEqual([0, 3, 5]);
    });
  });

  describe("divideAvailableSpaceWithColumns", () => {
    const mockColumns = () =>
      [
        {
          id: "1",
          columnDef: {
            size: 300,
            minSize: 100,
            grow: false,
          },
        },
        {
          id: "2",
          columnDef: {
            size: 200,
            minSize: 100,
            grow: true,
          },
        },
        {
          id: "3",
          columnDef: {
            size: 500,
            minSize: 100,
            grow: false,
          },
        },
      ].map((c) => createMockColumn({ ...c }));

    it("should return correct column sizes", ({ expect }) => {
      const mc = mockColumns();
      const result = divideAvailableSpaceWithColumns(mc, 1000);
      expect(result).toEqual(mc);
    });

    it("should handle no available space", ({ expect }) => {
      const mc = [
        ...mockColumns(),
        createMockColumn({ columnDef: { grow: false } }),
      ];
      const result = divideAvailableSpaceWithColumns(mc, 100);
      expect(result).toEqual(mc);
    });

    it("should share available space with growable columns", ({ expect }) => {
      const mc = [
        ...mockColumns(),
        createMockColumn({ id: "4", columnDef: { grow: true, size: 200 } }),
      ];
      const cols = divideAvailableSpaceWithColumns(mc, 2000);
      expect(cols[0].columnDef.size).toEqual(300);
      expect(cols[1].columnDef.size).toEqual(600);
      expect(cols[2].columnDef.size).toEqual(500);
      expect(cols[3].columnDef.size).toEqual(600);
    });

    it("should grow columns with grow set to undefined", ({ expect }) => {
      const mc = [
        ...mockColumns(),
        createMockColumn({ id: "4", columnDef: { size: 200 } }),
      ];
      const cols = divideAvailableSpaceWithColumns(mc, 2000);
      expect(cols[0].columnDef.size).toEqual(300);
      expect(cols[1].columnDef.size).toEqual(600);
      expect(cols[2].columnDef.size).toEqual(500);
      expect(cols[3].columnDef.size).toEqual(600);
    });

    it("should handle minSize", ({ expect }) => {
      const mc = [
        ...mockColumns(),
        createMockColumn({
          id: "4",
          columnDef: { grow: true, size: 200, minSize: 300 },
        }),
      ];
      const cols = divideAvailableSpaceWithColumns(mc, 1300);
      expect(cols[0].columnDef.size).toEqual(300);
      expect(cols[1].columnDef.size).toEqual(200);
      expect(cols[2].columnDef.size).toEqual(500);
      expect(cols[3].columnDef.size).toEqual(300);
    });

    it("should assign minWidth if size and minSize are both undefined", ({
      expect,
    }) => {
      const mc = [
        ...mockColumns(),
        createMockColumn({
          id: "4",
          columnDef: { grow: false },
        }),
      ];
      const cols = divideAvailableSpaceWithColumns(mc, 1100, 100);
      expect(cols[0].columnDef.size).toEqual(300);
      expect(cols[1].columnDef.size).toEqual(200);
      expect(cols[2].columnDef.size).toEqual(500);
      expect(cols[3].columnDef.size).toEqual(100);
    });

    it("should assign minSize if defined instead of minWidth if size is undefined", ({
      expect,
    }) => {
      const mc = [
        ...mockColumns(),
        createMockColumn({
          id: "4",
          columnDef: { grow: false, minSize: 300 },
        }),
      ];
      const cols = divideAvailableSpaceWithColumns(mc, 1100, 100);
      expect(cols[0].columnDef.size).toEqual(300);
      expect(cols[1].columnDef.size).toEqual(200);
      expect(cols[2].columnDef.size).toEqual(500);
      expect(cols[3].columnDef.size).toEqual(300);
    });
  });
});
