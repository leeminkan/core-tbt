## Description of the module structure

```txt
.
├── apps
│   ├── chat-tbt
│   ├── core-tbt
│       └── src
│           ├── configs
│           ├── modules
│               └── user
│                   ├── commands
│                   ├── queries
│                   ├── dtos
│                   ├── user.controller.ts
│                   ├── user.module.ts
│           ├── utils
│           ├── main.ts
├── libs
│   ├── core-domain
│       └── src
│           └── user
│               └── user.entity.ts
│   ├── core-infrastructure
│       └── src
│           └── persistence
│               └── user
│                   ├── user-repository.abstract.ts ([PORT].repository.ts)
│                   ├── typeorm
│                      ├── user.mapper.ts
│                      ├── user.shema.ts
│                      ├── user.repository.ts ([ADAPTER].repository.ts)
```

`core-domain` folder - contains all the domain-related components

`[DOMAIN ENTITY].ts` represents an entity used in the business logic. Domain entity has no dependencies on the database or any other infrastructure.

`core-infrastructure` folder - contains all the infrastructure-related components

`[SCHEMA].ts` represents the **database structure**.

`[MAPPER].ts` is a mapper that converts **database entity** to **domain entity** and vice versa.

`[ADAPTER].repository.ts` is a repository that implements the `[PORT].repository.ts`. It is used to interact with the database.

`[PORT].repository.ts` is a repository **port** that defines the methods for interacting with the database.
