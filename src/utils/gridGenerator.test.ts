// sum.test.js
import { describe, it } from "vitest";
import { calculateHeightOfCells, calculateGridTemplate } from "./gridGenerator";

describe("gridGenerator utility file", () => {
  it("should return the correct height of cells, by subtracting 1px for the border", ({
    expect,
  }) => {
    expect(calculateHeightOfCells(36)).toBe("calc(36px - 1px)");
  });

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
  });
});
