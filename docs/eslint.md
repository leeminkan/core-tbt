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
