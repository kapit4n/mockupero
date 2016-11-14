'use strict';

describe('Controller: WorkflowNewCtrl', function () {

  // load the controller's module
  beforeEach(module('mockuperApp'));

  var WorkflowNewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WorkflowNewCtrl = $controller('WorkflowNewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(WorkflowNewCtrl.awesomeThings.length).toBe(3);
  });
});
