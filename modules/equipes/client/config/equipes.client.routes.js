(function () {
  'use strict';

  angular
    .module('equipes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('equipes', {
        abstract: true,
        url: '/equipes',
        template: '<ui-view/>'
      })
      .state('equipes.list', {
        url: '',
        templateUrl: 'modules/equipes/client/views/list-equipes.client.view.html',
        controller: 'EquipesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Equipes List'
        }
      })
      .state('equipes.create', {
        url: '/create',
        templateUrl: 'modules/equipes/client/views/form-equipe.client.view.html',
        controller: 'EquipesController',
        controllerAs: 'vm',
        resolve: {
          equipeResolve: newEquipe
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Equipes Create'
        }
      })
      .state('equipes.edit', {
        url: '/:equipeId/edit',
        templateUrl: 'modules/equipes/client/views/form-equipe.client.view.html',
        controller: 'EquipesController',
        controllerAs: 'vm',
        resolve: {
          equipeResolve: getEquipe
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Equipe {{ equipeResolve.name }}'
        }
      })
      .state('equipes.view', {
        url: '/:equipeId',
        templateUrl: 'modules/equipes/client/views/view-equipe.client.view.html',
        controller: 'EquipesController',
        controllerAs: 'vm',
        resolve: {
          equipeResolve: getEquipe
        },
        data: {
          pageTitle: 'Equipe {{ equipeResolve.name }}'
        }
      });
  }

  getEquipe.$inject = ['$stateParams', 'EquipesService'];

  function getEquipe($stateParams, EquipesService) {
    return EquipesService.get({
      equipeId: $stateParams.equipeId
    }).$promise;
  }

  newEquipe.$inject = ['EquipesService'];

  function newEquipe(EquipesService) {
    return new EquipesService();
  }
}());
