// filepath: /home/server/vscode/reactpizza/jest.config.ts
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['**/tests/**/*.test.(ts|tsx)'],
    transformIgnorePatterns: [
        '/node_modules/(?!axios)', // Allow Jest to process ES modules like axios
    ],
};
