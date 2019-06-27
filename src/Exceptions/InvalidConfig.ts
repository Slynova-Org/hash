/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import { RuntimeException } from 'node-exceptions'

export class InvalidConfig extends RuntimeException {
  public static missingDriverName () {
    return new this('Make sure to define a default hash driver name inside config file', 500, 'E_INVALID_CONFIG')
  }

  public static missingDriverConfig (name: string) {
    return new this(`Make sure to define config for ${name} hash driver`, 500, 'E_INVALID_CONFIG')
  }
}
