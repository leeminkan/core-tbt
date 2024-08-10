# Rules

- Prevent unused variables. It's generally a good practice as unused variables can clutter code and potentially indicate errors or unnecessary code.

```
'@typescript-eslint/no-unused-vars': [
    'error',
    {
        argsIgnorePattern: '^_',
    },
]
```

- Disable error `Insert ⏎ prettier/prettier` (https://github.com/prettier/eslint-plugin-prettier/issues/211)

```
// eslintrc.js

rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
}
```
