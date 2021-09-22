import fs from 'fs';

const THRESHOLDS = {
    statements: 55,
    branches: 47,
    functions: 44,
    lines: 59,
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
        '\\.tsx?$': [
            'babel-jest',
            {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    '@babel/preset-react',
                    '@babel/preset-typescript',
                ],
            },
        ],
        '^.+\\.svg$': './jest.svgTransform.js',
    },
    testEnvironment: 'jsdom',
};
