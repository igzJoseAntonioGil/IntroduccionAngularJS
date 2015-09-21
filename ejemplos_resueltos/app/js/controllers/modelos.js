
myApp.controller('ModelosCtrl', ['$scope', '$routeParams', 'NavigationService', 'ModelosService', function ($scope, $routeParams, NavigationService, ModelosService) {

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

    NavigationService.select('Modelos');
  };

  Init();

}]);
