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

            projectService.projectById.get({
                    projectId: $routeParams.projectId
                })
                .$promise.then(function(result) {
                    $scope.project = result;
                    $scope.reloadComments();
                    try {
                        permissionService.loadPermission($scope, result.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('project', $scope.project);
                        //$rootScope.$digest();
                    } catch (e) { console.log(e); }
                });

            $scope.loadGoJs = function() {
                var goJS = go.GraphObject.make;
                var myDiagram =
                    goJS(go.Diagram, "myDiagramDiv", {
                        initialContentAlignment: go.Spot.Center, // center Diagram contents
                        "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
                    });

                // the template we defined earlier
                myDiagram.nodeTemplate =
                    goJS(go.Node, "Horizontal", { background: "#44CCFF" },
                        goJS(go.Picture, { margin: 10, width: 50, height: 50, background: "red" },
                            new go.Binding("source")),
                        goJS(go.TextBlock, "Default Text", { margin: 12, stroke: "white", font: "bold 16px sans-serif" },
                            new go.Binding("text", "name"))
                    );

                var model = goJS(go.TreeModel);
                model.nodeDataArray = [ // the "key" and "parent" property names are required,
                    // but you can add whatever data properties you need for your app
                    { key: "1", name: "Don Meow", source: "http://static.srcdn.com/wp-content/uploads/Supergirl-TV-Video-Behind-Scenes-Episode-2.jpg" },
                    { key: "2", parent: "1", name: "Demeter", source: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/PfeifferCatwoman.jpg/250px-PfeifferCatwoman.jpg" },
                    { key: "3", parent: "1", name: "Copricat", source: "https://i1.wp.com/fusion.net/wp-content/uploads/2016/03/wonder_woman_ew_1200_800_81_s.jpg" },
                    { key: "4", parent: "3", name: "Jellylorum", source: "http://img2.wikia.nocookie.net/__cb20130223053953/onepiece/es/images/archive/9/97/20130223054235!Nami_portrait.png" },
                    { key: "5", parent: "3", name: "Alonzo", source: "https://www.themebeta.com/media/cache/resolve/728/files/chrome/images/201511/26/97841eb3eae186f476638244d7181b09.jpeg" },
                    { key: "6", parent: "2", name: "Munkustrap", source: "http://k42.kn3.net/taringa/2/4/9/8/4/3/24/manugnr1/40D.jpg" }
                ];
                myDiagram.model = model;
            }
            $scope.loadGoJs();
        }
    ]);
