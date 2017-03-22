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
        '$timeout', '$http', '$cookieStore', 'propertyService', 'notificationService', 'breadcrumbService', 'headerService',
        'mockupSocketService', 'userService', 'permissionService', 'mockupVersionService', 'GlobalService', 'workflowService', 'commentService',
        function($scope, $rootScope, loginService, $compile, $window, $routeParams, mockupService,
            $timeout, $http, $cookieStore, propertyService, notificationService, breadcrumbService, headerService,
            mockupSocketService, userService, permissionService, mockupVersionService, GlobalService, workflowService, commentService) {
            loginService.reloadScope();
            headerService.updateHeader('projects');
            $scope.chatRoom = $routeParams.mockupId;
            $scope.editObject = null;

            $scope.mockupSuggest = null;

            $scope.chatCollapsed = true;
            $scope.lastId = 0;
            $rootScope.hideFooter = true;
            $scope.logingLog = {};
            $scope.error = '';
            $scope.versionMockups = [];

            $scope.loadMockupItems = function() {
                var mockupId = $scope.editObject.id;
                mockupService.getMockupItems.get({
                    sort: 'position ',
                    where: {
                        mockupId: mockupId
                    },
                    limit: 100
                }).$promise.then(function(result) {
                    $scope.mockupItems = result;
                    $scope.mockupItems.forEach(function(item) {
                        $scope.mockupItemsBykey[item.id] = item;
                    });
                    var positionAux = 0;
                    angular.forEach($scope.mockupItems, function(value, key) {
                        if (positionAux < value.position) {
                            $scope.lastId = value.position;
                        }
                    }, []);
                });
            }; // end of the load mockup items

            $scope.mockupItems = [];
            $scope.mockupItemsBykey = {};
            if ($routeParams.suggestId) {
                mockupService.mockupById.get({
                    mockupId: $routeParams.suggestId
                })
                .$promise.then(function(result) {
                    $scope.editObject = result;
                    $scope.loadMockupItems();
                }, function(err) {
                    mockupService.mockupById.get({
                        mockupId: $routeParams.mockupId
                    })
                    .$promise.then(function(result) {
                        $scope.editObject = result;
                        $scope.mockupSuggest = $scope.editObject;
                        $scope.mockupSuggest.mockupParent = $scope.editObject.id;
                        $scope.mockupSuggest.owner = $cookieStore.get('userId');
                        $scope.mockupSuggest.isSuggest = true;
                        delete $scope.mockupSuggest.id;
                        mockupService.createMockup.save($scope.mockupSuggest, function(resultSaved) {
                            mockupService.publishSuggestCreate($scope, resultSaved);
                            $scope.editObject = resultSaved;
                            var mockupId = $routeParams.mockupId;
                            mockupService.getMockupItems.get({
                                where: {
                                    mockupId: mockupId
                                },
                                limit: 100
                            }).$promise.then(function(resultItems) {
                                for (var i = 0; i < resultItems.length; i++) {
                                    delete resultItems[i].id;
                                    resultItems[i].mockupId = resultSaved.id;
                                }
                                mockupService.saveAllMockupItems.save({ items: resultItems }, function(resultItemsSaved) {
                                    $scope.loadMockupItems();
                                });
                            }, function(err3) {
                                $scope.err = err3;
                            });
                        }, function(err2) {
                            $scope.err = err2;
                        });
                    }, function(err1) {
                        $scope.err1 = err1;
                    });

                });
            } else {
                mockupService.mockupById.get({
                    mockupId: $routeParams.mockupId
                })
                .$promise.then(function(result) {
                    $scope.reloadMockupVersions();
                    $scope.editObject = result;
                    $scope.loadWorkflow();
                    try {
                        permissionService.loadPermission($scope, result.project.id, $cookieStore.get('userId'));
                        $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('mockup', $scope.editObject);
                    } catch (e) { console.log(e); }
                    $scope.loadMockupItems();
                });
            }

            // Some source code to save min image that we are to use on the mockup preview and version of the mockup
            $scope.createImage = function() {
                html2canvas($("#design-div"), {
                    onrendered: function(canvas) {
                        var ctx = canvas.getContext('2d');
                        var dataURL = canvas.toDataURL();
                        mockupService.createMockupItemUploadAvatar.save({
                            img: dataURL,
                            mockupId: $scope.editObject.id
                        }, function(result) {});

                    }
                });
            }
            $scope.loadWorkflow = function() {
                workflowService.workflow.get({
                    where: {
                        name: 'Mockup.' + $scope.editObject.state
                    }
                }).$promise.then(function(result) {
                    $scope.workflows = result[0].next;
                    $scope.currentworkflow = result[0];
                });
            }


            $scope.moveToTop = function($event) {
                //console.log($event);
                $event.target.parentNode.appendChild($event.target);
            };

            $scope.clickMenu = function(item) {
                //console.log(item);
            };


            $scope.loadStaticValues = function(item) {
                if (item.id && $scope.mockupItemsBykey[item.id] && $scope.mockupItemsBykey[item.id].link) {
                    item.link = $scope.mockupItemsBykey[item.id].link;
                    $scope.editObject.links.push(item.link);
                }
            }

            // This code is duplicated, replace this code using $scope.loadMockupItems();
            $scope.updateInput = function(labelId, idComponent) {
                switch (labelId) {
                    case 'text':
                        var textValue = angular.element(document.querySelector('#' + labelId));
                        if (idComponent.indexOf('input') > -1) {
                            $('#' + idComponent).val(textValue[0].value);
                        } else {
                            $('#' + idComponent).text(textValue[0].value);
                        }
                        break;
                    case 'width':
                        var textValue = angular.element(document.querySelector('#' + labelId));
                        $('#' + idComponent)[0].style.width = textValue[0].value + 'px';
                        break;
                    case 'height':
                        var textValue = angular.element(document.querySelector('#' + labelId));
                        $('#' + idComponent)[0].style.height = textValue[0].value + 'px';
                        break;
                    case 'top':
                        var component = angular.element(document.querySelector('#' + idComponent));
                        var translateY = parseInt($(component[0]).css('transform').split(',')[5]);
                        var textValue = angular.element(document.querySelector('#' + labelId));
                        if (translateY) {
                            $('#' + idComponent)[0].style.top = (parseFloat(textValue[0].value) - translateY) + 'px';
                        } else {
                            $('#' + idComponent)[0].style.top = (parseFloat(textValue[0].value)) + 'px';
                        }
                        break;
                    case 'left':
                        var component = angular.element(document.querySelector('#' + idComponent));
                        var translateX = parseInt($(component[0]).css('transform').split(',')[4]);
                        var textValue = angular.element(document.querySelector('#' + labelId));
                        if (translateX) {
                            $('#' + idComponent)[0].style.left = (parseFloat(textValue[0].value) - translateX) + 'px';
                        } else {
                            $('#' + idComponent)[0].style.left = (parseFloat(textValue[0].value)) + 'px';
                        }
                        break;
                    case 'background':
                        var textValue = angular.element(document.querySelector('#' + labelId));
                        $('#' + idComponent)[0].style.background = textValue[0].value + 'px';
                        break;
                    default:
                        console.log("Change not applied");
                }
            }
            $scope.item = {};

            // set a variable in the mockup that will say that the mockup designer will design a suggest
            // save the mockup in a copy that will be the suggest
            // copy the items with the mockupSuggest id
            // open that mockup that will be the suggest
            $scope.save = function() {
                if ($scope.editObject.isSuggest) {
                    mockupService.publishSuggestUpdate($scope, $scope.editObject);
                } else {
                    mockupService.publishUpdate($scope, $scope.editObject);
                }

                $("#spinner").show();
                $("#btnSave").prop('disabled', true);
                var myEl = angular.element(document.querySelector('#design-div'));
                var position = 0;
                if (myEl[0].children.length == 0) {
                    $("#spinner").hide();
                    $("#btnSave").prop('disabled', false);
                }
                $scope.createImage();
                html2canvas($("#design-div"), {
                    onrendered: function(canvas) {
                        var ctx = canvas.getContext('2d');
                        var dataURL = canvas.toDataURL();
                        // the avatar will be created as usual
                        mockupService.createMockupItemUploadAvatar.save({ img: dataURL, mockupId: $scope.editObject.id }, function(result) {
                            var items = [];
                            var toDelete = [];
                            $scope.editObject.links = [];
                            $timeout(function() {
                                angular.forEach(myEl[0].children, function(child) {
                                    position++;
                                    var item = propertyService.getItem('#' + child.id);
                                    // if it is the first time that we save, copy the item
                                    // if it is the seconf time or more just update the item.
                                    item.mockupId = $scope.editObject.id;
                                    if (item.id && item.id.length < 10) {
                                        item.id = undefined;
                                    }
                                    $scope.loadStaticValues(item);
                                    items.push(item);
                                    if (item.id == undefined) {
                                        toDelete.push(child);
                                    }
                                });

                                // save all items should use items with new mockupSuggest Id
                                mockupService.saveAllMockupItems.save({ items: items }, function(result) {
                                    $timeout(function() {
                                        io.socket.post('/mockupVersion/saveIt', {
                                            number: 'version 1',
                                            mockup: $scope.editObject.id,
                                            user: $cookieStore.get('userId'),
                                            action: 'update',
                                            message: 'Update the Mockup'
                                        }, function serverResponded(body, JWR) {
                                            toDelete.forEach(function(child) {
                                                $(child).remove();
                                            });
                                            $scope.loadMockupItems();
                                            $scope.reloadMockupVersions();
                                            $("#spinner").hide();
                                            $("#btnSave").prop('disabled', false);
                                        });
                                        try {
                                            $scope.$digest();
                                        } catch (ex) { console.error(ex); }

                                    }, myEl[0].children.length * 30);
                                    $scope.loadMockupItems();
                                });
                                // what does this code do?
                                mockupService.updateMockup.update({
                                    id: $scope.editObject.id
                                }, $scope.editObject, function(result) {}, function(err) {
                                    $scope.err = err;
                                });
                            }, myEl[0].children.length * 50);
                        });
                    }
                });
            };

            // This id has # included in the string
            $scope.getItemId = function(idComp) {
                var idResult = 0;
                if (idComp.indexOf('image') > -1) {
                    idResult = idComp.substring(5);
                } else if (idComp.indexOf('button') > -1) {
                    idResult = idComp.substring(6);
                } else if (idComp.indexOf('input') > -1) {
                    idResult = idComp.substring(5);
                } else if (idComp.indexOf('label') > -1) {
                    idResult = idComp.substring(5);
                } else if (idComp.indexOf('container') > -1) {
                    idResult = idComp.substring(9);
                }
                return idResult;
            };

            $scope.cancel = function() {
                io.socket.post('/mockupEditor/logout', {
                    username: $cookieStore.get('username')
                }, function serverResponded(body, JWR) {
                    ////console.log('Mockup editor out');
                });
                $window.location.href = '#/mockup/' + $scope.editObject.id;
            }

            interact('.resize-drag')
                .draggable({
                    // enable inertial throwing
                    inertia: true,
                    // keep the element within the area of it's parent
                    restrict: {
                        restriction: "parent",
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

            $scope.addContainer = function() {
                propertyService.addContainer($scope, $compile);
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
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.image(idComponent, $scope) + '</div>';
                } else if (idComponent.indexOf('button') > -1) {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.button(idComponent, $scope) + '</div>';
                } else if (idComponent.indexOf('input') > -1) {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.input(idComponent, $scope) + '</div>';
                } else if (idComponent.indexOf('label') > -1) {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.label(idComponent, $scope) + '</div>';
                } else if (idComponent.indexOf('container') > -1) {
                    myComponent = '<div class="alert" id="wrapper" style="z-index: 100;"> <span class="close" data-dismiss="alert">X</span>' + propertyService.container(idComponent, $scope) + '</div>';
                } else {
                    console.log("Here is another error " + idComponent);
                }
                propertiesDiv.html($compile(myComponent)($scope));
            };

            // Loads the button properties to a popup

            // save te properties of a button by now
            $scope.saveButtonProperties = function(idComponent) {
                propertyService.saveButton(idComponent, $scope);
            }

            // save te properties of a button by now
            $scope.saveLabelProperties = propertyService.saveLabel;

            // save te properties of a input by now
            $scope.saveInputProperties = propertyService.saveInput;

            // Update the item selected to edit the properties and close/hide the popup
            $scope.saveImageProperties = propertyService.saveImage;

            $scope.saveContainerProperties = propertyService.saveContainer;

            // close the properties popup
            $scope.closeProperties = propertyService.close;

            // Method to delete a item from the design board
            $scope.deleteItem = function(idComponent) {
                var component = angular.element(document.querySelector('#' + idComponent));
                component.remove();
                if (idComponent.indexOf('new-') > -1) {} else {
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
                        mockup: $scope.editObject.id,
                        username: $cookieStore.get('username'),
                        action: 'delete_item',
                        message: 'Update the Mockup'
                    }, function serverResponded(body, JWR) {
                        //console.log('Creating our first mockup version');
                    });
                }, 500);
            }

            $timeout(function() {
                //console.log("Looks like I need to put some delay to fix it");
                mockupSocketService.subscribeToMockupEdit($scope);
            }, 500);

            // I need to listen the changes on the mockups, take care the eventIdentity must it be lowercase
            io.socket.on('mockupversion', function(msg) {
                $scope.$apply(function() {
                    if (msg.data.mockup == $routeParams.mockupId || msg.data.mockup == $routeParams.suggestId ) {
                        var message = '<span id="alert_message_text">' + msg.data.message + ' </span>';
                        $.notify(message, {
                            newest_on_top: true
                        });
                        //propertiesDiv.html($compile(message)($scope));
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

            $scope.versionMockups = [];
            $scope.newMockupVersion = function() {

            };

            $scope.promoteMockupVersion = function() {

            };

            $scope.reloadMockupVersions = function() {
                mockupVersionService.getMockupVersions.get({
                    where: {
                        mockup: $routeParams.mockupId
                    },
                    sort: 'createdAt DESC'
                }).$promise.then(function(result) {
                    $scope.versionMockups = result;
                    try {
                        $scope.$digest();
                    } catch (ex) {}
                }, function(err) {
                    $scope.err = err;
                });
            };

            $scope.deleteVersion = function(versionId) {
                mockupVersionService.deleteMockupVersion.save({
                    mockupVersionId: versionId
                }).$promise.then(function(result) {
                    $timeout(function() {
                        $scope.reloadMockupVersions();
                    }, 2000);
                }, function(reason) {
                    $scope.err = err;
                });
            };

            $scope.restore = function(versionId) {
                mockupVersionService.mockupVersionRestore.save({
                    mockupVersionId: versionId,
                    action: 'Restoring'
                }).$promise.then(function(result) {
                    $timeout(function() {
                        $scope.loadMockupItems();
                        $scope.reloadMockupVersions();
                    }, 1000);
                }, function(reason) {
                    $scope.err = err;
                });
            };
            $scope.reloadMockupVersions();

        } // end of the controller function
    ]);
