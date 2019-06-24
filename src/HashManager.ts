/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import Hash from './Hash'
import Drivers from './Drivers'
import { Argon2Config } from './Drivers/Argon2'
import { BcryptConfig } from './Drivers/Bcrypt'
import { InvalidConfig, DriverNotSupported } from './Exceptions'

export default class HashManager {
  /**
   * Configuration of the storage manager.
   */
  private _config: any

  constructor(config) {
    this._config = config
  }

  use<T extends Hash>(name?: string, config?: Argon2Config | BcryptConfig): T {
    name = name || this._config.default

    /**
     * No name is defined and neither there
     * are any defaults.
     */
    if (!name) {
      throw InvalidConfig.missingDriverName()
    }

    const Driver = Drivers[name]

    /**
     * Unable to pull driver from the drivers list
     */
    if (!Driver) {
      throw DriverNotSupported.driver(name)
    }

    const driverConfig = this._config[name]

    /**
     * Configuration for the defined disk is missing
     */
    if (!driverConfig) {
      throw InvalidConfig.missingDriverConfig(name)
    }

    return new Driver({ ...driverConfig, ...config })
  }
}
