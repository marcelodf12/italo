/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Wssc = angular.module("italo", ['ngRoute']);
Wssc.config(['$routeProvider', function($routeProvider) {
        $routeProvider
                .when('/alumnos/alta', {
                    templateUrl: 'alumnos/alta.html',
                    controller: 'alumnosAltaCtrl'
                })
                .when('/alumnos/listar', {
                    templateUrl: 'alumnos/lista.html',
                    controller: 'alumnosListarCtrl'
                })

                .otherwise({RedirectTo: '/'});
    }]);
Wssc.controller('alumnosAltaCtrl', ['$scope', function($scope, $http) {
        $scope.txt = {};
        $scope.msjError = {};
        $scope.nombre = "";
        $scope.apellido = "";
        $scope.cedula = "";
        $scope.alta = function() {
            console.log($scope.alumno);
            console.log($scope.cedula)
            if ($scope.alumno.$valid) {
                console.log("entro");
            }else{
                console.log("no entro");
            }
        };
    }]);
Wssc.controller('alumnosListarCtrl', ['$scope', function($scope, $http) {
        $scope.listar = function() {
            console.log("exito");
        };
    }]);