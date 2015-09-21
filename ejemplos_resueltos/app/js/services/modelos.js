
myApp.service('ModelosService', ['$http', function ($http) {
  return {
    get: function() {
      return $http.get('/data/modelos.json'); 
    }
  }
}]);
