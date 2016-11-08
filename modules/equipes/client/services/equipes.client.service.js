// Equipes service used to communicate Equipes REST endpoints
(function () {
  'use strict';

  angular
    .module('equipes')
    .factory('EquipesService', EquipesService);

  EquipesService.$inject = ['$resource'];

  function EquipesService($resource) {
    return $resource('api/equipes/:equipeId', {
      equipeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
