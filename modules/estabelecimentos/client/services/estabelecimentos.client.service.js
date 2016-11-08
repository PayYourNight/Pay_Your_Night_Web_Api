// Estabelecimentos service used to communicate Estabelecimentos REST endpoints
(function () {
  'use strict';

  angular
    .module('estabelecimentos')
    .factory('EstabelecimentosService', EstabelecimentosService);

  EstabelecimentosService.$inject = ['$resource'];

  function EstabelecimentosService($resource) {
    return $resource('api/estabelecimentos/:estabelecimentoId', {
      estabelecimentoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
