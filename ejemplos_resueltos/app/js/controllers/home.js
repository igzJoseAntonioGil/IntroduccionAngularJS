
myApp.controller('HomeCtrl', ['$scope', '$rootScope', "RelojService", function ($scope, $rootScope, RelojService) {

  var loadRelojes = function () {
    RelojService
      .get()
      .success(function (data) {
        $scope.listaRelojes = data;
      });
  };

  $scope.clock = {
    ciudad: 'Abu Dhabi',
    diferencia: 4
  };

  $scope.addClock = function () {
    if ($scope.clockForm.$valid)
    RelojService
      .post($scope.clock)
      .success(function (data) {
        
        $scope.clock = {};
        loadRelojes();
      });
  };

  $scope.deleteClock = function (ciudad) {
    RelojService
      .delete(ciudad)
      .success(function (data) {
        $scope.listaRelojes = data;
      });
  };

  $scope.windowInfo = function () {
    $scope.info = 'Window Size: ('
      + $rootScope.WINDOW_WIDTH + 'px x '
      + $rootScope.WINDOW_HEIGHT + 'px)';
  };

  loadRelojes();
}]);
