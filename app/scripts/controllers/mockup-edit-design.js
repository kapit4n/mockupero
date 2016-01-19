'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditDesignCtrl
 * @description
 * # MockupEditDesignCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditDesignCtrl', ['$scope', '$rootScope', 'loginService', '$compile', '$window', '$routeParams', 'mockupService', '$timeout', '$http', '$cookieStore', 'propertyService', 'notificationService',
        function($scope, $rootScope, loginService, $compile, $window, $routeParams, mockupService, $timeout, $http, $cookieStore, propertyService, notificationService) {
            loginService.reloadScope();
            $scope.editObject = null;
            $scope.lastId = 0;
            $rootScope.hideFooter = true;
            $scope.logingLog = {};

            // move this code to socket services related to mockups
            io.socket.get('/mockupEditor/editors', {
                username: $cookieStore.get('username'),
                roomName: $routeParams.mockupId
            }, function serverResponded(body, JWR) {
                //console.log('Subscribe the mockup editor');
            });

            io.socket.post('/mockupEditor/editors', {
                username: $cookieStore.get('username')
            }, function serverResponded(body, JWR) {
                //console.log('Mockup editor post');
            });

            // Some source code to save min image that we are to use on the mockup preview and version of the mockup
            $scope.createImage = function() {
                html2canvas($("#design-div"), {
                    onrendered: function(canvas) {
                        var theCanvas = canvas;
                        //document.body.appendChild(canvas);

                        /*// Convert and download as image 
                        Canvas2Image.saveAsPNG(canvas); 
                        $("#img-out").append(canvas)
                        //console.log($("#img-out"));*/
                        var img = canvas.toDataURL("image/png");
                        //var dataURL = canvas.toDataURL();
                        $('#img-out').append('<img src="' + img + '" style="width: 100px; height: 100px;"/>');

                        /*$('#img-out').append('<input type="file" name="'+ dataURL + '" style="width: 100px; height: 100px;"/>');
                        $($('#avatar')[0]).value = dataURL;
                        mockupService.createMockupItemUploadAvatar.save({avatar: dataURL}, function(result) {
                            //console.log(result);
                            //console.log('The image was uploaded');
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

            // move this code to socket services related to mockups
            io.socket.get('/mockupeditor', function serverResponded(body, JWR) {
                $scope.$apply(function() {
                    for (var i = 0; i < body.length; i++) {
                        $scope.logingLog[body[i].username] = body[i];
                    };
                });
                io.socket.get('/mockupeditor/getSocketId', function serverResponded(body, JWR) {
                    //console.log('Socket Id: ');
                });

            });

            // move this code to socket services related to mockups
            io.socket.get('/mockupeditor/getEditors', {
                username: $cookieStore.get('username'),
                roomName: $routeParams.mockupId
            }, function serverResponded(body, JWR) {
                //console.log('get Editors');
            });

            // method that listen the mockup editors
            io.socket.on('mockupeditor', function(msg) {
                if (msg.verb == 'updated') {
                    //console.log('updated mockup editor');
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
                    //console.log(result);
                    $scope.editObject = result;
                });

            $scope.moveToTop = function($event) {
                //console.log($event);
                $event.target.parentNode.appendChild($event.target);
            };
            $scope.clickMenu = function(item) {
                //console.log(item);
            };

            $scope.menuList = ['menu1', 'menu2', 'menu3'];

            $scope.result = [];


            $scope.loadMockupItems = function() {
                mockupService.getMockupItems.get({
                    sort: 'position ',
                    where: {
                        mockupId: $routeParams.mockupId
                    }
                }).$promise.then(function(result) {
                    $scope.result = result;
                    var positionAux = 0;
                    angular.forEach($scope.result, function(value, key) {
                        if (positionAux < value.position) {
                            $scope.lastId = value.position;
                        }
                    }, []);
                });
            }; // end of the load mockup items

            // This code is duplicated, replace this code using $scope.loadMockupItems();
            $scope.loadMockupItems();

            $scope.item = {};

            // save the mockup item modifications
            $scope.save = function() {
                $("#spinner").show();
                $("#btnSave").prop('disabled', true);
                var myEl = angular.element(document.querySelector('#design-div'));
                var position = 0;
                angular.forEach(myEl[0].children, function(child) {
                    $timeout(function() {
                        position++;
                        $scope.item = $scope.getItem('#' + child.id);
                        //$scope.item.position = position;
                        if ($scope.item.id === undefined) {
                            mockupService.createMockupItem.save($scope.item, function(result) {
                                ////console.log(result);
                            });
                        } else {
                            mockupService.updateMockupItem.save({
                                id: $scope.item.id
                            }, $scope.item, function(result) {
                                ////console.log(result);
                            });
                        }
                        $("#spinner").hide();
                        $("#btnSave").prop('disabled', false);
                    }, 4000);
                });
                $scope.createImage();
                $timeout(function() {
                    // this will be called on the save methods to create the version
                    io.socket.post('/mockupVersion/saveIt', {
                        number: 'version 1',
                        mockupId: $routeParams.mockupId,
                        username: $cookieStore.get('username')
                    }, function serverResponded(body, JWR) {
                        //console.log('Creating our first mockup version');
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

            /**
                This id has # included in the string
            */
            $scope.getItem = function(idComp) {
                var item = {};
                if (idComp.length > 15) {
                    ////console.log(idComp.length);
                    ////console.log(idComp);

                    if (idComp.indexOf('image') > -1) {
                        item.id = idComp.substring(8);
                    } else {
                        item.id = idComp.substring(9);
                    }
                } else {
                    ////console.log(idComp);
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
                    item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length - 2);
                    item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length - 2);
                    item.text = $(idComp).text();
                }
                //var zIndex = $( '#' + idComp ).css( "z-index" );
                var zIndex = $(idComp).css("z-index");
                item.idHtml = $(idComp)[0].id;
                item.mockupId = $routeParams.mockupId;

                if (item.type == "button") {
                    /*//console.log('This is the values');
                    //console.log($(idComp)[0]);
                    //console.log(item);
                    //console.log($($(idComp)[0]).width());
                    //console.log($($(idComp)[0]).height());*/
                }

                return {
                    "id": item.id,
                    "text": item.text,
                    "width": item.width,
                    "height": item.height,
                    "y": item.y,
                    "x": item.x,
                    "position": zIndex,
                    "type": item.type,
                    "idHtml": item.idHtml,
                    "src": item.src,
                    "mockupId": item.mockupId
                };
            }

            $scope.cancel = function() {
                io.socket.post('/mockupEditor/logout', {
                    username: $cookieStore.get('username')
                }, function serverResponded(body, JWR) {
                    ////console.log('Mockup editor out');
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
                        x = (parseFloat(target.getAttribute('top')) || 0),
                        y = (parseFloat(target.getAttribute('left')) || 0);

                    // update the element's style
                    target.style.width = event.rect.width + 'px';
                    target.style.height = event.rect.height + 'px';

                    // translate when resizing from top or left edges
                    x += event.deltaRect.left;
                    y += event.deltaRect.top;

                    target.style.webkitTransform = target.style.transform =
                        'translate(' + x + 'px,' + y + 'px)';

                    target.setAttribute('top', x);
                    target.setAttribute('left', y);
                });

            // use component draggings by types here 
            function dragMoveListener(event) {
                ////console.log(event.target);
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('top')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('left')) || 0) + event.dy;

                // translate the element
                target.style.webkitTransform =
                    target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
                // update the posiion attributes

                target.setAttribute('top', x);
                target.setAttribute('left', y);
            }

            // this is used later in the resizing demo
            window.dragMoveListener = dragMoveListener;

            // Method to add a image to the design div
            $scope.addImage = function() {
                propertyService.addImage($scope, $compile);
            };

            $scope.addButton = function() {
                propertyService.addButton($scope, $compile);
            };

            // Throws the mockup item to the front of the designer, use the z-index to fix this
            $scope.bringToFront = function(idComponent) {
                var zIndex = $scope.getZ_Index(idComponent);
                zIndex++;
                //console.log(zIndex);
                $($('#' + idComponent)[0]).css("z-index", zIndex);
                $scope.updateOtherZ_Index(idComponent, zIndex, false);
            };

            // Updated the mockup item to the backward part, we have to modify this method using the z-index
            $scope.sendToBackward = function(idComponent) {
                var zIndex = $scope.getZ_Index(idComponent);
                zIndex--;
                //console.log(zIndex);
                if (zIndex >= 0) {
                    $scope.updateZ_Index(idComponent, zIndex);
                    $scope.updateOtherZ_Index(idComponent, zIndex, true);
                }
            };

            // update the other z index after we update some z index
            $scope.updateOtherZ_Index = function(idComponent, zIndex, backward) {
                var myEl = angular.element(document.querySelector('#design-div'));
                var position = 0;
                angular.forEach(myEl[0].children, function(child) {
                    if (child.id != idComponent && $scope.getZ_Index(child.id) == zIndex) {
                        if (backward) {
                            $scope.updateZ_Index(child.id, zIndex + 1);
                        } else {
                            $scope.updateZ_Index(child.id, zIndex - 1);
                        }
                        //console.log($scope.getZ_Index(child.id));
                    }
                });
            };

            // 
            $scope.getZ_Index = function(idComponent) {
                return $('#' + idComponent).css("z-index");
            };

            $scope.updateZ_Index = function(idComponent, zIndex) {
                $($('#' + idComponent)[0]).css("z-index", zIndex);
            };

            // Updated the mockup item to the backward part, we have to modify this method using the z-index
            $scope.sendToBackward_back = function(idComponent) {
                var myComponent = angular.element(document.querySelector('#' + idComponent));
                var designDiv = angular.element(document.querySelector('#design-div'));
                designDiv.prepend(myComponent);
            };

            // Method to load the properties for the existend mockup items
            $scope.loadProperties = function(idComponent) {
                var propertiesDiv = angular.element(document.querySelector('#properties'));
                var myComponent = '';
                if (idComponent.indexOf('image') > -1) {
                    myComponent = propertyService.image(idComponent);
                } else {
                    myComponent = propertyService.button(idComponent);
                }
                propertiesDiv.html($compile(myComponent)($scope));
                $('#myProperties').modal('toggle');
            };

            // Loads the button properties to a popup

            // save te properties of a button by now
            $scope.saveButtonProperties = propertyService.saveButton;

            // Update the item selected to edit the properties and close/hide the popup
            $scope.saveImageProperties = propertyService.saveImage;

            // close the properties popup
            $scope.closeProperties = propertyService.close;

            // Method to delete a item from the design board
            $scope.deleteItem = function(idComponent) {
                var component = angular.element(document.querySelector('#' + idComponent));
                component.remove();
                var itemId = $scope.getItemId(idComponent);
                mockupService.deleteMockupItem.deleteIt({
                    id: itemId
                }).$promise.then(function(result) {
                    //console.log('Item deleted');
                });
            }

            // move this code to some service to have all sockets methods in the same place
            io.socket.get('/mockupVersion', {
                username: $cookieStore.get('username')
            }, function serverResponded(body, JWR) {
                //console.log('Subscribe to mockup version');
            });

            // I need to listen the changes on the mockups, take care the eventIdentity must it be lowercase
            io.socket.on('mockupversion', function(msg) {
                //console.log('Mockup version update');
                //console.log(msg);

                $scope.$apply(function() {
                    if (msg.data.mockupId == $routeParams.mockupId) {
                        //console.log(' Updated and we need to reload the data');
                        $("#alert_message_text").text('Updated by ' + msg.data.username);
                        $scope.loadMockupItems();
                        // send a little notification by here
                        /*notificationService.sendMail.get({
                            to: 'luis.arce22@gmail.com',
                            subject: 'Subject send from mockup edit design',
                            text: 'This is the text send from mockup edit design'
                        })
                        .$promise.then(function(result) {
                            //console.log(result);
                        });
                        */
                    }
                });
            });

        } // end of the controller function
    ]);