// Angular application object
var myApp = angular.module("myApp", []);

myApp.controller("MainCtrl", ["$scope", "$window", function($scope, $window) {
    // Your code here, i.e.:
    $scope.tituloBoton = 'Enviar';
    $scope.Saludar = function() {
        $scope.mensaje = 'Hola ' + $scope.nombre;
    }
}]);
