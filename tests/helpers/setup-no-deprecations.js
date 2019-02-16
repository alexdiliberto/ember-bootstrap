import { registerDeprecationHandler } from '@ember/debug';

let isRegistered = false;
let deprecations;

export default function setupNoDeprecations({ beforeEach, afterEach }) {

  beforeEach(function() {
    deprecations = [];
    if (!isRegistered) {
      registerDeprecationHandler((message, options, next) => {
        deprecations.push(message);
        next(message, options);
      });
      isRegistered = true;
    }
  });

  afterEach(function(assert) {
    // guard in if instead of using assert.equal(), to not make assert.expect() fail
    if (deprecations && deprecations.length > 0) {
      assert.ok(false, `Expected no deprecations, found: ${deprecations.map(msg => `"${msg}"`).join(', ')}`);
    }
  });
}
