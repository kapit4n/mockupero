'use strict';

describe('Controller: PermissionItemListCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var PermissionItemListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PermissionItemListCtrl = $controller('PermissionItemListCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PermissionItemListCtrl.awesomeThings.length).toBe(3);
  });
});
