'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupCtrl
 * @description
 * # MockupCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupCtrl', ['$scope', 'loginService', 'mockupService', 'breadcrumbService', '$routeParams', '$rootScope', 'headerService',
        function($scope, loginService, mockupService, breadcrumbService, $routeParams, $rootScope, headerService) {
        loginService.reloadScope();
        headerService.updateHeader('projects');

        $scope.mockupList = mockupService.mockups;
        $scope.mockup = null;
        $scope.logingLog = {};

        io.socket.get('/loginlog', function serverResponded (body, JWR) {
            console.log('Login log get');
            $scope.$apply(function() {
                for (var i = 0; i < body.length; i++) {
                    $scope.logingLog[body[i].username] = body[i];
                };
            });
        });

        io.socket.on('loginlog', function onServerSentEvent (msg) {
            console.log(msg);
            $scope.$apply(function(){
                $scope.logingLog[msg.data.username] = msg.data;
                $scope.logingLog[msg.data.username].online = true;// ((new Date(msg.data.createdAt)).getTime())
            });
        });

        mockupService.mockupById.get({
                mockupId: $routeParams.mockupId
            })
            .$promise.then(function(result) {
                $scope.mockup = result;
                $scope.viewObject = result;
                $scope.viewObject.title = 'Mockup View';
                $scope.viewObject.editUrl = 'project/' + result.project.id + '/mockup/edit/' + result.id;
                $scope.viewObject.editDesign = 'project/' + result.project.id + '/mockup-edit-design/' + result.id;
                $scope.viewObject.parentName = result.project.name;
                $scope.viewObject.parentUrl = '#/project/' + result.project.id;
                try {
                    $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup', $scope.mockup);
                    $rootScope.$digest();
                } catch(e) {}
            });
    }]);
