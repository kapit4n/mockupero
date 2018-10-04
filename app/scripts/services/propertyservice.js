'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.propertyService
 * @description
 * # propertyService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('propertyService', function() {
        // AngularJS will instantiate a singleton by calling "new" on this function
        var fac = {};

        fac.getItem = function(idComp) {
            var item = {};
            if (idComp.length > 15) {
                if (idComp.indexOf('reference') > -1) {
                    item.id = idComp.substring(10);
                } else if (idComp.indexOf('image') > -1) {
                    item.id = idComp.substring(6);
                } else if (idComp.indexOf('button') > -1) {
                    item.id = idComp.substring(7);
                } else if (idComp.indexOf('input') > -1) {
                    item.id = idComp.substring(6);
                } else if (idComp.indexOf('label') > -1) {
                    item.id = idComp.substring(6);
                } else if (idComp.indexOf('container') > -1) {
                    item.id = idComp.substring(10);
                }
            } else {
                item.id = undefined;
            }
            item.src = $(idComp)[0].src;
            item.top = $($(idComp)[0]).position().top;
            item.left = $($(idComp)[0]).position().left;
            item.background = $($(idComp)[0])[0].style.background;
            var position = $(idComp).css("z-index");
            item.position = position;
            item.idHtml = $(idComp)[0].id;

            if (idComp.indexOf('image') > -1) {
                item.type = "image";
                item.width = $(idComp)[0].width;
                item.height = $(idComp)[0].height;
            } else if (idComp.indexOf('reference') > -1) {
                item.type = "reference";
                item.width = $(idComp)[0].width;
                item.height = $(idComp)[0].height;
            } else if (idComp.indexOf('button') > -1) {
                item.type = "button";
                item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length - 2);
                item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length - 2);
                item.text = $(idComp).text();
            } else if (idComp.indexOf('input') > -1) {
                item.type = "input";
                item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length - 2);
                item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length - 2);
                item.text = $(idComp).val();
            } else if (idComp.indexOf('label') > -1) {
                item.type = "label";
                item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length - 2);
                item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length - 2);
                item.text = $(idComp).text();
            } else if (idComp.indexOf('container') > -1) {
                item.type = "container";
                item.width = $($(idComp)[0])[0].style.width.substring(0, $($(idComp)[0])[0].style.width.length - 2);
                item.height = $($(idComp)[0])[0].style.height.substring(0, $($(idComp)[0])[0].style.height.length - 2);
            }

            return item;
        }

        fac.formGroup = function(labelId, idComponent, type) {
            var modelId = labelId;
            if (!type) {
                type = 'text';
            }
            return '    <div class="form-group">' +
                '       <label for="' + labelId + '" class="col-md-1 control-label">' + labelId + '</label>' +
                '       <input type="' + type + '" class="form-control" id="' + labelId + '" placeholder="Value" ng-model="auxItem.' + modelId + '" ng-change="updateInput(\'' + labelId + '\', \'' + idComponent + '\')"  >' +
                '    </div>';
        };

        fac.formStart = function() {
            return '<form class="form" role="form">';
        };

        fac.formEnd = function() {
            return '</form>';
        };

        fac.formSubmit = function(itemType, idComponent) {
            return '   <div class="form-group">' +
                '   <button type="submit" class="col-md-10 btn btn-success" ng-click="save' +
                itemType + 'Properties(\'' + idComponent + '\', $scope)">Save</button>';
        }

        fac.container = function(idComponent, $scope) {
            var itemId = $scope.getItemId(idComponent);
            var item = fac.getItem('#' + idComponent);
            $scope.auxItem = item;

            var propertiesValuesDiv = '';
            propertiesValuesDiv += fac.formStart();
            propertiesValuesDiv += fac.formGroup('width', idComponent);
            propertiesValuesDiv += fac.formGroup('height', idComponent);
            propertiesValuesDiv += fac.formGroup('top', idComponent);
            propertiesValuesDiv += fac.formGroup('left', idComponent);
            propertiesValuesDiv += fac.formGroup('background', idComponent, 'color');
            propertiesValuesDiv += fac.formSubmit('Container', idComponent);
            propertiesValuesDiv += fac.formEnd();
            return propertiesValuesDiv;
        };


        fac.image = function(idComponent, $scope) {
            var itemId = $scope.getItemId(idComponent);
            var item = fac.getItem('#' + idComponent);
            $scope.auxItem = item;

            var propertiesValuesDiv = '';
            propertiesValuesDiv += fac.formStart();
            propertiesValuesDiv += fac.formGroup('href', idComponent);
            propertiesValuesDiv += fac.formGroup('width', idComponent);
            propertiesValuesDiv += fac.formGroup('height', idComponent);
            propertiesValuesDiv += fac.formGroup('top', idComponent);
            propertiesValuesDiv += fac.formGroup('left', idComponent);
            propertiesValuesDiv += fac.formSubmit('Image', idComponent);
            propertiesValuesDiv += fac.formEnd();
            return propertiesValuesDiv;
        };


        fac.button = function(idComponent, $scope) {
            var itemId = $scope.getItemId(idComponent);
            var item = fac.getItem('#' + idComponent);
            $scope.auxItem = item;
            if ($scope.mockupItemsBykey[itemId].link) {
                $scope.auxItem.link = $scope.mockupItemsBykey[itemId].link;
            }

            var propertiesValuesDiv = '';
            propertiesValuesDiv += fac.formStart();
            propertiesValuesDiv += fac.formGroup('text', idComponent);
            propertiesValuesDiv += fac.formGroup('width', idComponent);
            propertiesValuesDiv += fac.formGroup('height', idComponent);
            propertiesValuesDiv += fac.formGroup('top', idComponent);
            propertiesValuesDiv += fac.formGroup('left', idComponent);
            propertiesValuesDiv += fac.formGroup('link', idComponent);
            propertiesValuesDiv += fac.formSubmit('Button', idComponent);
            propertiesValuesDiv += fac.formEnd();
            return propertiesValuesDiv;
        };

        fac.input = function(idComponent, $scope) {
            var itemId = $scope.getItemId(idComponent);
            var item = fac.getItem('#' + idComponent);
            $scope.auxItem = item;

            var propertiesValuesDiv = '';
            propertiesValuesDiv += fac.formStart();
            propertiesValuesDiv += fac.formGroup('text', idComponent);
            propertiesValuesDiv += fac.formGroup('width', idComponent);
            propertiesValuesDiv += fac.formGroup('height', idComponent);
            propertiesValuesDiv += fac.formGroup('top', idComponent);
            propertiesValuesDiv += fac.formGroup('left', idComponent);
            propertiesValuesDiv += fac.formSubmit('Input', idComponent);
            propertiesValuesDiv += fac.formEnd();
            return propertiesValuesDiv;
        };


        fac.label = function(idComponent, $scope) {
            var itemId = $scope.getItemId(idComponent);
            var item = fac.getItem('#' + idComponent);
            $scope.auxItem = item;

            var propertiesValuesDiv = '';
            propertiesValuesDiv += fac.formStart();
            propertiesValuesDiv += fac.formGroup('text', idComponent);
            propertiesValuesDiv += fac.formGroup('width', idComponent);
            propertiesValuesDiv += fac.formGroup('height', idComponent);
            propertiesValuesDiv += fac.formGroup('top', idComponent);
            propertiesValuesDiv += fac.formGroup('left', idComponent);
            propertiesValuesDiv += fac.formSubmit('Label', idComponent);
            propertiesValuesDiv += fac.formEnd();
            return propertiesValuesDiv;
        };

        fac.saveImage = function(idComponent) {
            var component = angular.element(document.querySelector('#' + idComponent));
            var translateX = parseInt($(component[0]).css('transform').split(',')[4]);
            var translateY = parseInt($(component[0]).css('transform').split(',')[5]);
            var hrefValue = angular.element(document.querySelector('#href'));
            var heightValue = angular.element(document.querySelector('#height'));
            var widthValue = angular.element(document.querySelector('#width'));
            var topValue = angular.element(document.querySelector('#top'));
            var leftValue = angular.element(document.querySelector('#left'));

            component[0].style.width = widthValue[0].value + 'px';
            component[0].style.height = heightValue[0].value + 'px';
            component[0].style.top = (parseFloat(topValue[0].value) - translateY) + 'px';
            component[0].style.left = (parseFloat(leftValue[0].value) - translateX) + 'px';
            component[0].src = hrefValue[0].value;
            $('#myProperties').modal('hide');
        };

        fac.saveContainer = function(idComponent) {
            var component = angular.element(document.querySelector('#' + idComponent));
            var translateX = parseInt($(component[0]).css('transform').split(',')[4]);
            var translateY = parseInt($(component[0]).css('transform').split(',')[5]);

            var heightValue = angular.element(document.querySelector('#height'));
            var widthValue = angular.element(document.querySelector('#width'));
            var topValue = angular.element(document.querySelector('#top'));
            var leftValue = angular.element(document.querySelector('#left'));
            var backgroundValue = angular.element(document.querySelector('#background'));
            component[0].style.width = widthValue[0].value + 'px';
            component[0].style.height = heightValue[0].value + 'px';
            component[0].style.top = (parseFloat(topValue[0].value) - translateY) + 'px';
            component[0].style.left = (parseFloat(leftValue[0].value) - translateX) + 'px';
            component[0].style.background = backgroundValue[0].value + '';
            $('#myProperties').modal('hide');
        };

        fac.saveButton = function(idComponent, $scope) {
            var itemId = $scope.getItemId(idComponent);
            var component = angular.element(document.querySelector('#' + idComponent));
            var translateX = parseInt($(component[0]).css('transform').split(',')[4]);
            var translateY = parseInt($(component[0]).css('transform').split(',')[5]);

            var textValue = angular.element(document.querySelector('#text'));
            var heightValue = angular.element(document.querySelector('#height'));
            var widthValue = angular.element(document.querySelector('#width'));
            var topValue = angular.element(document.querySelector('#top'));
            var leftValue = angular.element(document.querySelector('#left'));
            var redirectValue = angular.element(document.querySelector('#link'));
            $('#' + idComponent).text(textValue[0].value);
            component[0].style.width = widthValue[0].value;
            component[0].style.height = heightValue[0].value;
            component[0].style.top = (parseFloat(topValue[0].value) - translateY) + 'px';
            component[0].style.left = (parseFloat(leftValue[0].value) - translateX) + 'px';
            $scope.mockupItemsBykey[itemId].link = redirectValue[0].value;
            $('#myProperties').modal('hide');
        };

        fac.saveInput = function(idComponent) {
            var component = angular.element(document.querySelector('#' + idComponent));
            var translateX = parseInt($(component[0]).css('transform').split(',')[4]);
            var translateY = parseInt($(component[0]).css('transform').split(',')[5]);

            var textValue = angular.element(document.querySelector('#text'));
            var heightValue = angular.element(document.querySelector('#height'));
            var widthValue = angular.element(document.querySelector('#width'));
            var topValue = angular.element(document.querySelector('#top'));
            var leftValue = angular.element(document.querySelector('#left'));
            $('#' + idComponent).val(textValue[0].value); // just this difference with saveButton method
            component[0].style.width = widthValue[0].value + 'px';;
            component[0].style.height = heightValue[0].value + 'px';;
            component[0].style.top = (parseFloat(topValue[0].value) - translateY) + 'px';
            component[0].style.left = (parseFloat(leftValue[0].value) - translateX) + 'px';
            $('#myProperties').modal('hide');
        };

        fac.saveLabel = function(idComponent) {
            var component = angular.element(document.querySelector('#' + idComponent));
            var translateX = parseInt($(component[0]).css('transform').split(',')[4]);
            var translateY = parseInt($(component[0]).css('transform').split(',')[5]);

            var textValue = angular.element(document.querySelector('#text'));
            var heightValue = angular.element(document.querySelector('#height'));
            var widthValue = angular.element(document.querySelector('#width'));
            var topValue = angular.element(document.querySelector('#top'));
            var leftValue = angular.element(document.querySelector('#left'));
            $('#' + idComponent).text(textValue[0].value);
            component[0].style.width = widthValue[0].value + 'px';
            component[0].style.height = heightValue[0].value + 'px';
            component[0].style.top = (parseFloat(topValue[0].value) - translateY) + 'px';
            component[0].style.left = (parseFloat(leftValue[0].value) - translateX) + 'px';
            $('#myProperties').modal('hide');
        };

        fac.close = function() {
            $('#myProperties').modal('hide');
        };

        fac.contentMenu = function(lastId, itemType) {
            var contentMenuHtml = '<div class="dropdown position-fixed" id="menu-' + itemType + '-' + lastId + '" style="z-index:100;">' +
                '    <ul class="dropdown-menu" role="menu">' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="1" ng-click="bringToFront(\'menu-' + itemType + '-' + lastId + 'x\');">Bring to Front</a>' +
                '        </li>' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="2" ng-click="sendToBackward(\'menu-' + itemType + '-' + lastId + 'x\');">Send Backward</a>' +
                '        </li>' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="3" ng-click="loadProperties(\'new-' + itemType + '-' + lastId + 'x\');">Properties</a>' +
                '        </li>' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="3" ng-click="deleteItem(\'new-' + itemType + '-' + lastId + 'x\');">Delete</a>' +
                '        </li>' +
                '    </ul>' +
                '</div>';
            return contentMenuHtml;
        }

        fac.addButton = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var btnHtml = '<button id="new-button-' + $scope.lastId + 'x" context-menu data-target="menu-button-' + $scope.lastId + '" class="resize-drag" ' +
                'style="position: absolute; height: 52px; width: 150px; z-index:' + $scope.lastId + '" alt="...">Button</button>';
            designDiv.append($compile(btnHtml)($scope));
            var contentMenuHtml = fac.contentMenu($scope.lastId, 'button');
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        fac.addImage = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var imgHtml = '<img id="new-image-' + $scope.lastId + 'x" context-menu data-target="menu-image-' + $scope.lastId + '" class="resize-drag" ' +
                'style="width: 80px; height: 80px; padding:0; position: absolute;  z-index:' + $scope.lastId + '" src="static/mockups/items/image-icon.png" alt="...">';
            designDiv.append($compile(imgHtml)($scope));

            var contentMenuHtml = fac.contentMenu($scope.lastId, 'image');
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        fac.addContainer = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var imgHtml = '<div id="new-container-' + $scope.lastId + 'x" context-menu data-target="menu-container-' + $scope.lastId + '" class="resize-drag" ' +
                'style="width: 100px; height: 100px; padding:0; position: absolute; background: #e7e7e7;  z-index:' + $scope.lastId + '" alt="..."></div>';
            designDiv.append($compile(imgHtml)($scope));
            var contentMenuHtml = fac.contentMenu($scope.lastId, 'container');
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };


        fac.addInput = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var btnHtml = '<input id="new-input-' + $scope.lastId + 'x" context-menu data-target="menu-input-' + $scope.lastId + '" class="resize-drag" ' +
                'style="position: absolute; z-index:' + $scope.lastId + '; width: 100px; height: 30px;" alt="..." value ="Input" type="text" ></input>';
            designDiv.append($compile(btnHtml)($scope));
            var contentMenuHtml = fac.contentMenu($scope.lastId, 'input');
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        fac.addLabel = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var btnHtml = '<span id="new-label-' + $scope.lastId + 'x" context-menu data-target="menu-label-' + $scope.lastId + '" class="resize-drag" ' +
                'style="padding:0; position: absolute; height: 60px; width: 150px; z-index:' + $scope.lastId + '" alt="...">Label</span>';
            designDiv.append($compile(btnHtml)($scope));
            var contentMenuHtml = fac.contentMenu($scope.lastId, 'label');
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        return fac;
    });
