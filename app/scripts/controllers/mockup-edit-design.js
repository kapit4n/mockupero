'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditDesignCtrl
 * @description
 * # MockupEditDesignCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditDesignCtrl', ['$scope', '$compile', '$window', '$routeParams', 'mockupService', '$timeout',
        function($scope, $compile, $window, $routeParams, mockupService, $timeout) {

            $scope.editObject = null;
            $scope.lastId = 2;

            mockupService.mockupById.get({
                    mockupId: $routeParams.mockupId
                })
                .$promise.then(function(result) {
                    console.log(result);
                    $scope.editObject = result;
                });

            $scope.moveToTop = function($event) {
                console.log($event);
                $event.target.parentNode.appendChild($event.target);
            };
            $scope.clickMenu = function(item) {
                console.log(item);
            };

            $scope.menuList = ['menu1', 'menu2', 'menu3'];

            $scope.result = [];

            mockupService.getMockupItems.get({
                sort: 'position ',
                where: {
                    mockupId: $routeParams.mockupId
                }
            }).$promise.then(function(result) {
                console.log(result);
                $scope.result = result;
            });

            $scope.item = {};

            $scope.save = function() {
                var myEl = angular.element(document.querySelector('#design-div'));
                var position = 0;
                angular.forEach(myEl[0].children, function(child) {
                    $timeout(function() {
                        position++;
                        $scope.item = $scope.getItem('#' + child.id);
                        $scope.item.position = position;
                        if ($scope.item.id === undefined) {
                            mockupService.createMockupItem.save($scope.item, function(result) {
                                console.log(result);
                            });
                        } else {
                            mockupService.updateMockupItem.save({
                                id: $scope.item.id
                            }, $scope.item, function(result) {
                                console.log(result);
                            });
                        }
                    }, 4000);
                });
            };

            $scope.getItem = function(idComp) {
                var item = {};
                if (idComp.length > 15) {
                    console.log(idComp.length);
                    console.log(idComp);

                    item.id = idComp.substring(8);
                } else {
                    console.log(idComp);
                    item.id = undefined;
                }
                console.log($(idComp)[0]);
                item.width = $(idComp)[0].width;
                item.height = $(idComp)[0].height;
                item.src = $(idComp)[0].src;
                item.y = $($(idComp)[0]).position().top;
                item.x = $($(idComp)[0]).position().left;
                item.type = "image";
                item.idHtml = $(idComp)[0].id;
                item.mockupId = $routeParams.mockupId;

                return {
                    "id": item.id,
                    "width": item.width,
                    "height": item.height,
                    "y": item.y,
                    "x": item.x,
                    "type": item.type,
                    "idHtml": item.idHtml,
                    "src": item.src,
                    "mockupId": item.mockupId
                };
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
                var myEl2 = angular.element(document.querySelector('#design-div-content-menu'));
                $scope.lastId++;
                var imgHtml = '<img id="new-image-' + $scope.lastId + 'x" context-menu data-target="menu-image-' + $scope.lastId + '" class="resize-drag" ' +
                    'style="padding:0; position: absolute;" src="http://dreamatico.com/data_images/girl/girl-8.jpg" alt="...">';
                myEl.append($compile(imgHtml)($scope));

                var contentMenuHtml = '<div class="dropdown position-fixed" id="menu-image-' + $scope.lastId + '">' +
                    '    <ul class="dropdown-menu" role="menu">' +
                    '        <li>' +
                    '            <a class="pointer" role="menuitem" tabindex="1" ng-click="bringToFront(\'menu-image-' + $scope.lastId + 'x\');">Bring to FrontXX</a>' +
                    '        </li>' +
                    '        <li>' +
                    '            <a class="pointer" role="menuitem" tabindex="2" ng-click="sendToBackward(\'menu-image-' + $scope.lastId + 'x\');">Send BackwardXX</a>' +
                    '        </li>' +
                    '    </ul>' +
                    '</div>';
                myEl2.append($compile(contentMenuHtml)($scope));



            };

            $scope.bringToFront = function(idComponent) {
                var myEl = angular.element(document.querySelector('#' + idComponent));
                var containerEl = angular.element(document.querySelector('#design-div'));
                containerEl.append(myEl);
            };

            $scope.sendToBackward = function(idComponent) {
                var myEl = angular.element(document.querySelector('#' + idComponent));
                var containerEl = angular.element(document.querySelector('#design-div'));
                containerEl.prepend(myEl);
            };

            $scope.loadProperties = function(idComponent) {
                var containerEl = angular.element(document.querySelector('#properties'));
                var example = imageProperties(idComponent);
                containerEl.html($compile(example)($scope));
            };

            function imageProperties(idComponent) {
                var myElww = angular.element(document.querySelector('#' + idComponent));
                var topPosition = parseInt($($('#' + idComponent)[0]).position().top);
                var leftPosition = parseInt($($('#' + idComponent)[0]).position().left);

                var myEl = '<button type="button" class="close" aria-hidden="true" ng-click="closeProperties()">&times;</button>' +
                    '<form class="form-horizontal" role="form">' +
                    '    <div class="form-group">' +
                    '        <div class="col-md-12">' +
                    '            <div class="form-group row">' +
                    '                <label for="hrefValue" class="col-md-1 control-label">src</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="hrefValue" placeholder="https://exampleImage.com" value="' + myElww[0].src + '">' +
                    '                </div>' +
                    '                <label for="widtValue" class="col-md-1 control-label">witdh</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="widthValue" placeholder="Value" value="' + myElww[0].width + '">' +
                    '                </div>' +
                    '                <label for="heightValue" class="col-md-1 control-label">height</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="heightValue" placeholder="Value" value="' + myElww[0].height + '">' +
                    '                </div>' +
                    '                <label for="topValue" class="col-md-1 control-label">top</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="topValue" placeholder="Value" value="' + topPosition + '">' +
                    '                </div>' +
                    '                <label for="leftValue" class="col-md-1 control-label">left</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="leftValue" placeholder="Value" value="' + leftPosition + '">' +
                    '                </div>' +
                    '<button type="submit" class="btn btn-success" ng-click="saveProperties(\'' + idComponent + '\')">Save</button>'

                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</form>';
                return myEl;

            }

            $scope.saveProperties = function(idComponent) {
                console.log(idComponent);
                var component = angular.element(document.querySelector('#' + idComponent));
                var hrefValue = angular.element(document.querySelector('#hrefValue'));
                var heightValue = angular.element(document.querySelector('#heightValue'));
                var widthValue = angular.element(document.querySelector('#widthValue'));
                var topValue = angular.element(document.querySelector('#topValue'));
                var leftValue = angular.element(document.querySelector('#leftValue'));
                console.log(heightValue[0].value);
                console.log(widthValue[0].value);

                component[0].style.width = widthValue[0].value + 'px';
                component[0].style.height = heightValue[0].value + 'px';
                component[0].style.top = topValue[0].value + 'px';
                component[0].style.left = leftValue[0].value + 'px';
                component[0].src = hrefValue[0].value;


            };

            $scope.closeProperties = function() {
                var containerEl = angular.element(document.querySelector('#properties'));
                containerEl.html($compile('')($scope));
            };
        }
    ]);
