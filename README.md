## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## TODO

- [Security] CSRF
- [Security] Device Fingerprinting
  - How it Works: Collect device-specific information (e.g., device ID, OS version) and include it in API requests. You can then validate this information on the server-side to ensure the request is coming from a legitimate device.
  - Benefits: Adds an extra layer of protection against unauthorized access.
  - Considerations: Be mindful of privacy concerns and obtain user consent if necessary.
