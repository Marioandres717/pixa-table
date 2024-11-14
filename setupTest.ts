/* eslint-disable @typescript-eslint/no-unused-vars */

import { renderHook } from "@testing-library/react";
import { describe, it } from "vitest";
import { fn } from "@storybook/test";

globalThis.fn = fn;
globalThis.renderHook = renderHook;
