'use strict';

angular.module('app', ['ui.router']).config(["$urlRouterProvider", "$stateProvider", function ($urlRouterProvider, $stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: './app/routes/home/home.html',
        controller: 'homeCtrl'

    }).state('list', {
        url: '/list',
        templateUrl: './app/routes/list/listTmpl.html',
        controller: 'listCtrl'
    }).state('inspiration', {
        url: '/inspiration',
        templateUrl: './app/routes/inspiration/inspiration.html',
        controller: 'inspirationCtrl'

    });

    $urlRouterProvider.otherwise('/');
}]);
"use strict";
'use strict';

angular.module('app').controller('homeCtrl', ["$scope", "homeService", function ($scope, homeService) {

    $scope.getQuote = function () {
        homeService.getQuote().then(function (response) {
            console.log(response);
            $scope.quotes = response.data.contents.quotes;
        });
    };

    $scope.getQuote();

    $scope.date = new Date();
}]);
'use strict';

angular.module('app').service('homeService', ["$http", function ($http) {

    this.getQuote = function () {

        return $http({
            method: 'GET',
            url: "http://quotes.rest/qod.json"
        });
    };
}]);
'use strict';

angular.module('app').controller('inspirationCtrl', ["$scope", "inspirationService", function ($scope, inspirationService) {

    $scope.getPics = function () {
        inspirationService.getPics().then(function (response) {
            console.log(response);
            $scope.pictures = response.data;
        });
    };

    $scope.getPics();

    $scope.show = false;
    $scope.menu = function () {
        $scope.show = !$scope.show;
    };
}]);
'use strict';

angular.module('app').service('inspirationService', ["$http", function ($http) {

    this.getPics = function () {
        return $http({
            method: 'GET',
            url: "https://api.unsplash.com/photos/curated?client_id=f857da4f8c32145c72b0031898d5348d3663b69dd29e2d08339d7cde4707ce2a"
        });
    };
}]);

// 035ba13eaf95fedf5e7b0ccb7eae865ff1470019bac6d95e3ff3d65781593f23

// 11d016f5127852e024602ce1c0e6794e0961c6f2d7e8a53897f2a373f1df6c01
'use strict';

angular.module('app').controller('listCtrl', ["$scope", function ($scope) {

    $scope.items = [];

    $scope.addToList = function (listItem) {
        if (listItem) {
            $scope.items.push(listItem);
            $scope.listItem = '';
        }
    };
    $scope.show = false;
    $scope.menu = function () {
        $scope.show = !$scope.show;
    };
}]);
'use strict';

angular.module('app').directive('listDir', function () {
    return {
        restrict: 'A',
        link: function link(scope, element, attributes) {
            element.on('click', function () {
                element.toggleClass('list_items');
            });
        }
    };
});