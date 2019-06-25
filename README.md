<p align="center">
  <img src="https://user-images.githubusercontent.com/2793951/60084566-0f2bc400-9738-11e9-909e-7b471a000419.png" alt="hash">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@slynova/hash"><img src="https://img.shields.io/npm/dm/@slynova/hash.svg?style=flat-square" alt="Download"></a>
  <a href="https://www.npmjs.com/package/@slynova/hash"><img src="https://img.shields.io/npm/v/@slynova/hash.svg?style=flat-square" alt="Version"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/npm/l/@slynova/hash.svg?style=flat-square" alt="License"></a>
</p>

`hash` is a framework-agnostic package which provides a powerful wrapper for password hashing algorithms in [Node.js](https://nodejs.org).

There are currently 2 drivers available:

- Argon2
- Bcrypt

---

## Getting Started

This package is available in the npm registry.
It can easily be installed with `npm` or `yarn`.

```bash
$ npm i @slynova/hash
# or
$ yarn add @slynova/hash
```

When you require the package in your file, it will give you access to the `HashManager` class.
This class is a facade for the package and should be instantiated with a [configuration object](https://github.com/Slynova-Org/hash/blob/master/test/stubs/config.ts).

```javascript
const { HashManager } = require('@slynova/hash')
const hash = new HashManager(config)
```

Once you instantiated the manager, you can use the `HashManager#use()` method to retrieve a driver an use it.

```javascript
hash.use() // Returns the default driver (specified in the config)
hash.use('argon2') // Returns the argon2 driver
hash.use('bcrypt', customConfig) // Overwrite the default configuration of the driver
```

## Driver's API

Each driver implements the Interface [`Hash`](https://github.com/Slynova-Org/hash/blob/master/src/Hash.ts).

### Methods

<details>
<summary markdown="span"><code>make(value: string, config?: Argon2Config | BcryptConfig): Promise&lt;string&gt;</code></summary>

This method will hash a plain value using the provided driver.

```javascript
await hash.use('bcrypt').make('foo')
// $2b$10$RFgHztUoooIJEhuR4/e3ue4lZg36HYcIY2D7ptjB494FI/ctohaa6
```

</details>

<details>
<summary markdown="span"><code>verify(value: string, hash: string): Promise&lt;boolean&gt;</code></summary>

This method will verify an existing hash with the plain value using the provided driver.

```javascript
await hash.use('bcrypt').verify('$2b$10$RFgHztUoooIJEhuR4/e3ue4lZg36HYcIY2D7ptjB494FI/ctohaa6', 'foo')
```

</details>

## Contribution Guidelines

Any pull requests or discussions are welcome.
Note that every pull request providing new feature or correcting a bug should be created with appropriate unit tests.
