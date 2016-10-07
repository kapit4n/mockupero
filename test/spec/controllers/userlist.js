'use strict';

describe('Controller: UserlistCtrl', function() {

    // load the controller's module
    beforeEach(module('mockuperApp'));

    var UserlistCtrl,
        scope, rootScope;
    var result = [{
        name: 'Home',
        url: ''
    }];

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        UserlistCtrl = $controller('UserlistCtrl', {
            $scope: scope
                // place here mocked dependencies
        });
    }));

    it('should attach a list of awesomeThings to the scope', function() {
        expect(angular.isArray(scope.users)).toBe(true);
        expect(rootScope.breadcrumb[0]['Home']).toBe(result[0]['Home']);
    });
});
