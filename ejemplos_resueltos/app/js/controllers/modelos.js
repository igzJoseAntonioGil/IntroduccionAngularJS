
myApp.controller('ModelosCtrl', ['$scope', '$rootScope', '$routeParams', 'ModelosService', function ($scope, $rootScope, $routeParams, ModelosService) {

  var Init = function() {

    ModelosService
      .get()
      .success(function (data) {
        $scope.modelos = data; 

        if ($routeParams.modelo) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].id === $routeParams.modelo) {
              $scope.modelo = data[i];
              break;
            }
          }
        }                 
      });

    $scope.modelo = {};
  };

  Init();

}]);
