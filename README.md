# Introduccion a AngularJS

Es un framework javascript, pensado principalmente para realizar aplicaciones monopágina (SPA), con navegación mediante hashtag, por lo tanto, la definición de la aplicación debe contemplar eso de inicio.

Es potente, pero no debemos pensar en que nos va a resolver la vida de cara a entregarlo a desarrolladores que no se hayan pegado de lleno con este lenguaje. Es más, si venimos de un tratamiento de javascript muy rebajado por jQuery, el manejo del DOM sin jQuery a través de AngularJS puede ser confuso.

* [Módulo principal](#Módulo principal)
* [Controladores](#controladores)
* [Directivas](#directivas)
* [Servicios](#servicios)
* [Router](#router)


### Módulo principal
```
// Angular application object
var myApp = angular.module("myApp", [
		"ngRoute",                // Routing
		"ngTouch",                // Improves ng-click on mobile devices, adds swipeLeft & swipeRight
		"ngAnimate",              // Adds some animation support
		"pascalprecht.translate", // i18n localization
		"ngDialog"                // modal dialogs directive
	]);
```

### Controladores

```
myApp.controller("MainCtrl", ["$window", function($window) {

	// Your code here, i.e.:
	$window.alert("Hello World!!");
}]);
```

### Directivas
```
myApp.directive("productRow", ["$rootScope", function($rootScope) {

	return {
		"restrict": "EA",
		"require": "^productGrid",
		"scope": {
			"data": "=",
			"gridType": "@"
		},
		"templateUrl": "templates/products/product_grid_row.html",
		"link": function($scope, tElement, tAttrs, ProductGridCtrl) {

			var _OpenCountryDetail = function(p_country) {
					ProductGridCtrl.OpenWorldDetail(null, p_country);
				},
				_Init = function() {
					$scope.OpenCountryDetail = _OpenCountryDetail;
					ProductGridCtrl.UpdateTotal($scope.data.totalRevenue, 0);
				};

			_Init();
		}
	};
}])
```
### Servicios
```
myApp.factory("ProductTypes", ["ProductTypesService", function(ProductTypesService) {
	var
		  _infoRaw
		, _infoObj
		, _Raw = function() {
			return _infoRaw;
		  }
		, _Obj = function() {
			return _infoObj;
		  }
		, _Reduce2Obj = function(obj, item) {
			obj[item.id] = {
				  "legend": item.legend
				, "color": item.color
			};
			return obj;
		  }
		, _ProductTypesLoaded = function(p_data) {
			_infoObj = p_data.reduce(_Reduce2Obj, {});
			p_data.pop();
			_infoRaw = p_data;
		  }
		, _Init = function() {
			ProductTypesService.get(_ProductTypesLoaded);
			_Init = angular.noop;
		  }
		;
	_Init();
	return {
		  "Init": _Init // Does not really need to be called...
		, "Raw": _Raw // Returns the 5 basic types in raw format.
		, "Obj": _Obj //Returns all 5 types, plus the aggregated one, in object format.
	};
}])
```
### Router
