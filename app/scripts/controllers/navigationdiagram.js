'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:NavigationdiagramCtrl
 * @description
 * # NavigationdiagramCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('NavigationdiagramCtrl', ['$scope', '$rootScope', '$cookieStore', 'mockupService', 'loginService', 'projectService', '$routeParams', '$location', '$rootScope', 'breadcrumbService',
        'headerService', 'permissionService', 'commentService', 'workflowService',
        function($scope, $rootStore, $cookieStore, mockupService, loginService, projectService, $routeParams, $location, $rootScope, breadcrumbService,
            headerService, permissionService, commentService, workflowService) {
            headerService.updateHeader('projects');
            loginService.reloadScope();
            $scope.projectId = $routeParams.projectId;
            $scope.logingLog = {};
            $scope.relationId = 0;



            $scope.loadGoJs = function() {
                projectService.projectById.get({
                        projectId: $routeParams.projectId
                    })
                    .$promise.then(function(result) {
                        $scope.project = result;

                        var goJS = go.GraphObject.make;
                        var myDiagram =
                            goJS(go.Diagram, "myDiagramDiv", {
                                initialContentAlignment: go.Spot.Center, // center Diagram contents
                                "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
                            });

                        myDiagram.nodeTemplate =
                            goJS(go.Node, "Horizontal", { background: "#44CCFF" },
                                goJS(go.Picture, { margin: 10, width: 80, height: 80, background: "#bdc1c1" },
                                    new go.Binding("source")),
                                goJS(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                                    new go.Binding("text", "name"))
                            );
                        var model = goJS(go.TreeModel);

                        var nodeDataArrayAux = [];

                        for (var i = 0; i < $scope.project.mockups.length; i++) {
                            if (i == 0) {
                                nodeDataArrayAux.push({ key: (i + 1) + "", name: "Mockup " + i, source: "http://localhost:1337/images/" + $scope.project.mockups[i].id + ".png" })
                            } else {
                                nodeDataArrayAux.push({ key: (i + 1) + "", parent: (i) + "", name: "Mockup " + i, source: "http://localhost:1337/images/" + $scope.project.mockups[i].id + ".png" })
                            }
                        }
                        model.nodeDataArray = nodeDataArrayAux;
                        myDiagram.model = model;
                        $scope.reloadComments();
                        try {
                            permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project', $scope.project);
                            //$rootScope.$digest();
                        } catch (e) { console.log(e); }
                    });

            }
            $scope.loadGoJs();
        }
    ]);
