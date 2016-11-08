'use strict';

describe('Equipes E2E Tests:', function () {
  describe('Test Equipes page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/equipes');
      expect(element.all(by.repeater('equipe in equipes')).count()).toEqual(0);
    });
  });
});
