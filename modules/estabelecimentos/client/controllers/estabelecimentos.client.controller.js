(function () {
  'use strict';

  // Estabelecimentos controller
  angular
    .module('estabelecimentos')
    .controller('EstabelecimentosController', EstabelecimentosController);

  EstabelecimentosController.$inject = ['$scope', '$state', '$window', 'Authentication', 'estabelecimentoResolve'];

  function EstabelecimentosController ($scope, $state, $window, Authentication, estabelecimento) {
    var vm = this;

    vm.authentication = Authentication;
    vm.estabelecimento = estabelecimento;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Estabelecimento
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.estabelecimento.$remove($state.go('estabelecimentos.list'));
      }
    }

    // Save Estabelecimento
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.estabelecimentoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.estabelecimento._id) {
        vm.estabelecimento.$update(successCallback, errorCallback);
      } else {
        vm.estabelecimento.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('estabelecimentos.view', {
          estabelecimentoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
