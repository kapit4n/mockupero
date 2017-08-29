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
        'headerService', 'permissionService', 'workflowService', 'GlobalService',
        function($scope, $rootStore, $cookieStore, mockupService, loginService, projectService, $routeParams, $location, $rootScope, breadcrumbService,
            headerService, permissionService, workflowService, GlobalService) {
            headerService.updateHeader('projects');
            loginService.reloadScope();
            $scope.projectId = $routeParams.projectId;
            $scope.logingLog = {};

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
                        var nodeDataArrayAux = [];
                        var linkDataArray = [];
                        for (var i = 0; i < $scope.project.mockups.length; i++) {
                            if (!$scope.project.mockups[i].isSuggest) {
                                if ($scope.project.mockups[i].links) {
                                    for (var j = 0; j < $scope.project.mockups[i].links.length; j++) {
                                        linkDataArray.push({
                                            from: $scope.project.mockups[i].id + "",
                                            to: $scope.project.mockups[i].links[j] + ""
                                        });
                                    }
                                }
                                if (i == 0) {
                                    nodeDataArrayAux.push({ key: $scope.project.mockups[i].id + "", name: "Mockup " + i, source: GlobalService.BASE_PATH + "/images/" + $scope.project.mockups[i].id + ".png" })
                                } else {
                                    nodeDataArrayAux.push({ key: $scope.project.mockups[i].id + "", name: "Mockup " + i, source: GlobalService.BASE_PATH + "/images/" + $scope.project.mockups[i].id + ".png" })
                                }
                            }
                        }
                        myDiagram.model = new go.GraphLinksModel(nodeDataArrayAux, linkDataArray);
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
