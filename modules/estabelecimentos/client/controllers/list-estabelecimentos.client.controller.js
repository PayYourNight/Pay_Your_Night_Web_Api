(function () {
  'use strict';

  angular
    .module('estabelecimentos')
    .controller('EstabelecimentosListController', EstabelecimentosListController);

  EstabelecimentosListController.$inject = ['EstabelecimentosService'];

  function EstabelecimentosListController(EstabelecimentosService) {
    var vm = this;

    vm.estabelecimentos = EstabelecimentosService.query();
  }
}());
