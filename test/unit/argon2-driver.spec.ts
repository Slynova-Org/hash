/**
 * @slynova/hash
 *
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

import * as test from 'japa'
import { Argon2 } from '../../src/Drivers/Argon2'

test.group('Argon2 Driver', () => {
  test('hash value', async assert => {
    const Hash = new Argon2({ type: 1 })
    const hashed = await Hash.make('foo')

    assert.isDefined(hashed)
  })

  test('return true when hash matches', async assert => {
    const Hash = new Argon2({ type: 1 })
    const hashed = await Hash.make('foo')
    const verified = await Hash.verify('foo', hashed)

    assert.isTrue(verified)
  })

  test('return false when hash does not match', async assert => {
    const Hash = new Argon2({ type: 1 })
    const hashed = await Hash.make('foo')
    const verified = await Hash.verify('bar', hashed)

    assert.isFalse(verified)
  })

  test('return false instead of throwing exception', async assert => {
    const Hash = new Argon2({ type: 1 })
    const hashed = await Hash.make('foo')
    // @ts-ignore
    const verified = await Hash.verify(undefined, hashed)

    assert.isFalse(verified)
  })
})
