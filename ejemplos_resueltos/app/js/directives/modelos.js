myApp.directive('fichaModelo', ["$filter", function($filter) {

	return {
		restrict: 'EA',
		templateUrl: 'templates/ficha_modelo.html',
		link: function ($scope) {
			$scope.modelo.name = $filter('uppercase')($scope.modelo.name);
		}
	};
}]);