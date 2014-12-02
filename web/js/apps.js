/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var facturaGlobal = new Object();
var pagosGlobal = new Object();
var repetir = function(caracter, cantidad) {
    cadena = '';
    for (i = 0; i < cantidad; i++)
        cadena += caracter;
    return cadena;
};

var iniciarFactura = function() {
    facturaGlobal.fecha = "";
    facturaGlobal.nombre = "";
    facturaGlobal.ruc = "";
    facturaGlobal.direccion = "";
    facturaGlobal.total = 0;
    facturaGlobal.iva5 = 0;
    facturaGlobal.iva10 = 0;
    facturaGlobal.exenta = 0;
    facturaGlobal.detallefacturaList = new Array();
    facturaGlobal.pagosList = new Array();
};
iniciarFactura();
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
                .when('/alumnos/cuotas/:id', {
                    templateUrl: 'alumnos/cuotas.html',
                    controller: 'alumnosCuotasCtrl'
                })
                .when('/facturas/actual', {
                    templateUrl: 'facturas/factura.html',
                    controller: 'facturasActualCtrl'
                })
                .when('/facturas/ver/:id', {
                    templateUrl: 'facturas/ver.html',
                    controller: 'facturasVerCtrl'
                })
                .when('/facturas/listar/', {
                    templateUrl: 'facturas/listar.html',
                    controller: 'facturasListarCtrl'
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
                                    alert("Ha ocurrido un error. Reintente, y si el problema persiste reinicie el servidor");
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
        for (c = 2014; c <= ano; c++) {
            $scope.anhos.push(c);
        }
        ;
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
        url2 = "webresources/italo.matriculas/alumnos/" + id;
        $http.get(url2).
                success(function(data, status, headers, config) {
                    $scope.matriculas = data;
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
                                    alert("Ha ocurrido un error. Reintente, y si el problema persiste reinicie el servidor");
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
        for (c = 2014; c <= ano; c++) {
            $scope.anhos.push(c);
        }
        ;
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
            f = fecha.toISOString().substr(2, 8);
            f = f.substr(6, 2) + "/" + f.substr(3, 2) + "/" + f.substr(0, 2);
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
                alert("Se matriculado a " + alumno.nombre + " " + alumno.apellido + " en " + matricula.fkCurso.nivel.toString() + " " + matricula.fkCurso.especialidad.toString());
                $location.path('alumnos/' + alumno.id);
            }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
    }]);

//Controlador para el pago de cuotas
Wssc.controller('alumnosCuotasCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        var id = $routeParams.id.toString();
        url = "webresources/italo.matriculas/cuotas/" + id;
        meses = new Array();
        meses[1] = "Matricula";
        meses[2] = "Febrero";
        meses[3] = "Marzo";
        meses[4] = "Abril";
        meses[5] = "Mayo";
        meses[6] = "Junio";
        meses[7] = "Julio";
        meses[8] = "Agosto";
        meses[9] = "Setiembre";
        meses[10] = "Octubre";
        meses[11] = "Noviembre";
        meses[12] = "Derecho";
        $scope.mes = "";

        $scope.pagar = function(monto, mes, titulo) {
            console.log("pagos");
            console.log(monto);
            detalle = new Object();
            detalle.monto = monto;
            detalle.cantidad = 1;
            detalle.descripcion = "Pago " + mes + " " + titulo;
            detalle.precioUnitario = monto;
            detalle.impuesto = 0;
            facturaGlobal.detallefacturaList.push(detalle);
            var fecha = new Date();
            f = fecha.toISOString().substr(2, 8);
            f = f.substr(6, 2) + "-" + f.substr(3, 2) + "-" + f.substr(0, 2);
            pago = new Object();
            pago.fecha = f;
            pago.monto = monto;
            pago.fkMatricula = $scope.cuotas[1].fkMatricula;
            facturaGlobal.pagosList.push(pago);
            alert("Se ha agregado " + detalle.descripcion + "a la factura por el monto de " + detalle.monto);
            facturaGlobal.fecha = f;
            facturaGlobal.ruc = $scope.cuotas[1].fkMatricula.fkAlumno.cedulaResponsable;
            facturaGlobal.nombre = $scope.cuotas[1].fkMatricula.fkAlumno.responsable;
            console.log(facturaGlobal);
        };

        $http.get(url).
                success(function(data, status, headers, config) {
                    url2 = "webresources/italo.matriculas/pagos/" + id;
                    $scope.cuotas = data;
                    $scope.alumno = $scope.cuotas[1].fkMatricula.fkAlumno;
                    $scope.titulo = $scope.cuotas[1].fkMatricula.fkAlumno.apellido + " " +
                            $scope.cuotas[1].fkMatricula.fkAlumno.nombre + " " +
                            $scope.cuotas[1].fkMatricula.fkCurso.nivel + "º " +
                            $scope.cuotas[1].fkMatricula.fkCurso.especialidad + " " +
                            $scope.cuotas[1].fkMatricula.fkPromocion.anho;
                    $http.get(url2).
                            success(function(data, status, headers, config) {
                                $scope.pagos = data;
                                suma = 0;
                                for (x = 0; x < $scope.pagos.length; x++) {
                                    suma += $scope.pagos[x].monto;
                                }
                                console.log(suma);
                                for (x = 0; x < $scope.cuotas.length; x++) {
                                    $scope.cuotas[x].visible = "";
                                    $scope.cuotas[x].mes = meses[$scope.cuotas[x].vencimiento];
                                    if (suma >= $scope.cuotas[x].monto) {
                                        $scope.cuotas[x].saldo = 0;
                                        suma = suma - $scope.cuotas[x].monto;
                                        $scope.cuotas[x].estado = "success";
                                        $scope.cuotas[x].visible = "disabled";
                                    } else if (suma === 0) {
                                        $scope.cuotas[x].saldo = $scope.cuotas[x].monto;
                                        $scope.cuotas[x].estado = "danger";
                                        if ($scope.mes === "") {
                                            $scope.mes = $scope.cuotas[x].mes;
                                        }
                                    } else {
                                        $scope.cuotas[x].saldo = $scope.cuotas[x].monto - suma;
                                        suma = 0;
                                        $scope.cuotas[x].estado = "warning";
                                        $scope.mes = $scope.cuotas[x].mes;
                                    }
                                }
                                console.log(data);
                            }).
                            error(function(data, status, headers, config) {
                                console.log(data);
                            });
                }).
                error(function(data, status, headers, config) {
                    console.log(data);
                });

    }]);
Wssc.controller('facturasActualCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        var fecha = new Date();
        f = fecha.toISOString().substr(2, 8);
        f = f.substr(6, 2) + "-" + f.substr(3, 2) + "-" + f.substr(0, 2);

        $scope.fecha = f;

        $scope.borrar = function(index) {
            facturaGlobal.total -= facturaGlobal.detallefacturaList[index].monto;
            $scope.detalles.splice(index, 1);
            for (x = 0; x < facturaGlobal.detallefacturaList.length; x++) {
                $scope.detalles[x].index = x;
            }
            $scope.labelTotal = facturaGlobal.total.toLocaleString();
        };
        $scope.agregar = function() {
            if (!$scope.factura.Nprecio.$invalid && !$scope.factura.Ncantidad.$invalid) {
                detalle = new Object();
                detalle.monto = $scope.Nprecio * $scope.Ncantidad;
                detalle.cantidad = parseInt($scope.Ncantidad);
                detalle.descripcion = $scope.Ndescripcion;
                detalle.precioUnitario = parseInt($scope.Nprecio);
                detalle.impuesto = parseInt($scope.Nimpuesto);
                facturaGlobal.detallefacturaList.push(detalle);
                $scope.factura.Nprecio.$pristine = true;
                $scope.factura.Ncantidad.$pristine = true;
                facturaGlobal.nombre = $scope.nombre;
                facturaGlobal.ruc = $scope.ruc;
                facturaGlobal.fecha = $scope.fecha;
                facturaGlobal.direccion = $scope.direccion;
                init();
            }

        };
        $scope.guardar = function() {
            console.log(facturaGlobal);
            url = "webresources/italo.facturas/";
            for (x = 0; x < facturaGlobal.detallefacturaList.length; x++) {
                delete facturaGlobal.detallefacturaList[x].index;
                delete facturaGlobal.detallefacturaList[x].iva5;
                delete facturaGlobal.detallefacturaList[x].iva10;
                delete facturaGlobal.detallefacturaList[x].exenta;
            }
            if (facturaGlobal.detallefacturaList.length > 0) {
                if (confirm("Esta seguro que desea guardar la factura?")) {
                    $http.post(url, facturaGlobal).
                            success(function(data, status, headers, config) {
                                $location.path('facturas/ver/' + data);
                                iniciarFactura();
                            }).
                            error(function(data, status, headers, config) {
                                alert("Se ha producido un error, reintente. Si el problema persiste reinicie el servidor");
                                console.log(data);
                            });
                }
                ;
            } else {
                alert("La factura no contiene detalles");
            }
            ;



        };
        init = function() {
            $scope.nombre = facturaGlobal.nombre;
            $scope.ruc = facturaGlobal.ruc;
            $scope.fecha = f;
            $scope.detalles = facturaGlobal.detallefacturaList;
            facturaGlobal.total = 0;
            facturaGlobal.iva5 = 0;
            facturaGlobal.iva10 = 0;
            facturaGlobal.exenta = 0;
            for (x = 0; x < facturaGlobal.detallefacturaList.length; x++) {
                $scope.detalles[x].index = x;
                if (facturaGlobal.detallefacturaList[x].impuesto === 0) {
                    console.log("impuesto 0");
                    $scope.detalles[x].exenta = facturaGlobal.detallefacturaList[x].precioUnitario * facturaGlobal.detallefacturaList[x].cantidad;
                    facturaGlobal.exenta += facturaGlobal.detallefacturaList[x].monto;
                } else if (facturaGlobal.detallefacturaList[x].impuesto === 5) {
                    console.log("impuesto 5");
                    $scope.detalles[x].iva5 = facturaGlobal.detallefacturaList[x].precioUnitario * facturaGlobal.detallefacturaList[x].cantidad;
                    facturaGlobal.iva5 += facturaGlobal.detallefacturaList[x].monto / 21;
                } else if (facturaGlobal.detallefacturaList[x].impuesto === 10) {
                    console.log("impuesto 10");
                    $scope.detalles[x].iva10 = facturaGlobal.detallefacturaList[x].precioUnitario * facturaGlobal.detallefacturaList[x].cantidad;
                    facturaGlobal.iva10 += facturaGlobal.detallefacturaList[x].monto / 11;
                } else {
                    console.log("que paso?");
                    console.log(facturaGlobal.detallefacturaList[x].impuesto);
                }
                facturaGlobal.total += facturaGlobal.detallefacturaList[x].monto;
                $scope.total = facturaGlobal.total;
                facturaGlobal.iva5 = parseInt(facturaGlobal.iva5);
                facturaGlobal.iva10 = parseInt(facturaGlobal.iva10);
            }
            ;
            $scope.Ncantidad = "";
            $scope.Ndescripcion = "";
            $scope.Nprecio = "";
            $scope.Nimpuesto = 10;
            $scope.labelTotal = facturaGlobal.total.toLocaleString();
        };
        init();
    }]);

//Controlador para ver facturas
Wssc.controller('facturasVerCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        var id = $routeParams.id.toString();
        url = "webresources/italo.facturas/" + id;
        $http.get(url).
                success(function(data, status, headers, config) {
                    console.log(data);
                    $scope.factura = data;
                }).
                error(function(data, status, headers, config) {
                    alert("Se ha producido un error, reintente. Si el problema persiste reinicie el servidor");
                    console.log(data);
                });
        var texto = new String();
        $scope.imprimir = function() {
            texto = "";
            texto += "<STYLE>";
            texto += "table {";
            texto += "border-collapse: collapse;";
            //texto += "border: black 0.5px solid;";
            texto += "font-size: 8pt;";
            texto += "font-family: sans-serif;";
            texto += "}";
            texto += "td {";
            //texto += "border: black 0.5px solid;";
            texto += "}";
            texto += "</STYLE>";

            texto += "<TABLE width=710>\n";
            texto += "<tr>\n";
            texto += "<td width=70>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=360>\n";
            texto += $scope.factura.fecha;
            texto += "</td>\n";
            texto += "<td width=77>\n";
            texto += 'x';
            texto += "</td>\n";
            texto += "<td width=203>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "</tr>\n";

            texto += "<tr>\n";
            texto += "<td width=38>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=540 colspan='2'>\n";
            texto += $scope.factura.nombre;
            texto += "</td>\n";
            texto += "<td width=132>\n";
            texto += $scope.factura.ruc;
            texto += "</td>\n";
            texto += "</tr>\n";

            texto += "<tr>\n";
            texto += "<td width=38>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=672>\n";
            texto += "&nbsp";
            texto += $scope.factura.direccion;
            texto += "</td>\n";
            texto += "</tr>\n";
            texto += "</table>";
            texto += "<br />";
            texto += "<br />";
            texto += "<TABLE width=710>\n";
            cantD = $scope.factura.detallefacturaList.length;
            t5 = 0;
            t10 = 0;
            for (i = 0; i < $scope.factura.detallefacturaList.length; i++) {
                texto += "<tr>\n";
                d = $scope.factura.detallefacturaList[i];
                texto += "<td width=40>\n";
                texto += d.id;
                texto += "</td>\n";
                texto += "<td width=69>\n";
                texto += d.cantidad;
                texto += "</td>\n";

                texto += "<td width=335>\n";
                texto += d.descripcion;
                texto += "</td>\n";

                texto += "<td width=67>\n";
                texto += d.precioUnitario.toLocaleString();
                texto += "</td>\n";


                //EXENTA
                texto += "<td width=67>\n";
                texto += "&nbsp";
                if (d.impuesto === 0)
                    texto += d.monto.toLocaleString();
                texto += "</td>\n";

                //5%
                texto += "<td width=67>\n";
                texto += "&nbsp";
                if (d.impuesto === 5) {
                    t5 += d.monto;
                    texto += d.monto.toLocaleString();
                }
                texto += "</td>\n";


                //10%
                texto += "<td width=67>\n";
                texto += "&nbsp";
                if (d.impuesto === 10) {
                    t10 += d.monto;
                    texto += d.monto.toLocaleString();
                }
                texto += "</td>\n";

                texto += "</tr>\n";

            }
            for (i = 0; i < 14 - cantD; i++) {
                texto += "<tr>\n";
                texto += "<td>\n";
                texto += "&nbsp";
                texto += "</td>\n";
                texto += "</tr>\n";
            }
            texto += "</table>";
            texto += "<TABLE width=730>\n";

            texto += "<tr>\n";
            texto += "<td width=154>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=114>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=154>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=107>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td width=67>\n";
            texto += "&nbsp";
            texto += $scope.factura.exenta.toLocaleString();
            texto += "</td>\n";
            texto += "<td width=67>\n";
            texto += "&nbsp";
            texto += t5.toLocaleString();
            texto += "</td>\n";
            texto += "<td width=67>\n";
            texto += "&nbsp";
            texto += t10.toLocaleString();
            texto += "</td>\n";
            texto += "</tr>\n";

            texto += "<tr>\n";
            texto += "<td width=154>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            iva5 = $scope.factura.iva5;
            iva10 = $scope.factura.iva10;
            ivaT = iva5 + iva10;
            texto += "<td width=114>\n";
            texto += iva5.toLocaleString();
            texto += "</td>\n";
            texto += "<td width=154>\n";
            texto += iva10.toLocaleString();
            texto += "</td>\n";
            texto += "<td width=308 colspan='4'>\n";
            texto += ivaT.toLocaleString();
            texto += "</td>\n";
            texto += "</tr>\n";

            texto += "<tr>\n";
            texto += "<td>\n";
            texto += "<br><br>&nbsp";
            texto += "</td>\n";
            texto += "<td>\n";
            texto += "&nbsp";
            texto += "</td>\n";
            texto += "<td  colspan='5'>\n";
            texto += NumeroALetras($scope.factura.total);
            texto += $scope.factura.total.toLocaleString() + "# )";
            texto += "</td>\n";
            texto += "</tr>\n";

            texto += "</table>";
            //texto = '';
            //for(i=0;i<50;i++)
            //    for(k=0;k<10;k++)
            //        texto+=k.toString();
            ImprimirVar(texto);
        };











        function Unidades(num) {

            switch (num)
            {
                case 1:
                    return "UN";
                case 2:
                    return "DOS";
                case 3:
                    return "TRES";
                case 4:
                    return "CUATRO";
                case 5:
                    return "CINCO";
                case 6:
                    return "SEIS";
                case 7:
                    return "SIETE";
                case 8:
                    return "OCHO";
                case 9:
                    return "NUEVE";
            }

            return "";
        }

        function Decenas(num) {

            decena = Math.floor(num / 10);
            unidad = num - (decena * 10);

            switch (decena)
            {
                case 1:
                    switch (unidad)
                    {
                        case 0:
                            return "DIEZ";
                        case 1:
                            return "ONCE";
                        case 2:
                            return "DOCE";
                        case 3:
                            return "TRECE";
                        case 4:
                            return "CATORCE";
                        case 5:
                            return "QUINCE";
                        default:
                            return "DIECI" + Unidades(unidad);
                    }
                case 2:
                    switch (unidad)
                    {
                        case 0:
                            return "VEINTE";
                        default:
                            return "VEINTI" + Unidades(unidad);
                    }
                case 3:
                    return DecenasY("TREINTA", unidad);
                case 4:
                    return DecenasY("CUARENTA", unidad);
                case 5:
                    return DecenasY("CINCUENTA", unidad);
                case 6:
                    return DecenasY("SESENTA", unidad);
                case 7:
                    return DecenasY("SETENTA", unidad);
                case 8:
                    return DecenasY("OCHENTA", unidad);
                case 9:
                    return DecenasY("NOVENTA", unidad);
                case 0:
                    return Unidades(unidad);
            }
        }//Unidades()

        function DecenasY(strSin, numUnidades) {
            if (numUnidades > 0)
                return strSin + " Y " + Unidades(numUnidades)

            return strSin;
        }//DecenasY()

        function Centenas(num) {

            centenas = Math.floor(num / 100);
            decenas = num - (centenas * 100);

            switch (centenas)
            {
                case 1:
                    if (decenas > 0)
                        return "CIENTO " + Decenas(decenas);
                    return "CIEN";
                case 2:
                    return "DOSCIENTOS " + Decenas(decenas);
                case 3:
                    return "TRESCIENTOS " + Decenas(decenas);
                case 4:
                    return "CUATROCIENTOS " + Decenas(decenas);
                case 5:
                    return "QUINIENTOS " + Decenas(decenas);
                case 6:
                    return "SEISCIENTOS " + Decenas(decenas);
                case 7:
                    return "SETECIENTOS " + Decenas(decenas);
                case 8:
                    return "OCHOCIENTOS " + Decenas(decenas);
                case 9:
                    return "NOVECIENTOS " + Decenas(decenas);
            }

            return Decenas(decenas);
        }//Centenas()

        function Seccion(num, divisor, strSingular, strPlural) {
            cientos = Math.floor(num / divisor)
            resto = num - (cientos * divisor)

            letras = "";

            if (cientos > 0)
                if (cientos > 1)
                    letras = Centenas(cientos) + " " + strPlural;
                else
                    letras = strSingular;

            if (resto > 0)
                letras += "";

            return letras;
        }//Seccion()

        function Miles(num) {
            divisor = 1000;
            cientos = Math.floor(num / divisor)
            resto = num - (cientos * divisor)

            strMiles = Seccion(num, divisor, "UN MIL", "MIL");
            strCentenas = Centenas(resto);

            if (strMiles == "")
                return strCentenas;

            return strMiles + " " + strCentenas;

            //return Seccion(num, divisor, "UN MIL", "MIL") + " " + Centenas(resto);
        }//Miles()

        function Millones(num) {
            divisor = 1000000;
            cientos = Math.floor(num / divisor)
            resto = num - (cientos * divisor)

            strMillones = Seccion(num, divisor, "UN MILLON", "MILLONES");
            strMiles = Miles(resto);

            if (strMillones == "")
                return strMiles;

            return strMillones + " " + strMiles;

            //return Seccion(num, divisor, "UN MILLON", "MILLONES") + " " + Miles(resto);
        }//Millones()

        function NumeroALetras(num) {
            var data = {
                numero: num,
                enteros: Math.floor(num),
                centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
                letrasCentavos: "",
                letrasMonedaPlural: " (Gs ",
                letrasMonedaSingular: " (Gs "
            };

            if (data.centavos > 0)
                data.letrasCentavos = "CON " + data.centavos + "/100";

            if (data.enteros == 0)
                return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
            if (data.enteros == 1)
                return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
            else
                return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
        }//NumeroALetras()








        function ImprimirVar(texto) {
            if (document.getElementById != null)
            {
                var htmlcode = '<HTML>\n<HEAD></HEAD>\n<BODY style="font: 100% serif;">';
                if (document.getElementsByTagName != null)
                {
                    htmlcode += texto.toString();
                }
                htmlcode += '\n\<SCRIPT>';
                var ImprimeElem = document.getElementById("Imprime");

                if (ImprimeElem != null)
                {
                    htmlcode += ImprimeElem.innerHTML;
                }
                else
                {
                    alert("No es posible encontrar la seccion a imprimir en el HTML");
                    return;
                }

                htmlcode += '</SCRIPT>\n</BODY>\n</HTML>';

                var printing = window.open("", "ImprimirVar");
                printing.document.open();
                printing.document.write(htmlcode);
                printing.document.close();
                printing.print();
                //printing.close();
            }
            else
            {
                alert("Se ha generado un problema...por favor revise que la version de su navegador sea la mas reciente");
            }
        }
    }]);
//Controlador para listar facturas
Wssc.controller('facturasListarCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
        var fecha = new Date();
        f = fecha.toISOString().substr(2, 8);
        f = f.substr(6, 2) + "-" + f.substr(3, 2) + "-" + f.substr(0, 2);
        $scope.fecha = f;
        $scope.listar = function() {
            $http.get("webresources/italo.facturas/fecha/" + $scope.fecha).
                    success(function(data, status, headers, config) {
                        $scope.facturas = data;
                        console.log(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    });
        };
    }]);