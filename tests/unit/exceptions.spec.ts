// test custom exception structure and status codes
import { test } from '@japa/runner'
import BallotValidationException from '#exceptions/ballot_validation_exception'
import RoundNotOpenException from '#exceptions/round_not_open_exception'
import UnauthorizedRoleException from '#exceptions/unauthorized_role_exception'

test.group('Custom Exceptions', () => {
  test('ballot validation exception sets 422 and code', async ({ assert }) => {
    const error = new BallotValidationException(['Duplicate entries selected', '1st place empty'])
    assert.equal(error.status, 422)
    assert.equal(error.code, 'BALLOT_VALIDATION_FAILED')
    assert.lengthOf(error.errors, 2)
  })

  test('round not open exception sets 409 and code', async ({ assert }) => {
    const error = new RoundNotOpenException('round-1', 'closed')
    assert.equal(error.status, 409)
    assert.equal(error.code, 'ROUND_NOT_OPEN')
    assert.include(error.message, 'round-1')
  })

  test('unauthorized role exception sets 403 and code', async ({ assert }) => {
    const error = new UnauthorizedRoleException('admin')
    assert.equal(error.status, 403)
    assert.equal(error.code, 'INSUFFICIENT_ROLE')
    assert.include(error.message, 'admin')
  })
})
