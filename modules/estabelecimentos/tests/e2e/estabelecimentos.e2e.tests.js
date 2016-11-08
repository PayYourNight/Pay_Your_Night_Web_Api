'use strict';

describe('Estabelecimentos E2E Tests:', function () {
  describe('Test Estabelecimentos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/estabelecimentos');
      expect(element.all(by.repeater('estabelecimento in estabelecimentos')).count()).toEqual(0);
    });
  });
});
