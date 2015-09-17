myApp.directive('relojSvg', function($interval) {

  return {
    restrict: 'E',
    scope: {
      ciudad: '@',
      diferencia: '@',
      onDelete: "="
    },
    templateUrl: 'templates/reloj.html',
    controller: ["$scope", function ($scope) {
      $scope.delete = function () {
        if ($scope.onDelete && typeof $scope.onDelete === "function") {
          $scope.onDelete($scope.ciudad);
        }
      }
    }],
    link: function(scope, elem) {

      scope.fecha = new Date();
      scope.fecha.setHours( scope.fecha.getHours() + parseInt(scope.diferencia) );

      var updateFecha = function() {
        scope.fecha.setSeconds( scope.fecha.getSeconds() + 1 );
        var data = {
          secs: scope.fecha.getSeconds(),
          mins: scope.fecha.getMinutes(),
          hours: scope.fecha.getHours()
        }

        scope.secAngle = parseInt(360 * data.secs / 60);
        scope.minAngle = parseInt(360 * data.mins / 60);
        scope.hourAngle = parseInt(360 * (data.hours % 12) / 12) + parseInt( 30 * data.mins / 60);
      };

      var clock = $interval(updateFecha, 1000);

      updateFecha();

    }
  };
});
