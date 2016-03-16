'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupEditDesignCtrl
 * @description
 * # MockupEditDesignCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('MockupEditDesignCtrl', ['$scope', '$rootScope', 'loginService', '$compile', '$window', '$routeParams', 'mockupService',
        '$timeout', '$http', '$cookieStore', 'propertyService', 'notificationService', 'breadcrumbService', 'headerService', 'chatService',
        'mockupSocketService',
        function($scope, $rootScope, loginService, $compile, $window, $routeParams, mockupService,
                 $timeout, $http, $cookieStore, propertyService, notificationService, breadcrumbService, headerService, chatService,
                 mockupSocketService) {
            loginService.reloadScope();
            
            headerService.updateHeader('projects');
            $scope.chatRoom = $routeParams.mockupId;
            $scope.editObject = null;
            $scope.chatCollapsed = true;
            $scope.lastId = 0;
            $rootScope.hideFooter = true;
            $scope.logingLog = {};
            $scope.viewMode = false;
            if ($scope.viewMode) {
                $scope.itemStyle = '';
            } else {
                $scope.itemStyle = 'resize-drag';
            }

            $scope.changeChat = function() {
                console.log('Updated chatCollapsed');
                $scope.chatCollapsed = !$scope.chatCollapsed;
            };

            // Some source code to save min image that we are to use on the mockup preview and version of the mockup
            $scope.createImage = function() {
                html2canvas($("#design-div"), {
                    onrendered: function(canvas) {
                        var ctx = canvas.getContext('2d');
                        var dataURL = canvas.toDataURL();
                        $('#img-out').append('<img src="' + dataURL + '" style="width: 100px; height: 100px;"/>');
                        mockupService.createMockupItemUploadAvatar.save({img: dataURL, mockupId: $routeParams.mockupId}, function(result) {
                            //console.log(result);
                        });
                    }
                });
            }

            mockupService.mockupById.get({
                    mockupId: $routeParams.mockupId
                })
                .$promise.then(function(result) {
                    $scope.editObject = result;
                    try {
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup', $scope.editObject);
                        $rootScope.$digest();
                    } catch(e) {}
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
                    },
                    limit: 100
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
                    }, 50);
                });
                $scope.createImage();
                $timeout(function() {
                    // this will be called on the save methods to create the version
                    io.socket.post('/mockupVersion/saveIt', {
                        number: 'version 1',
                        mockupId: $routeParams.mockupId,
                        username: $cookieStore.get('username'),
                        action: 'update',
                        message: 'Update the Mockup'
                    }, function serverResponded(body, JWR) {
                        //console.log('Creating our first mockup version');
                    });
                }, 2000);
            };

            // This id has # included in the string
            $scope.getItemId = function(idComp) {
                var idResult = 0;
                if (idComp.indexOf('image') > -1) {
                    idResult = idComp.substring(7);
                } else if  (idComp.indexOf('button') > -1)  {
                    idResult = idComp.substring(8);
                } else if  (idComp.indexOf('input') > -1)  {
                    idResult = idComp.substring(7);
                } else if  (idComp.indexOf('label') > -1)  {
                    idResult = idComp.substring(7);
                }
                return idResult;
            }

            /**
                This id has # included in the string
            */
            $scope.getItem = function(idComp) {
                var item = {};
                if (idComp.length > 15) {
                    if (idComp.indexOf('image') > -1) {
                        item.id = idComp.substring(8);
                    } else if (idComp.indexOf('button') > -1) {
                        item.id = idComp.substring(9);
                    } else  if (idComp.indexOf('input') > -1) {
                        item.id = idComp.substring(8);
                    } else if (idComp.indexOf('label') > -1 ) {
                        item.id = idComp.substring(8);
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
                } else if (idComp.indexOf('button') > -1){
                    item.type = "button";
                    item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length - 2);
                    item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length - 2);
                    item.text = $(idComp).text();
                } else if (idComp.indexOf('input') > -1){
                    item.type = "input";
                    item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length);
                    item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length);
                    item.text = $(idComp).val();
                } else if (idComp.indexOf('label') > -1){
                    item.type = "label";
                    item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length);
                    item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length);
                    item.text = $(idComp).text();
                }
                //var zIndex = $( '#' + idComp ).css( "z-index" );
                var zIndex = $(idComp).css("z-index");
                item.idHtml = $(idComp)[0].id;
                item.mockupId = $routeParams.mockupId;

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

            $scope.addInput = function() {
                propertyService.addInput($scope, $compile);
            };

            $scope.addLabel = function() {
                propertyService.addLabel($scope, $compile);
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
                var propertiesDiv = angular.element(document.querySelector('#wrapper-container'));
                //console.log(propertiesDiv);
                var myComponent = '';
                if (idComponent.indexOf('image') > -1) {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.image(idComponent) +'</div>';
                } else if(idComponent.indexOf('button') > -1) {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.button(idComponent)+'</div>';
                } else if(idComponent.indexOf('input') > -1)  {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.input(idComponent)+'</div>';
                } else if(idComponent.indexOf('label') > -1)  {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.label(idComponent)+'</div>';
                }
                propertiesDiv.html($compile(myComponent)($scope));
            };

            // Loads the button properties to a popup

            // save te properties of a button by now
            $scope.saveButtonProperties = propertyService.saveButton;

            // save te properties of a button by now
            $scope.saveLabelProperties = propertyService.saveLabel;

            // save te properties of a input by now
            $scope.saveInputProperties = propertyService.saveInput;

            // Update the item selected to edit the properties and close/hide the popup
            $scope.saveImageProperties = propertyService.saveImage;

            // close the properties popup
            $scope.closeProperties = propertyService.close;

            // Method to delete a item from the design board
            $scope.deleteItem = function(idComponent) {
                var component = angular.element(document.querySelector('#' + idComponent));
                component.remove();
                if (idComponent.indexOf('new-') > -1) {
                } else {
                    var itemId = $scope.getItemId(idComponent);
                    mockupService.deleteMockupItem.deleteIt({
                        id: itemId
                    }).$promise.then(function(result) {
                        //console.log('Item deleted');
                    });
                }
                $timeout(function() {
                    // this will be called on the save methods to create the version
                    io.socket.post('/mockupVersion/saveIt', {
                        number: 'version 1',
                        mockupId: $routeParams.mockupId,
                        username: $cookieStore.get('username'),
                        action: 'delete_item',
                        message: 'Update the Mockup'
                    }, function serverResponded(body, JWR) {
                        //console.log('Creating our first mockup version');
                    });
                }, 500);
            }

            $timeout(function() {
                console.log("Looks like I need to put some delay to fix it");
                mockupSocketService.subscribeToMockupEdit($scope);
            }, 500);
            
            chatService.subscribe($scope);
            $scope.sendMsg = function() {
                chatService.sendMsg($scope);
            }

            // I need to listen the changes on the mockups, take care the eventIdentity must it be lowercase
        io.socket.on('mockupversion', function(msg) {
            console.log(msg);
            $scope.$apply(function() {
                if (msg.data.mockupId == $routeParams.mockupId) {
                    var message = '<div style="width:200px; " class="alert"><span class="close" data-dismiss="alert">X</span> <span id="alert_message_text">' + 'Updated by ' + msg.data.username + '</span><br> <span> Action: ' + msg.data.action + ' </span></div>';
                    var propertiesDiv = angular.element(document.querySelector('#alert_message'));
                    propertiesDiv.html($compile(message)($scope));
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