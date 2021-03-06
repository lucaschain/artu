export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  restoreMocks: true,
  globals: {
    'ts-jest': {
      diagnostics: {
        ignoreCodes: ['TS151001']
      }
    }
  },
  moduleNameMapper: {
    "\\.(css)$": "identity-obj-proxy",
  },
  transform: {
    "\\.hbs$": "<rootDir>/tests/handlebars_preprocessor.js",
  }
}
