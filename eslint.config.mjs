import antfu from '@antfu/eslint-config'

export default antfu(
  {
    typescript: false,
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
  {
    ignores: [
      '.github/**',
      'scripts/**',
      'lib/**',
    ],
  },
)
