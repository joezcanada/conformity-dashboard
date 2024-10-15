export { };
module.exports = {
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['!src/**/*.{ts,tsx}', '!src/**/*.d.ts',
        '!**/vendor/**', 'tests/**/*.{ts,tsx}'],
    coverageDirectory: 'coverage',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.app.json',  
        },
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/coverage",
        "package.json",
        "package-lock.json",
        "reportWebVitals.ts",
        "setupTests.ts",
        "index.tsx"
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: [
        '**/tests/**/*.{ts,tsx}',
        '**/tests/?(*.)+(test).{ts,tsx}',
    ],
    testPathIgnorePatterns: ['<rootDir>/src/'],
}