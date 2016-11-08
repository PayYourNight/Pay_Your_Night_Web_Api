(function () {
  'use strict';

  angular
    .module('equipes')
    .controller('EquipesListController', EquipesListController);

  EquipesListController.$inject = ['EquipesService'];

  function EquipesListController(EquipesService) {
    var vm = this;

    vm.equipes = EquipesService.query();
  }
}());
