// test utility to await all running promises
(globalThis as any).__test__ = {} as any;
__test__.nextTick = (): Promise<void> => new Promise((resolve) => process.nextTick(resolve));

// as indicator that this is an isolated module by purpose
export {};
