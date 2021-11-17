import fs from 'fs';

const THRESHOLDS = {
    statements: 64,
    branches: 60,
    functions: 59,
    lines: 64,
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
