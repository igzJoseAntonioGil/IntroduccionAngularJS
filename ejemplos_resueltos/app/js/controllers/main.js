
myApp.controller('MainCtrl', ['$scope', '$rootScope', 'NavigationService', function ($scope, $rootScope, NavigationService) {

  $scope.selectedItem = 'Home';

  $scope.menuItems = NavigationService.get();

  $scope.selectMenuItem = function (menuItem) {
    NavigationService.select(menuItem);
    // Aunque la siguiente línea es innecesaria, se incluye como ejemplo del uso de los servicios
    $scope.selectedItem = NavigationService.getSelected();
  };

}]);
