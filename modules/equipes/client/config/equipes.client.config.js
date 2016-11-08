(function () {
  'use strict';

  angular
    .module('equipes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Equipes',
      state: 'equipes',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'equipes', {
      title: 'List Equipes',
      state: 'equipes.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'equipes', {
      title: 'Create Equipe',
      state: 'equipes.create',
      roles: ['user']
    });
  }
}());
