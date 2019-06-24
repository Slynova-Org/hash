/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { Argon2Config } from './Drivers/Argon2'
import { BcryptConfig } from './Drivers/Bcrypt'

export default interface Hash {
  /**
   * Hash a plain value using argon2.
   */
  make(value: string, config?: Argon2Config | BcryptConfig): Promise<string>

  /**
   * Verify an existing hash with the plain value.
   */
  verify(value: string, hash: string): Promise<boolean>
}
