import { module, test } from 'qunit';
import { setupTest } from 'client/tests/helpers';

module('Unit | Service | chat-service', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:chat-service');
    assert.ok(service);
  });
});