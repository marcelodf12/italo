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
                .when('/alumnos/:id', {
                    templateUrl: 'alumnos/mostrar.html',
                    controller: 'alumnosMostrarCtrl'
                })

                .otherwise({RedirectTo: '/'});
    }]);
Wssc.controller('alumnosAltaCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.radioRequerido = "ng-hide";
        $scope.sexo = "v";
        $scope.cedula = "";
        $scope.alta = function() {
            if ($scope.alumno.$valid) {
                if ($scope.sexo === "") {
                    $scope.radioRequerido = "";
                } else {
                    url = "webresources/italo.alumnos/";
                    alumno = new Object;
                    alumno.nombre = $scope.nombre;
                    alumno.apellido = $scope.apellido;
                    alumno.optionsRadios = $scope.sexo;
                    alumno.nacimiento = $scope.nacimiento;
                    alumno.responsable = $scope.responsable;
                    alumno.cedulaResponsable = $scope.cedula_responsable;
                    if ($scope.cedula !== "") {
                        alumno.cedula = $scope.cedula;
                    }
                    ;
                    $http.post(url, alumno)
                            .
                            success(function(data, status, headers, config) {
                                alert("Se ha registrado correctamente a " + alumno.nombre + " " + alumno.apellido);
                            }).
                            error(function(data, status, headers, config) {
                                txt = "duplicate key value violates unique constraint";
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                                if (data.toString().search(txt) > 0) {
                                    alert("El numero de cedula " + alumno.cedula + " ya esta registrado");
                                } else {
                                    alert("Ha ocurrido un error");
                                }
                            });
                    console.log(alumno);
                }
                ;
            } else {
                console.log("no entro");
            }
        };
    }]);
Wssc.controller('alumnosListarCtrl', ['$scope', function($scope, $http) {
        $scope.listar = function() {
            console.log("exito");
        };
    }]);
Wssc.controller('alumnosMostrarCtrl', ['$scope', '$http', '$routeParams',function($scope, $http, $routeParams) {
        var id = $routeParams.id.toString();
        url = "webresources/italo.alumnos/" + id;
        $http.get(url).
                success(function(data, status, headers, config) {
                       $scope.alumno = data;
                }).
                error(function(data, status, headers, config) {
                       console.log(data);
                });

    }]);