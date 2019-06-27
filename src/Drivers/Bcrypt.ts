/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import * as bcrypt from 'bcrypt'
import Hash from '../Hash'

export class Bcrypt implements Hash {
  private $config: BcryptConfig

  constructor (config: BcryptConfig) {
    this.$config = config
  }

  /**
   * Hash a plain value using argon2.
   */
  public make (value: string, config?: BcryptConfig): Promise<string> {
    const rounds = config ? config.rounds : this.$config.rounds || 10

    return new Promise((resolve, reject) => {
      bcrypt.hash(value, rounds, (error, hash) => {
        if (error) {
          reject(error)
          return
        }

        resolve(hash)
      })
    })
  }

  /**
   * Verify an existing hash with the plain value.
   */
  public verify (value: string, hash: string): Promise<boolean> {
    return new Promise(resolve => {
      bcrypt.compare(value, hash, (error, same) => {
        if (error) {
          resolve(false)
          return
        }

        resolve(same)
      })
    })
  }
}

export interface BcryptConfig {
  rounds: number
}
