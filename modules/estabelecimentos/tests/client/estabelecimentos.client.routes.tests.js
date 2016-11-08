(function () {
  'use strict';

  describe('Estabelecimentos Route Tests', function () {
    // Initialize global variables
    var $scope,
      EstabelecimentosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EstabelecimentosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EstabelecimentosService = _EstabelecimentosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('estabelecimentos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/estabelecimentos');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          EstabelecimentosController,
          mockEstabelecimento;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('estabelecimentos.view');
          $templateCache.put('modules/estabelecimentos/client/views/view-estabelecimento.client.view.html', '');

          // create mock Estabelecimento
          mockEstabelecimento = new EstabelecimentosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Estabelecimento Name'
          });

          // Initialize Controller
          EstabelecimentosController = $controller('EstabelecimentosController as vm', {
            $scope: $scope,
            estabelecimentoResolve: mockEstabelecimento
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:estabelecimentoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.estabelecimentoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            estabelecimentoId: 1
          })).toEqual('/estabelecimentos/1');
        }));

        it('should attach an Estabelecimento to the controller scope', function () {
          expect($scope.vm.estabelecimento._id).toBe(mockEstabelecimento._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/estabelecimentos/client/views/view-estabelecimento.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EstabelecimentosController,
          mockEstabelecimento;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('estabelecimentos.create');
          $templateCache.put('modules/estabelecimentos/client/views/form-estabelecimento.client.view.html', '');

          // create mock Estabelecimento
          mockEstabelecimento = new EstabelecimentosService();

          // Initialize Controller
          EstabelecimentosController = $controller('EstabelecimentosController as vm', {
            $scope: $scope,
            estabelecimentoResolve: mockEstabelecimento
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.estabelecimentoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/estabelecimentos/create');
        }));

        it('should attach an Estabelecimento to the controller scope', function () {
          expect($scope.vm.estabelecimento._id).toBe(mockEstabelecimento._id);
          expect($scope.vm.estabelecimento._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/estabelecimentos/client/views/form-estabelecimento.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EstabelecimentosController,
          mockEstabelecimento;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('estabelecimentos.edit');
          $templateCache.put('modules/estabelecimentos/client/views/form-estabelecimento.client.view.html', '');

          // create mock Estabelecimento
          mockEstabelecimento = new EstabelecimentosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Estabelecimento Name'
          });

          // Initialize Controller
          EstabelecimentosController = $controller('EstabelecimentosController as vm', {
            $scope: $scope,
            estabelecimentoResolve: mockEstabelecimento
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:estabelecimentoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.estabelecimentoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            estabelecimentoId: 1
          })).toEqual('/estabelecimentos/1/edit');
        }));

        it('should attach an Estabelecimento to the controller scope', function () {
          expect($scope.vm.estabelecimento._id).toBe(mockEstabelecimento._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/estabelecimentos/client/views/form-estabelecimento.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
