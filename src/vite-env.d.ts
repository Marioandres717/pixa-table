/// <reference types="vite/client" />

declare global {
  const fn: typeof import("@storybook/test").fn;
  const renderHook: typeof import("@testing-library/react").renderHook;
  const describe: typeof import("vitest").describe;
  const it: typeof import("vitest").it;
  const createMockColumn: typeof import("./src/utils/testUtilities").createMockColumn;
  const render: typeof import("@testing-library/react").render;
  const userEvent: typeof import("@testing-library/user-event");
  const within: typeof import("@testing-library/dom").within;
  const vitest: typeof import("vitest");
  const sc: typeof import("@testing-library/dom").screen;
  const mockDataColumnDefs: typeof import("./src/mocks/handlers/mockData").MockDataColumnDefs;
  const fireEvent: typeof import("@testing-library/react").fireEvent;
  const act: typeof import("@testing-library/react").act;
}

export {};
