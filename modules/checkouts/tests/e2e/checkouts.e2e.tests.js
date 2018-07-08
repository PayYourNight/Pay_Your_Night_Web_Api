'use strict';

describe('Checkouts E2E Tests:', function () {
  describe('Test Checkouts page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/checkouts');
      expect(element.all(by.repeater('checkout in checkouts')).count()).toEqual(0);
    });
  });
});
