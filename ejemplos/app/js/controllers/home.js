
myApp.controller('HomeCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
  $scope.windowInfo = function () {
    $scope.info = 'Window Size: ('
      + $rootScope.WINDOW_WIDTH + 'px x '
      + $rootScope.WINDOW_HEIGHT + 'px)';
  }
}]);
