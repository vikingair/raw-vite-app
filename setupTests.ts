// test utility to await all running promises
import { afterEach, beforeEach, expect } from "vitest";
import { Spy } from "spy4js";

global.nextTick = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

Spy.setup({ beforeEach, afterEach, expect });
