(function () {
  'use strict';

  // Equipes controller
  angular
    .module('equipes')
    .controller('EquipesController', EquipesController);

  EquipesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'equipeResolve'];

  function EquipesController ($scope, $state, $window, Authentication, equipe) {
    var vm = this;

    vm.authentication = Authentication;
    vm.equipe = equipe;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Equipe
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.equipe.$remove($state.go('equipes.list'));
      }
    }

    // Save Equipe
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.equipeForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.equipe._id) {
        vm.equipe.$update(successCallback, errorCallback);
      } else {
        vm.equipe.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('equipes.view', {
          equipeId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
