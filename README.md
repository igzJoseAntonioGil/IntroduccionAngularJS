# Introduccion a AngularJS

Es un framework javascript, pensado principalmente para realizar aplicaciones monopágina (SPA), con navegación mediante hashtag, por lo tanto, la definición de la aplicación debe contemplar eso de inicio.

Es potente, pero no debemos pensar en que nos va a resolver la vida de cara a entregarlo a desarrolladores que no se hayan pegado de lleno con este lenguaje. Es más, si venimos de un tratamiento de javascript muy rebajado por jQuery, el manejo del DOM sin jQuery a través de AngularJS puede ser confuso.

Este framework está muy orientado al modelo MVC:

- Model -> representado por los **servicios**, **factorías**, **providers**
- View -> equivale a las **vistas** o **plantillas** HTML
- Controller -> se corresponde con **controladores**


- [Módulo principal](#módulo-principal)
- [Controladores](#controladores)
	- [Scope](#scope)
	- [RootScope](#rootscope)
- [Directivas](#directivas)
	- [Isolated Scope](#isolated-scope)
- [Servicios](#servicios)
	- [Servicios de AngularJS](#servicios-de-angularjs)
	- [Router](#router)
- [Enlaces de utilidad](#enlaces-de-utilidad)

> Este curso seguirá en la medida de lo posible las reglas propuestas por la guía de estilo de [AirBnb](https://github.com/airbnb/javascript/tree/master/es5) para ES5, salvo en casos puntuales, como ejemplos copiados de internet que no hayan sido adaptados en este sentido

### Módulo principal
El módulo principal es lo que define una aplicación de Angular, a partir de la cual se construyen todos los elementos que necesitaremos en la aplicación.
Generalmente, para evitar conflictos, solo hay un módulo por aplicación, el cual se define de la siguiente forma:

```
var myApp = angular.module("myApp", []);
```

El primer parámetro es el nombre que le daremos a nuestra aplicación, mientras que el segundo parámetro es una lista de módulos adicionales que queremos cargar en nuestra app.
Estos módulos suelen añadir funcionalidades concretas a la aplicación, por ejemplo:

- **ngRoute**: ofrece soporte para navegar entre vistas de nuestra aplicación
- **ngTouch**: soporte para dispositivos táctiles
- **ngDialog**: ventanas modales (formularios, mensajes, confirm, ...)
- **pascalprecht.translate**: soporte multiidioma

> Es importante recordar que cada módulo lleva asociado uno o más ficheros JS, los cuales será necesario importar en la página HTML principal

```
// Angular application object
var myApp = angular.module("myApp", [
		"ngRoute",                // Routing
		"ngTouch",                // Improves ng-click on mobile devices
		"ngAnimate",              // Adds some animation support
		"ngDialog",               // modal dialogs directive
		"pascalprecht.translate"  // i18n localization
	]);
```
Por ejemplo, los módulos anteriores, corresponden con los siguientes scripts:
```
<script src='js/vendor/angular-1.4.4-build.4121/angular-route.js'></script>
<script src='js/vendor/angular-1.4.4-build.4121/angular-touch.js'></script>
<script src='js/vendor/angular-1.4.4-build.4121/angular-animate.js'></script>
<script src='js/vendor/ngDialog.js'></script>
<script src='js/vendor/angular-translate.min.js'></script>
<script src='js/vendor/angular-translate-loader-static-files.js'></script>

```

Como podemos ver en los ejemplos, hay muchos módulos de terceros que ofrecen diversas funcionalidades y, por supuesto, tambien podemos desarrollar nuestros propios módulos para reutilizarlos posteriormente.

**NOTA:** *A la hora de elegir el nombre de un módulo, se recomienda usar un espacio de nombres, para evitar posibles conflictos con módulos externos*

### Controladores
```
myApp.controller("MainCtrl", ["$window", function($window) {
	$window.alert("Hello World!!");
}]);
```
#### Scope
En el objeto $scope se almacenan todas las variables dentro del ámbito del controlador. En el HTML, todo lo que se encuentre dentro de la directiva ng-controller=”mainController es controlable desde el objeto $scope.
```
myApp.controller("MainCtrl", ["$scope", function($scope) {
	// Your code here, i.e.:
	$window.alert("Hello World!!");
}]);
```
#### RootScope
```
```

Ejemplos:
- http://jsfiddle.net/JoseAntonioGil/nhwvk9wb/

### Directivas
```
myApp.directive("productRow", ["$rootScope", function($rootScope) {

	return {
		"restrict": "EA",
		"require": "^productGrid",
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
}]);
```
#### Isolated Scope
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
			...
		}
	};
}]);
```

Ejemplos:
- http://jsfiddle.net/JoseAntonioGil/232y12a6/

### Servicios
```
myApp.factory("ProductTypes", ["ProductTypesService", function(ProductTypesService) {

	var
		_data,
		_Init = function() {
			ProductTypesService.get(_ProductTypesLoaded);
			_Init = angular.noop;
		};

	_Init();

	return {
		"Get": function() {
			return _data;
		}
	};
}]);
```

#### Servicios de AngularJS
[**$http**](https://docs.angularjs.org/api/ng/service/$http)
The $http service is a core Angular service that facilitates communication with the remote HTTP servers via the browser's XMLHttpRequest object or via JSONP.
```
// Cuando se cargue la página, pide del API todos los TODOs
$http.get('/api/todos')
    .success(function(data) {
        $scope.todos = data;
        console.log(data)
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
```
Ejemplos:
- http://jsfiddle.net/JoseAntonioGil/ohbrmodL/
- http://jsfiddle.net/JoseAntonioGil/ohbrmodL/1/

### Router
Una de las principales ventajas de Angular es la orientación a aplicaciones SPA (single page application), las cuales consisten en la navegación dentro de la misma página, sin necesidad de recargarla, mediante la utilización de vistas/plantillas.
Para ello, en Angular se utiliza el módulo *ngRoute*, el cual permite configurar diferentes rutas y asociarlas a otras tantas vistas.

### Enlaces de utilidad

- Curso de AngularJS en Code School: https://www.codeschool.com/courses/shaping-up-with-angular-js
- Tutorial oficial de AngularJS: https://docs.angularjs.org/tutorial
- API reference de AngularJS: https://docs.angularjs.org/api
- Blog con temas de AngularJS en español: https://carlosazaustre.es/blog/tag/angularjs/

- URL este tutorial (GitHub): https://github.com/igzJoseAntonioGil/IntroduccionAngularJS
