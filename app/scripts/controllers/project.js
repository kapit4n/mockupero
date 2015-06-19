'use strict';

/**
 * @ngdoc function
 * @name myYoProjectApp.controller:ProjectCtrl
 * @description
 * # ProjectCtrl
 * Controller of the myYoProjectApp
 */
angular.module('myYoProjectApp')
    .controller('ProjectCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.addMockup = function() {
            $location.path('/mockup-new');
        };
        $scope.workflows = [{
            name: 'start',
            functionName: '',
            className : 'btn-primary'
        }, {
            name: 'close',
            functionName: '',
            className : 'btn-success'
        }, {
            name: 'abandon',
            functionName: '',
            className : 'btn-danger'
        }];
        $scope.mockups = [{
            id: 0,
            name: 'Mockup 1',
            img: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
            description: 'abandon'
        }, {
            id: 1,
            name: 'Mockup 2',
            img: 'http://cameronbarrett.com/images/lg_ia1.gif',
            description: 'abandon'
        }, {
            id: 2,
            name: 'Mockup 3',
            img: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
            description: 'abandon'
        }, {
            id: 3,
            name: 'Mockup 4',
            img: 'http://cameronbarrett.com/images/lg_ia1.gif',
            description: 'abandon'
        }, {
            id: 0,
            name: 'Mockup 1',
            img: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
            description: 'abandon'
        }, {
            id: 1,
            name: 'Mockup 2',
            img: 'http://cameronbarrett.com/images/lg_ia1.gif',
            description: 'abandon'
        }, {
            id: 2,
            name: 'Mockup 3',
            img: 'http://community.protoshare.com/wp-content/uploads/2010/12/example4-anim.gif',
            description: 'abandon'
        }, {
            id: 3,
            name: 'Mockup 4',
            img: 'http://cameronbarrett.com/images/lg_ia1.gif',
            description: 'abandon'
        }];
    }]);
