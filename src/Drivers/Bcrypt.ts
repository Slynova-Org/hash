/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import bcrypt from 'bcrypt'
import Hash from '../Hash'

export class Bcrypt implements Hash {
  private $config: BcryptConfig

  constructor(config: BcryptConfig) {
    this.$config = config
  }

  /**
   * Hash plain value using argon2.
   */
  make(value: string, config?: BcryptConfig): Promise<string> {
    const rounds = config ? config.rounds : this.$config.rounds || 10

    return new Promise((resolve, reject) => {
      bcrypt.hash(value, rounds, (error, hash) => {
        if (error) reject(error)

        resolve(hash)
      })
    })
  }

  /**
   * Verify an existing hash with the plain value.
   */
  verify(value: string, hash: string): Promise<boolean> {
    return new Promise(resolve => {
      bcrypt.compare(value, hash, (error, same) => {
        if (error) resolve(false)

        resolve(same)
      })
    })
  }
}

export type BcryptConfig = {
  rounds: number
}
