'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditDesignCtrl
 * @description
 * # MockupEditDesignCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditDesignCtrl', ['$scope', '$compile','$window', '$routeParams', 'mockupService', function($scope, $compile , $window, $routeParams, mockupService) {

        $scope.editObject = null;
        $scope.lastId = 2;

        mockupService.mockupById.get({
                mockupId: $routeParams.mockupId
            })
            .$promise.then(function(result) {
                console.log(result);
                $scope.editObject = result;
            });

        $scope.moveToTop = function($event){
            console.log($event);
            $event.target.parentNode.appendChild($event.target);
        };
        $scope.clickMenu = function(item){
            console.log(item);
        };

        $scope.menuList = ['menu1','menu2','menu3'];

        $scope.save = function() {
            mockupService.updateMockup.update({
                id: $scope.editObject.id
            }, $scope.editObject, function(result) {
                console.log(result);
                $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
            });
        }

        $scope.cancel = function() {
            $window.location.href = '#/project/' + $routeParams.projectId + '/mockup/' + $scope.editObject.id;
        }

        interact('.resize-drag')
            .draggable({
                // enable inertial throwing
                inertia: true,
                // keep the element within the area of it's parent
                restrict: {
                    restriction: "parent.parent",
                    endOnly: true,
                    elementRect: {
                        top: 0,
                        left: 0,
                        bottom: 1,
                        right: 1
                    }
                },

                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function(event) {
                    var textEl = event.target.querySelector('p');

                    textEl && (textEl.textContent =
                        'moved a distance of ' + (Math.sqrt(event.dx * event.dx +
                            event.dy * event.dy) | 0) + 'px');
                }
            })
            .resizable({
                edges: {
                    left: true,
                    right: true,
                    bottom: true,
                    top: true
                }
            })
            .on('resizemove', function(event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                // update the element's style
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            });

        function dragMoveListener(event) {
            var target = event.target,
                // keep the dragged position in the data-x/data-y attributes
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }

        // this is used later in the resizing demo
        window.dragMoveListener = dragMoveListener;

        $scope.addImage = function() {
            var myEl = angular.element(document.querySelector('#design-div'));
            myEl.append($compile('<image-item></image-item>')($scope));
        };

        $scope.bringToFront = function(idComponent) {
            var myEl = angular.element(document.querySelector('#' + idComponent));
            console.log(myEl);
            var containerEl = angular.element(document.querySelector('#design-div'));
            containerEl.append($compile(myEl)($scope));
            console.log('Append the ' + myEl);
        };

        $scope.sendToBackward = function(idComponent) {
            var myEl = angular.element(document.querySelector('#' + idComponent));
            console.log(myEl);
            var containerEl = angular.element(document.querySelector('#design-div'));
            containerEl.prepend($compile(myEl)($scope));
            console.log('Prepend the ' + myEl);
        };
    }]);
