/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import test from 'japa'
import HashManager from '../../src/HashManager'
import { Argon2 } from '../../src/Drivers/Argon2'

test.group('Hash Manager', () => {
  test('throw exception when no hash driver name is defined', assert => {
    const hashManager = new HashManager({})
    const fn = () => hashManager.use()
    assert.throw(fn, 'E_INVALID_CONFIG: Make sure to define a default hash driver name inside config file')
  })

  test('throw exception when driver config is missing', assert => {
    const hashManager = new HashManager({
      default: 'argon2',
    })
    const fn = () => hashManager.use()
    assert.throw(fn, 'E_INVALID_CONFIG: Make sure to define config for argon2 hash driver')
  })

  test('throw exception when driver is invalid', assert => {
    const hashManager = new HashManager({
      default: 'slynova',
    })
    const fn = () => hashManager.use()
    assert.throw(fn, 'Driver slynova is not supported')
  })

  test('return driver instance for a given driver', assert => {
    const hashManager = new HashManager({
      default: 'argon2',
      argon2: {
        type: 1,
      },
    })
    const argon2Driver = hashManager.use('argon2')
    assert.instanceOf(argon2Driver, Argon2)
  })

  test('get driver with custom config', async assert => {
    const hashManager = new HashManager({
      default: 'argon2',
      argon2: {
        type: 1,
      },
    })
    const argon2WithDefaultConfig = hashManager.use<Argon2>('argon2')
    const argon2WithCustomConfig = hashManager.use<Argon2>('argon2', {
      type: 2,
    })

    assert.instanceOf(argon2WithDefaultConfig, Argon2)
    assert.instanceOf(argon2WithCustomConfig, Argon2)
    // @ts-ignore
    assert.notEqual(argon2WithDefaultConfig.$config.type, argon2WithCustomConfig.$config.type)
    // @ts-ignore
    assert.equal(2, argon2WithCustomConfig.$config.type)
  })
})
