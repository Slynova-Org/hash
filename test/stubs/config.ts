/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

export default {
  /*
  |--------------------------------------------------------------------------
  | Default Hash Algorithm
  |--------------------------------------------------------------------------
  |
  | Driver to be used for hashing values by default.
  |
  */
  default: 'argon2',

  /*
  |--------------------------------------------------------------------------
  | Argon2
  |--------------------------------------------------------------------------
  |
  | Config related to argon. https://www.npmjs.com/package/argon2 package is
  | used internally.
  |
  */
  argon2: {
    type: 1,
  },

  /*
  |--------------------------------------------------------------------------
  | Bcrypt
  |--------------------------------------------------------------------------
  |
  | Config related to bcrypt hashing. https://www.npmjs.com/package/bcrypt
  | package is used internally.
  |
  */
  bcrypt: {
    rounds: 10,
  },
}
