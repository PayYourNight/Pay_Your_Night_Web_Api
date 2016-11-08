(function () {
  'use strict';

  angular
    .module('estabelecimentos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('estabelecimentos', {
        abstract: true,
        url: '/estabelecimentos',
        template: '<ui-view/>'
      })
      .state('estabelecimentos.list', {
        url: '',
        templateUrl: 'modules/estabelecimentos/client/views/list-estabelecimentos.client.view.html',
        controller: 'EstabelecimentosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Estabelecimentos List'
        }
      })
      .state('estabelecimentos.create', {
        url: '/create',
        templateUrl: 'modules/estabelecimentos/client/views/form-estabelecimento.client.view.html',
        controller: 'EstabelecimentosController',
        controllerAs: 'vm',
        resolve: {
          estabelecimentoResolve: newEstabelecimento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Estabelecimentos Create'
        }
      })
      .state('estabelecimentos.edit', {
        url: '/:estabelecimentoId/edit',
        templateUrl: 'modules/estabelecimentos/client/views/form-estabelecimento.client.view.html',
        controller: 'EstabelecimentosController',
        controllerAs: 'vm',
        resolve: {
          estabelecimentoResolve: getEstabelecimento
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Estabelecimento {{ estabelecimentoResolve.name }}'
        }
      })
      .state('estabelecimentos.view', {
        url: '/:estabelecimentoId',
        templateUrl: 'modules/estabelecimentos/client/views/view-estabelecimento.client.view.html',
        controller: 'EstabelecimentosController',
        controllerAs: 'vm',
        resolve: {
          estabelecimentoResolve: getEstabelecimento
        },
        data: {
          pageTitle: 'Estabelecimento {{ estabelecimentoResolve.name }}'
        }
      });
  }

  getEstabelecimento.$inject = ['$stateParams', 'EstabelecimentosService'];

  function getEstabelecimento($stateParams, EstabelecimentosService) {
    return EstabelecimentosService.get({
      estabelecimentoId: $stateParams.estabelecimentoId
    }).$promise;
  }

  newEstabelecimento.$inject = ['EstabelecimentosService'];

  function newEstabelecimento(EstabelecimentosService) {
    return new EstabelecimentosService();
  }
}());
