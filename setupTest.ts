/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { renderHook } from "@testing-library/react";
import { describe, it } from "vitest";
import { fn } from "@storybook/test";
import { createMockColumn } from "./src/utils/testUtilities";

globalThis.fn = fn;
globalThis.renderHook = renderHook;
globalThis.describe = describe;
globalThis.it = it;
globalThis.createMockColumn = createMockColumn;
