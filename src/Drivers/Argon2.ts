/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import * as argon2 from 'argon2'
import Hash from '../Hash'

export class Argon2 implements Hash {
  private $config: Argon2Config

  constructor (config: Argon2Config) {
    this.$config = config
  }

  /**
   * Hash a plain value using argon2.
   */
  public make (value: string, config?: Argon2Config): Promise<string> {
    // @ts-ignore
    return argon2.hash(value, { ...this.$config, ...config })
  }

  /**
   * Verify an existing hash with the plain value.
   */
  public verify (value: string, hash: string): Promise<boolean> {
    if (value === undefined) {
      return new Promise(resolve => resolve(false))
    }

    return argon2.verify(hash, value)
  }
}

export interface Argon2Config extends argon2.Options {}
