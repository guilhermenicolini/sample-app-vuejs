module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['**/*.spec.[jt]s?(x)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}'],
}