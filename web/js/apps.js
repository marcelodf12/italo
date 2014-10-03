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
                    templateUrl: 'alumnos/listar.html',
                    controller: 'alumnosListarCtrl'
                })
                .when('/alumnos/buscar', {
                    templateUrl: 'alumnos/buscar.html',
                    controller: 'alumnosBuscarCtrl'
                })
                .when('/alumnos/:id', {
                    templateUrl: 'alumnos/mostrar.html',
                    controller: 'alumnosMostrarCtrl'
                })
                .when('/alumnos/modificar/:id', {
                    templateUrl: 'alumnos/modificar.html',
                    controller: 'alumnosModificarCtrl'
                })
                .when('/alumnos/matricular/:id', {
                    templateUrl: 'alumnos/matricular.html',
                    controller: 'alumnosMatricularCtrl'
                })
                
                .otherwise({RedirectTo: '/'});
    }]);

// Alta de  Alumnos
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
                    alumno.sexo = $scope.sexo;
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

// Listar Alumnos: Por curso
Wssc.controller('alumnosListarCtrl', ['$scope', '$http', function($scope, $http) {
        var fecha = new Date();
        var ano = parseInt(fecha.getFullYear());
        $scope.anhos = [];
        for(c=2014; c<=ano; c++){
            $scope.anhos.push(c);
        };
        $http.get("webresources/italo.promociones").success(function(data, status, headers, config) {
                        $scope.anhos = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        url = "webresources/italo.alumnos/";
        $scope.mostrarNiveles = function() {
            url2 = "webresources/italo.cursos/filtrar/" + $scope.filtro;
            $http.get(url2).
                    success(function(data, status, headers, config) {
                        $scope.cursos = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
        $scope.listar = function() {
            idCurso = $scope.curso;
            idPromocion = $scope.anho;
            url3 = "webresources/italo.matriculas/Matriculas/" + idCurso + "/" + idPromocion;
            console.log(url3)
            $http.get(url3).success(function(data, status, headers, config) {
                        $scope.alumnos = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
    }]);


// Detalles del alumnos
Wssc.controller('alumnosMostrarCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
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

// Modificar datos del Alumno
Wssc.controller('alumnosModificarCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        var id = $routeParams.id.toString();
        url = "webresources/italo.alumnos/" + id;
        $http.get(url).
                success(function(data, status, headers, config) {
                    alumno = data;
                    console.log(data);
                    $scope.nombre = alumno.nombre;
                    $scope.apellido = alumno.apellido;
                    $scope.cedula = alumno.cedula;
                    $scope.sexo = alumno.sexo;
                    $scope.nacimiento = alumno.nacimiento;
                    $scope.responsable = alumno.responsable;
                    $scope.cedula_responsable = alumno.cedulaResponsable;
                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                });
        $scope.modificar = function() {
            if ($scope.alumno.$valid) {
                if ($scope.sexo === "") {
                    $scope.radioRequerido = "";
                } else {
                    alumno = new Object;
                    alumno.id = id;
                    alumno.nombre = $scope.nombre;
                    alumno.apellido = $scope.apellido;
                    alumno.sexo = $scope.sexo;
                    alumno.nacimiento = $scope.nacimiento;
                    alumno.responsable = $scope.responsable;
                    alumno.cedulaResponsable = $scope.cedula_responsable;
                    if ($scope.cedula !== "") {
                        alumno.cedula = $scope.cedula;
                    }
                    ;
                    url = "webresources/italo.alumnos/" + id;
                    console.log(alumno);
                    console.log(url);
                    $http.put(url, alumno)
                            .
                            success(function(data, status, headers, config) {
                                alert("Se ha modificado correctamente a " + alumno.nombre + " " + alumno.apellido);
                                $location.path('alumnos/' + id);
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
            ;
        };
        $scope.cancelar = function() {
            $location.path('alumnos/' + id);
        };

    }]);

// Filtrar alumnos por nombre y Apellido
Wssc.controller('alumnosBuscarCtrl', ['$scope', '$http', function($scope, $http) {
       $scope.buscar = function() {
            url3 = "webresources/italo.alumnos/filtro/" + $scope.FiltroN + "/" + $scope.FiltroA;
            console.log(url3);
            $http.get(url3).success(function(data, status, headers, config) {
                        $scope.alumnos = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
    }]);


// Matricular Alumnos
Wssc.controller('alumnosMatricularCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        var alumno;
        var id = $routeParams.id.toString();
        url = "webresources/italo.alumnos/" + id;
        $http.get(url).
                success(function(data, status, headers, config) {
                    alumno = data;
                    console.log(data);
                    $scope.nombre = alumno.nombre;
                    $scope.apellido = alumno.apellido;
                    $scope.cedula = alumno.cedula;
                    $scope.sexo = alumno.sexo;
                    $scope.nacimiento = alumno.nacimiento;
                    $scope.responsable = alumno.responsable;
                    $scope.cedula_responsable = alumno.cedulaResponsable;
                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                });
        var fecha = new Date();
        var ano = parseInt(fecha.getFullYear());
        $scope.anhos = [];
        for(c=2014; c<=ano; c++){
            $scope.anhos.push(c);
        };
        $http.get("webresources/italo.promociones").success(function(data, status, headers, config) {
                        $scope.anhos = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        url = "webresources/italo.alumnos/";
        $scope.mostrarNiveles = function() {
            url2 = "webresources/italo.cursos/filtrar/" + $scope.filtro;
            $http.get(url2).
                    success(function(data, status, headers, config) {
                        $scope.cursos = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
        $scope.matricular = function() {
            var fecha = new Date();
            f = fecha.toISOString().substr(2,8);
            f= f.substr(6,2) + "/" + f.substr(3,2) + "/" + f.substr(0,2);
            console.log(f);
            matricula = new Object();
            matricula.fecha = f;
            matricula.cuota = $scope.cuota;
            matricula.examen = $scope.examen;
            matricula.matricula = $scope.insc;
            matricula.fkCurso = JSON.parse($scope.curso); 
            matricula.fkPromocion = JSON.parse($scope.anho);
            matricula.fkAlumno = alumno;
            console.log(matricula);
            $http.post("webresources/italo.matriculas/", matricula).success(function(data, status, headers, config) {
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
    }]);
