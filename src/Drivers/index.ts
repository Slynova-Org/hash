/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { Bcrypt } from './Bcrypt'
import { Argon2 } from './Argon2'

export default {
  argon2: Argon2,
  bcrypt: Bcrypt,
}
