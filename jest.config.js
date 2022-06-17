import fs from 'fs';

const THRESHOLDS = {
    statements: 68,
    branches: 77,
    functions: 66,
    lines: 68,
};
const setupTestsUsesJSX = fs.existsSync('./setupTests.tsx');

export default {
    coverageReporters: ['text-summary', 'html'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts' + (setupTestsUsesJSX ? 'x' : '')],
    coverageThreshold: { global: THRESHOLDS },
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.ts?(x)', '!src/**/*.d.ts'],
    testTimeout: process.env.CI ? 30_000 : 5_000,
    transform: {
        '\\.tsx?$': '@sucrase/jest-plugin',
        '^.+\\.svg$': './jest.svgTransform.js',
    },
    testEnvironment: 'jsdom',
};
