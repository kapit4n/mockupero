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
        fac.image = function(idComponent) {
            var myComponent = angular.element(document.querySelector('#' + idComponent));
            var topPosition = parseInt($($('#' + idComponent)[0]).position().top);
            var leftPosition = parseInt($($('#' + idComponent)[0]).position().left);

            var propertiesValuesDiv = '' +
                '<form class="form" role="form">' +
                '    <div class="form-group">' +
                '       <label for="hrefValue" class="col-md-1 control-label">src</label>' +
                '       <input type="text" class="form-control" id="hrefValue" placeholder="https://exampleImage.com" value="' + myComponent[0].src + '">' +
                '   </div>' +
                '   <div class="form-group">' +
                '       <label for="widtValue" class="col-md-1 control-label">witdh</label>' +
                '       <input type="text" class="form-control" id="widthValue" placeholder="Value" value="' + myComponent[0].width + '">' +
                '   </div>' +
                '   <div class="form-group">' +
                '       <label for="heightValue" class="col-md-1 control-label">height</label>' +
                '       <input type="text" class="form-control" id="heightValue" placeholder="Value" value="' + myComponent[0].height + '">' +
                '   </div>' +
                '   <div class="form-group">' +
                '       <label for="topValue" class="col-md-1 control-label">top</label>' +
                '       <input type="text" class="form-control" id="topValue" placeholder="Value" value="' + topPosition + '">' +
                '   </div>' +
                '   <div class="form-group">' +
                '       <label for="leftValue" class="col-md-1 control-label">left</label>' +
                '       <input type="text" class="form-control" id="leftValue" placeholder="Value" value="' + leftPosition + '">' +
                '   </div>' +
                '   <div class="form-group">' +
                '   <button type="submit" class="col-md-10 btn btn-success" ng-click="saveImageProperties(\'' + idComponent + '\')">Save</button>'
            '</form>';
            return propertiesValuesDiv;
        };

        fac.button = function(idComponent) {
            var myComponent = angular.element(document.querySelector('#' + idComponent));
            var topPosition = parseInt($($('#' + idComponent)[0]).position().top);
            var leftPosition = parseInt($($('#' + idComponent)[0]).position().left);
            var propertiesValuesDiv = '' +
                '<form class="form" role="form" >' +
                '    <div class="form-group">' +
                '       <label for="textValue" class="col-md-1 control-label">Text</label>' +
                '       <input type="text" class="form-control" id="textValue" placeholder="Value" value="' + $('#' + idComponent).text() + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="widtValue" class="col-md-1 control-label">witdh</label>' +
                '       <input type="text" class="form-control" id="widthValue" placeholder="Value" value="' + $(myComponent[0])[0].style.width + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="heightValue" class="col-md-1 control-label">height</label>' +
                '       <input type="text" class="form-control" id="heightValue" placeholder="Value" value="' + $(myComponent[0])[0].style.height + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="topValue" class="col-md-1 control-label">top</label>' +
                '       <input type="text" class="form-control" id="topValue" placeholder="Value" value="' + topPosition + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="leftValue" class="col-md-1 control-label">left</label>' +
                '       <input type="text" class="form-control" id="leftValue" placeholder="Value" value="' + leftPosition + '">' +
                '    </div>' +
                '   <button type="submit" class="btn btn-success" ng-click="saveButtonProperties(\'' + idComponent + '\')">Save</button>'
            '</form>';
            return propertiesValuesDiv;
        };

        fac.input = function(idComponent) {
            var myComponent = angular.element(document.querySelector('#' + idComponent));
            var topPosition = parseInt($($('#' + idComponent)[0]).position().top);
            var leftPosition = parseInt($($('#' + idComponent)[0]).position().left);
            var propertiesValuesDiv = '' +
                '<form class="form" role="form" >' +
                '    <div class="form-group">' +
                '       <label for="textValue" class="col-md-1 control-label">Text</label>' +
                '       <input type="text" class="form-control" id="textValue" placeholder="Value" value="' + $('#' + idComponent).val() + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="widtValue" class="col-md-1 control-label">witdh</label>' +
                '       <input type="text" class="form-control" id="widthValue" placeholder="Value" value="' + $(myComponent[0])[0].style.width + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="heightValue" class="col-md-1 control-label">height</label>' +
                '       <input type="text" class="form-control" id="heightValue" placeholder="Value" value="' + $(myComponent[0])[0].style.height + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="topValue" class="col-md-1 control-label">top</label>' +
                '       <input type="text" class="form-control" id="topValue" placeholder="Value" value="' + topPosition + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="leftValue" class="col-md-1 control-label">left</label>' +
                '       <input type="text" class="form-control" id="leftValue" placeholder="Value" value="' + leftPosition + '">' +
                '    </div>' +
                '<button type="submit" class="btn btn-success" ng-click="saveInputProperties(\'' + idComponent + '\')">Save</button>'
            '</form>';
            return propertiesValuesDiv;
        };

        fac.label = function(idComponent) {
            var myComponent = angular.element(document.querySelector('#' + idComponent));
            var topPosition = parseInt($($('#' + idComponent)[0]).position().top);
            var leftPosition = parseInt($($('#' + idComponent)[0]).position().left);
            var propertiesValuesDiv = '' +
                '<form class="form" role="form" >' +
                '    <div class="form-group">' +
                '       <label for="textValue" class="col-md-1 control-label">Text</label>' +
                '       <input type="text" class="form-control" id="textValue" placeholder="Value" value="' + $('#' + idComponent).text() + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="widtValue" class="col-md-1 control-label">witdh</label>' +
                '       <input type="text" class="form-control" id="widthValue" placeholder="Value" value="' + $(myComponent[0])[0].style.width + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="heightValue" class="col-md-1 control-label">height</label>' +
                '       <input type="text" class="form-control" id="heightValue" placeholder="Value" value="' + $(myComponent[0])[0].style.height + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="topValue" class="col-md-1 control-label">top</label>' +
                '       <input type="text" class="form-control" id="topValue" placeholder="Value" value="' + topPosition + '">' +
                '    </div>' +
                '    <div class="form-group">' +
                '       <label for="leftValue" class="col-md-1 control-label">left</label>' +
                '       <input type="text" class="form-control" id="leftValue" placeholder="Value" value="' + leftPosition + '">' +
                '    </div>' +
                '<button type="submit" class="btn btn-success" ng-click="saveLabelProperties(\'' + idComponent + '\')">Save</button>'
            '</form>';
            return propertiesValuesDiv;
        };

        fac.saveImage = function(idComponent) {
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

        fac.saveButton = function(idComponent) {
            var component = angular.element(document.querySelector('#' + idComponent));
            var textValue = angular.element(document.querySelector('#textValue'));
            var heightValue = angular.element(document.querySelector('#heightValue'));
            var widthValue = angular.element(document.querySelector('#widthValue'));
            var topValue = angular.element(document.querySelector('#topValue'));
            var leftValue = angular.element(document.querySelector('#leftValue'));
            $('#' + idComponent).text(textValue[0].value);
            component[0].style.width = widthValue[0].value;
            component[0].style.height = heightValue[0].value;
            component[0].style.top = topValue[0].value + 'px';
            component[0].style.left = leftValue[0].value + 'px';
            $('#myProperties').modal('hide');
        };

        fac.saveInput = function(idComponent) {
            var component = angular.element(document.querySelector('#' + idComponent));
            var textValue = angular.element(document.querySelector('#textValue'));
            var heightValue = angular.element(document.querySelector('#heightValue'));
            var widthValue = angular.element(document.querySelector('#widthValue'));
            var topValue = angular.element(document.querySelector('#topValue'));
            var leftValue = angular.element(document.querySelector('#leftValue'));
            $('#' + idComponent).val(textValue[0].value); // just this difference with saveButton method
            component[0].style.width = widthValue[0].value;
            component[0].style.height = heightValue[0].value;
            component[0].style.top = topValue[0].value + 'px';
            component[0].style.left = leftValue[0].value + 'px';
            $('#myProperties').modal('hide');
        };

        fac.saveLabel = function(idComponent) {
            console.log('save label');
            var component = angular.element(document.querySelector('#' + idComponent));
            var textValue = angular.element(document.querySelector('#textValue'));
            var heightValue = angular.element(document.querySelector('#heightValue'));
            var widthValue = angular.element(document.querySelector('#widthValue'));
            var topValue = angular.element(document.querySelector('#topValue'));
            var leftValue = angular.element(document.querySelector('#leftValue'));
             $('#' + idComponent).text(textValue[0].value);
            component[0].style.width = widthValue[0].value;
            component[0].style.height = heightValue[0].value;
            component[0].style.top = topValue[0].value + 'px';
            component[0].style.left = leftValue[0].value + 'px';
            $('#myProperties').modal('hide');
        };

        fac.close = function() {
            $('#myProperties').modal('hide');
        };

        fac.addButton = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var btnHtml = '<button id="new-button-' + $scope.lastId + 'x" context-menu data-target="menu-button-' + $scope.lastId + '" class="resize-drag" ' +
                'style="position: absolute; height: 52px; width: 150px; z-index:' + $scope.lastId + '" alt="...">Button</button>';
            designDiv.append($compile(btnHtml)($scope));
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
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        fac.addImage = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var imgHtml = '<img id="new-image-' + $scope.lastId + 'x" context-menu data-target="menu-image-' + $scope.lastId + '" class="resize-drag" ' +
                'style="width: 80px; height: 80px; padding:0; position: absolute;  z-index:' + $scope.lastId + '" src="static/mockups/items/image-icon.png" alt="...">';
            designDiv.append($compile(imgHtml)($scope));

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
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };


        fac.addInput = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var btnHtml = '<input id="new-input-' + $scope.lastId + 'x" context-menu data-target="menu-input-' + $scope.lastId + '" class="resize-drag" ' +
                'style="position: absolute; z-index:' + $scope.lastId + '" alt="..." value ="Input" type="text" ></input>';
            designDiv.append($compile(btnHtml)($scope));
            var contentMenuHtml = '<div class="dropdown position-fixed" id="menu-input-' + $scope.lastId + '">' +
                '    <ul class="dropdown-menu" role="menu">' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="1" ng-click="bringToFront(\'menu-input-' + $scope.lastId + 'x\');">Bring to FrontXX</a>' +
                '        </li>' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="2" ng-click="sendToBackward(\'menu-input-' + $scope.lastId + 'x\');">Send BackwardXX</a>' +
                '        </li>' +
                '    </ul>' +
                '</div>';
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        fac.addLabel = function($scope, $compile) {
            var designDiv = angular.element(document.querySelector('#design-div'));
            var designContentMenu = angular.element(document.querySelector('#design-div-content-menu'));
            $scope.lastId++;
            var btnHtml = '<span id="new-label-' + $scope.lastId + 'x" context-menu data-target="menu-label-' + $scope.lastId + '" class="resize-drag" ' +
                'style="padding:0; position: absolute; height: 60px; width: 150px; z-index:' + $scope.lastId + '" alt="...">Label</span>';
            designDiv.append($compile(btnHtml)($scope));
            var contentMenuHtml = '<div class="dropdown position-fixed" id="menu-label-' + $scope.lastId + '">' +
                '    <ul class="dropdown-menu" role="menu">' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="1" ng-click="bringToFront(\'menu-label-' + $scope.lastId + 'x\');">Bring to FrontXX</a>' +
                '        </li>' +
                '        <li>' +
                '            <a class="pointer" role="menuitem" tabindex="2" ng-click="sendToBackward(\'menu-label-' + $scope.lastId + 'x\');">Send BackwardXX</a>' +
                '        </li>' +
                '    </ul>' +
                '</div>';
            designContentMenu.append($compile(contentMenuHtml)($scope));
        };

        return fac;
    });