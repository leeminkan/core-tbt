# Configs

## Strict - strict

The strict flag enables a wide range of type checking behavior that results in stronger guarantees of program correctness (including `strictNullChecks`, `noImplicitAny`, `strictBindCallApply`,...). Turning this on is equivalent to enabling all of the strict mode family options, which are outlined below. You can then turn off individual strict mode family checks as needed.

Future versions of TypeScript may introduce additional stricter checking under this flag, so upgrades of TypeScript might result in new type errors in your program. When appropriate and possible, a corresponding flag will be added to disable that behavior.

## Force Consistent Casing In File Names - forceConsistentCasingInFileNames

TypeScript follows the case sensitivity rules of the file system it’s running on. This can be problematic if some developers are working in a case-sensitive file system and others aren’t. If a file attempts to import fileManager.ts by specifying ./FileManager.ts the file will be found in a case-insensitive file system, but not on a case-sensitive file system.

When this option is set, TypeScript will issue an error if a program tries to include a file by a casing different from the casing on disk.

## No Fallthrough Cases In Switch - noFallthroughCasesInSwitch

```
const a: number = 6;

switch (a) {
  case 0:
Fallthrough case in switch.
    console.log("even");
  case 1:
    console.log("odd");
    break;
}
```

## ES Module Interop - esModuleInterop

When `esModuleInterop` is `disable`

```
import * as fs from "fs"
```

When `esModuleInterop` is `enable`

```
import fs from "fs"
```

## Resolve JSON Module - resolveJsonModule

When `esModuleInterop` is `disable`

```
import settings from "./settings.json";
>>> Cannot find module './settings.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.
```

When `esModuleInterop` is `enable`

```
import settings from "./settings.json";

settings.debug === true;
settings.dry === 2;
```

## Strict Property Initialization - strictPropertyInitialization

When set to true, TypeScript will raise an error when a class property was declared but not set in the constructor.

```
class UserAccount {
  name: string;

  email: string;
>>> Property 'email' has no initializer and is not definitely assigned in the constructor.

  constructor(name: string) {
    this.name = name;
    // Note that this.email is not set
  }
}
```
