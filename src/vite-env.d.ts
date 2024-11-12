/// <reference types="vite/client" />

declare global {
  const fn: typeof import("@storybook/test").fn;
  const renderHook: typeof import("@testing-library/react").renderHook;
}

export {};
