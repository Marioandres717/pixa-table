import { describe, it } from "vitest";
import {
  calculateGridTemplate,
  calculateTableBodyHeight,
} from "./gridGenerator";

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
});
