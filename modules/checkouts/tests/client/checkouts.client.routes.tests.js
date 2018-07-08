(function () {
  'use strict';

  describe('Checkouts Route Tests', function () {
    // Initialize global variables
    var $scope,
      CheckoutsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _CheckoutsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      CheckoutsService = _CheckoutsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('checkouts');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/checkouts');
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
          CheckoutsController,
          mockCheckout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('checkouts.view');
          $templateCache.put('modules/checkouts/client/views/view-checkout.client.view.html', '');

          // create mock Checkout
          mockCheckout = new CheckoutsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Checkout Name'
          });

          // Initialize Controller
          CheckoutsController = $controller('CheckoutsController as vm', {
            $scope: $scope,
            checkoutResolve: mockCheckout
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:checkoutId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.checkoutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            checkoutId: 1
          })).toEqual('/checkouts/1');
        }));

        it('should attach an Checkout to the controller scope', function () {
          expect($scope.vm.checkout._id).toBe(mockCheckout._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/checkouts/client/views/view-checkout.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          CheckoutsController,
          mockCheckout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('checkouts.create');
          $templateCache.put('modules/checkouts/client/views/form-checkout.client.view.html', '');

          // create mock Checkout
          mockCheckout = new CheckoutsService();

          // Initialize Controller
          CheckoutsController = $controller('CheckoutsController as vm', {
            $scope: $scope,
            checkoutResolve: mockCheckout
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.checkoutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/checkouts/create');
        }));

        it('should attach an Checkout to the controller scope', function () {
          expect($scope.vm.checkout._id).toBe(mockCheckout._id);
          expect($scope.vm.checkout._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/checkouts/client/views/form-checkout.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          CheckoutsController,
          mockCheckout;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('checkouts.edit');
          $templateCache.put('modules/checkouts/client/views/form-checkout.client.view.html', '');

          // create mock Checkout
          mockCheckout = new CheckoutsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Checkout Name'
          });

          // Initialize Controller
          CheckoutsController = $controller('CheckoutsController as vm', {
            $scope: $scope,
            checkoutResolve: mockCheckout
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:checkoutId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.checkoutResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            checkoutId: 1
          })).toEqual('/checkouts/1/edit');
        }));

        it('should attach an Checkout to the controller scope', function () {
          expect($scope.vm.checkout._id).toBe(mockCheckout._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/checkouts/client/views/form-checkout.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
