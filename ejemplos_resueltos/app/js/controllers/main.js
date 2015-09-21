
myApp.controller('MainCtrl', ['$scope', '$rootScope', 'NavigationService', function ($scope, $rootScope, NavigationService) {

  $scope.menuItems = NavigationService.get();

  $scope.getSelected = NavigationService.getSelected;

  $scope.selectMenuItem = NavigationService.select;

}]);
