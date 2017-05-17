'use strict';

describe('Controller: PermissionItemNewCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionItemNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionItemNewCtrl = $controller('PermissionItemNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionItemNewCtrl.awesomeThings.length).toBe(3);
  });
});
