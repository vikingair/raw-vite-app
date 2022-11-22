/// <reference types="vite/client" />

declare global {
    var nextTick: () => Promise<void>;
}

export {};
