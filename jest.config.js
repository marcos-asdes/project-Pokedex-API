/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  preset: 'ts-jest',
  rootDir: '.',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts','tsx','js', 'jsx'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest', {
        compiler: 'typescript'
      }
    ]
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  }
}