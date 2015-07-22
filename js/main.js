'use strict';

var aa = angular.module('aa', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/vision', {
                templateUrl: 'partials/vision.html'
            })
            .when('/team', {
                templateUrl: 'partials/team.html'
            })
            .when('/projects', {
                templateUrl: 'partials/projects.html'
            })
            .when('/contact', {
                templateUrl: 'partials/contact.html'
            });
//            .otherwise('/vision');
    })
    .run(function ($location) {
        $location.path('/vision');
    })