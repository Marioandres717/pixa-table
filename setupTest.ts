import { renderHook, render, fireEvent } from "@testing-library/react";
import { describe, it, vitest } from "vitest";
import { createMockColumn } from "./src/utils/testUtilities";
import userEvent from "@testing-library/user-event";
import { screen, within } from "@testing-library/dom";
import { MockDataColumnDefs } from "./src/mocks/handlers/mockData";

globalThis.fn = vitest.fn;
globalThis.renderHook = renderHook;
globalThis.describe = describe;
globalThis.it = it;
globalThis.createMockColumn = createMockColumn;
globalThis.render = render;
globalThis.userEvent = userEvent;
globalThis.within = within;
globalThis.vitest = vitest;
globalThis.sc = screen;
globalThis.mockDataColumnDefs = MockDataColumnDefs;
globalThis.fireEvent = fireEvent;
