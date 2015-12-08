'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditDesignCtrl
 * @description
 * # MockupEditDesignCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditDesignCtrl', ['$scope', '$rootScope', 'loginService', '$compile', '$window', '$routeParams', 'mockupService', '$timeout', '$http', '$cookieStore',
        function($scope, $rootScope, loginService, $compile, $window, $routeParams, mockupService, $timeout, $http, $cookieStore) {
            loginService.reloadScope();
            $scope.editObject = null;
            $scope.lastId = 2;
        $rootScope.hideFooter = true;
        $scope.logingLog = {};

        // move this code to socket services related to mockups
        io.socket.get('/mockupEditor/editors', {/*username: $cookieStore.get('username')*/}, function serverResponded (body, JWR) {
            console.log('Get of the mockupe editor');
            console.log(body);
        });

        // move this code to socket services related to mockups
        io.socket.get('/mockupEditor', {username: $cookieStore.get('username')}, function serverResponded (body, JWR) {
            console.log('Get of the mockup editor list');
            console.log(body);
            if (body.length > 0) {
                for (var i = 0; i < body.length; i++) {
                    $scope.logingLog[body[i].username] = body[i];
                }
            }
        });

        io.socket.post('/mockupEditor/editors', {username: $cookieStore.get('username')}, function serverResponded (body, JWR) {
            console.log('Post to mockup editors');
        });

        $scope.createImage = function() {
            html2canvas($("#design-div"), {
                onrendered: function(canvas) {
                    var theCanvas = canvas;
                    //document.body.appendChild(canvas);

                    /*// Convert and download as image 
                    Canvas2Image.saveAsPNG(canvas); 
                    $("#img-out").append(canvas)
                    console.log($("#img-out"));*/
                    var img = canvas.toDataURL("image/png");
                    //var dataURL = canvas.toDataURL();
                    $('#img-out').append('<img src="'+img+'" style="width: 100px; height: 100px;"/>');
                    
                    /*$('#img-out').append('<input type="file" name="'+ dataURL + '" style="width: 100px; height: 100px;"/>');
                    $($('#avatar')[0]).value = dataURL;
                    mockupService.createMockupItemUploadAvatar.save({avatar: dataURL}, function(result) {
                        console.log(result);
                        console.log('The image was uploaded');
                    });
                    
                    var fd = new FormData(document.getElementById('myform'));
                    //var fd = new FormData();
                    fd.append('avatar', $('#img-out')[0].file);
                    $http.post('http://localhost:1337/mockupItem/uploadAvatar', fd, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                    .success(function(){
                    })
                    .error(function(){
                    });*/
                }
            });
        }

        $scope.uploadAvatar = function() {

        }

        io.socket.get('/mockupeditor', function serverResponded (body, JWR) {
            console.log('Login log get');
            $scope.$apply(function() {
                for (var i = 0; i < body.length; i++) {
                    $scope.logingLog[body[i].username] = body[i];
                };
            });
        });

        io.socket.on('mockupeditor', function(msg) {
            if (msg.verb == 'updated') {
                console.log('updated mockup editor');
                console.log(msg);
            }
            $scope.$apply(function() {
                if (msg.data.offline) {
                    $scope.logingLog[msg.data.username] = msg.data;
                    $scope.logingLog[msg.data.username].online = false;
                } else {
                    $scope.logingLog[msg.data.username] = msg.data;
                }
            });
        });

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
                $scope.result = result;
            });

            $scope.item = {};

            $scope.save = function() {
                $("#spinner").show();
                $("#btnSave").prop('disabled', true);
                var myEl = angular.element(document.querySelector('#design-div'));
                var position = 0;
                angular.forEach(myEl[0].children, function(child) {
                    $timeout(function() {
                        position++;
                        $scope.item = $scope.getItem('#' + child.id);
                        $scope.item.position = position;
                        if ($scope.item.id === undefined) {
                            mockupService.createMockupItem.save($scope.item, function(result) {
                                //console.log(result);
                            });
                        } else {
                            mockupService.updateMockupItem.save({
                                id: $scope.item.id
                            }, $scope.item, function(result) {
                                //console.log(result);
                            });
                        }
                        $("#spinner").hide();
                        $("#btnSave").prop('disabled', false);
                    }, 4000);
                });
                $scope.createImage();
                $timeout(function() {
                    // this will be called on the save methods to create the version
                    io.socket.post('/mockupVersion/saveIt', {number: 'version 1', mockupId: $routeParams.mockupId}, function serverResponded (body, JWR) {
                        console.log('Creating our first mockup version');
                    });
                }, 5000);
            };

            $scope.getItemId = function(idComp) {
                var idResult = 0;
                if (idComp.indexOf('image') > -1) {
                    idResult = idComp.substring(7);
                } else {
                    idResult = idComp.substring(8);
                }
                return idResult;
            }

            $scope.getItem = function(idComp) {
                var item = {};
                if (idComp.length > 15) {
                    console.log(idComp.length);
                    console.log(idComp);

                    if (idComp.indexOf('image') > -1) {
                        item.id = idComp.substring(8);
                    } else {
                        item.id = idComp.substring(9);
                    }
                } else {
                    console.log(idComp);
                    item.id = undefined;
                }
                item.src = $(idComp)[0].src;
                item.y = $($(idComp)[0]).position().top;
                item.x = $($(idComp)[0]).position().left;
                if (idComp.indexOf('image') > -1) {
                    item.type = "image";
                    item.width = $(idComp)[0].width;
                    item.height = $(idComp)[0].height;
                } else {
                    item.type = "button";
                    /*item.width = $($(idComp)[0]).width();
                    item.height = $($(idComp)[0]).height();
                    */
                    item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length-2);
                    item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length-2);
                }
                
                item.idHtml = $(idComp)[0].id;
                item.mockupId = $routeParams.mockupId;

                if (item.type == "button") {
                    /*console.log('This is the values');
                    console.log($(idComp)[0]);
                    console.log(item);
                    console.log($($(idComp)[0]).width());
                    console.log($($(idComp)[0]).height());*/
                }

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
                io.socket.post('/mockupEditor/logout', {username: $cookieStore.get('username')}, function serverResponded (body, JWR) {
                    console.log('Mockup editor out');
                });
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
                    'style="padding:0; position: absolute;  z-index=' + $scope.lastId + '" src="static/mockups/items/image-icon.png" alt="...">';
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

            $scope.addButton = function() {
                var myEl = angular.element(document.querySelector('#design-div'));
                var myEl2 = angular.element(document.querySelector('#design-div-content-menu'));
                $scope.lastId++;
                var btnHtml = '<button id="new-button-' + $scope.lastId + 'x" context-menu data-target="menu-button-' + $scope.lastId + '" class="resize-drag" ' +
                    'style="padding:0; position: absolute; height: 52px; width: 150px; z-index=' + $scope.lastId + '" alt="...">';
                myEl.append($compile(btnHtml)($scope));
                var contentMenuHtml = '<div class="dropdown position-fixed" id="menu-button-' + $scope.lastId + '">' +
                    '    <ul class="dropdown-menu" role="menu">' +
                    '        <li>' +
                    '            <a class="pointer" role="menuitem" tabindex="1" ng-click="bringToFront(\'menu-button-' + $scope.lastId + 'x\');">Bring to FrontXX</a>' +
                    '        </li>' +
                    '        <li>' +
                    '            <a class="pointer" role="menuitem" tabindex="2" ng-click="sendToBackward(\'menu-button-' + $scope.lastId + 'x\');">Send BackwardXX</a>' +
                    '        </li>' +
                    '    </ul>' +
                    '</div>';
                myEl2.append($compile(contentMenuHtml)($scope));
            };

            // Throws the mockup item to the front of the designer, use the z-index to fix this
            $scope.bringToFront = function(idComponent) {
                var myEl = angular.element(document.querySelector('#' + idComponent));
                var containerEl = angular.element(document.querySelector('#design-div'));
                containerEl.append(myEl);
            };

            // Updated the mockup item to the backward part, we have to modify this method using the z-index
            $scope.sendToBackward = function(idComponent) {
                var myEl = angular.element(document.querySelector('#' + idComponent));
                var containerEl = angular.element(document.querySelector('#design-div'));
                containerEl.prepend(myEl);
            };

            // Method to load the properties for the existend mockup items
            $scope.loadProperties = function(idComponent) {
                var containerEl = angular.element(document.querySelector('#properties'));
                var example = '';
                if (idComponent.indexOf('image') > -1) {
                    example = imageProperties(idComponent);
                } else {
                    example = buttonProperties(idComponent);
                }
                containerEl.html($compile(example)($scope));
                $('#myProperties').modal('toggle');
            };

            // Loads the button properties to a popup
            function buttonProperties(idComponent) {
                var myElww = angular.element(document.querySelector('#' + idComponent));
                var topPosition = parseInt($($('#' + idComponent)[0]).position().top);
                var leftPosition = parseInt($($('#' + idComponent)[0]).position().left);
                var myEl = '<button type="button" class="close" aria-hidden="true" ng-click="closeProperties()">&times;</button>' +
                    '<form class="form-horizontal" role="form" >' +
                    '    <div class="form-group">' +
                    '        <div class="col-md-12">' +
                    '            <div class="form-group row">' +
                    '                <label for="widtValue" class="col-md-1 control-label">witdh</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="widthValue" placeholder="Value" value="' + $(myElww[0])[0].style.width + '">' +
                    '                </div>' +
                    '                <label for="heightValue" class="col-md-1 control-label">height</label>' +
                    '                <div class="col-md-5">' +
                    '                    <input type="text" class="form-control" id="heightValue" placeholder="Value" value="' + $(myElww[0])[0].style.height + '">' +
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

            // This load the image properties to a popup
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
                    '<button type="submit" class="btn btn-success" ng-click="saveImageProperties(\'' + idComponent + '\')">Save</button>'

                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</form>';
                return myEl;
            }

            // save te properties of a button by now
            $scope.saveProperties = function(idComponent) {
                var component = angular.element(document.querySelector('#' + idComponent));
                var heightValue = angular.element(document.querySelector('#heightValue'));
                var widthValue = angular.element(document.querySelector('#widthValue'));
                var topValue = angular.element(document.querySelector('#topValue'));
                var leftValue = angular.element(document.querySelector('#leftValue'));
                component[0].style.width = widthValue[0].value;
                component[0].style.height = heightValue[0].value;
                component[0].style.top = topValue[0].value + 'px';
                component[0].style.left = leftValue[0].value + 'px';
                $('#myProperties').modal('hide');

            };

            // Update the item selected to edit the properties and close/hide the popup
            $scope.saveImageProperties = function(idComponent) {
                var component = angular.element(document.querySelector('#' + idComponent));
                var hrefValue = angular.element(document.querySelector('#hrefValue'));
                var heightValue = angular.element(document.querySelector('#heightValue'));
                var widthValue = angular.element(document.querySelector('#widthValue'));
                var topValue = angular.element(document.querySelector('#topValue'));
                var leftValue = angular.element(document.querySelector('#leftValue'));
                component[0].style.width = widthValue[0].value + 'px';
                component[0].style.height = heightValue[0].value + 'px';
                component[0].style.top = topValue[0].value + 'px';
                component[0].style.left = leftValue[0].value + 'px';
                component[0].src = hrefValue[0].value;
                $('#myProperties').modal('hide');
            };

            // close the properties popup
            $scope.closeProperties = function() {
                var containerEl = angular.element(document.querySelector('#properties'));
                containerEl.html($compile('')($scope));
            };

            // Method to delete a item from the design board
            $scope.deleteItem = function(idComponent) {
                var myElww = angular.element(document.querySelector('#' + idComponent));
                myElww.remove();
                var itemId = $scope.getItemId(idComponent);
                mockupService.deleteMockupItem.deleteIt({
                    id: itemId
                }).$promise.then(function(result) {
                    console.log('Item deleted');
                });
            }

            // move this code to some service to have all sockets methods in the same place
            io.socket.get('/mockupVersion', {username: $cookieStore.get('username')}, function serverResponded (body, JWR) {
                console.log('Subscribe to mockup version');
            });

            // I need to listen the changes on the mockups, take care the eventIdentity must it be lowercase
            io.socket.on('mockupversion', function(msg) {
                $scope.$apply(function() {
                    if (msg.data.mockupId == $routeParams.mockupId) {
                        console.log(' Updated and we need to reload the data');
                        $scope.loadMockupItems();
                    }
                });
            });

            $scope.loadMockupItems = function() {
                mockupService.getMockupItems.get({
                    sort: 'position ',
                    where: {
                        mockupId: $routeParams.mockupId
                    }
                }).$promise.then(function(result) {
                    $scope.result = result;
                });
            }; // end of the load mockup items
        }// end of the controller function
    ]);
