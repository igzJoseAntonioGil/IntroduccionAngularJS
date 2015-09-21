# Introduccion a AngularJS

Es un framework javascript, pensado principalmente para realizar aplicaciones monopágina (SPA), con navegación mediante hashtag, por lo tanto, la definición de la aplicación debe contemplar eso de inicio.

Es potente, pero no debemos pensar en que nos va a resolver la vida de cara a entregarlo a desarrolladores que no se hayan pegado de lleno con este lenguaje. Es más, si venimos de un tratamiento de javascript muy rebajado por jQuery, el manejo del DOM sin jQuery a través de AngularJS puede ser confuso.

Este framework está muy orientado al modelo MVC:

- Model -> representado por el **scope** (tambien **servicios**, **factorías**, **providers**)
- View -> equivale a las **vistas** o **plantillas** _HTML_
- Controller -> se corresponde con **controladores**

#### Tabla de contenidos
- [Módulo principal](#módulo-principal)
- [Controladores](#controladores)
	- [Scope](#scope)
	- [RootScope](#rootscope)
- [Directivas](#directivas)
	- [Isolated Scope](#isolated-scope)
	- [Directivas de Angular](#directivas-de-angular)
- [Servicios](#servicios)
	- [Servicios de Angular](#servicios-de-angular)
	- [Router](#router)
- [Enlaces de utilidad](#enlaces-de-utilidad)

> Este curso seguirá en la medida de lo posible las reglas propuestas por la guía de estilo de [AirBnb](https://github.com/airbnb/javascript/tree/master/es5) para ES5, salvo en casos puntuales, como ejemplos copiados de internet que no hayan sido adaptados en este sentido

### Módulo principal
El módulo principal es lo que define una aplicación de Angular, a partir de la cual se construyen todos los elementos que necesitaremos en la aplicación.
Generalmente, para evitar conflictos, solo hay un módulo por aplicación, el cual se define de la siguiente forma:

JavaScript
```
var myApp = angular.module("myApp", []);
```
HTML
```
<html ng-app="myApp">
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
Un Controlador viene definido por una función constructora y se usa para configurar el scope de Angular.

Al usar un controlador con "ng-controller", Angular creará una nueva instancia de dicho controlador. Se creará un nuevo "child scope" que estará disponible en la función constructora y se podrá inyectar como $scope.

JavaScript
```
var myApp = angular.module('myApp',[]);

myApp.controller('GreetingController', ['$scope', function($scope) {
  $scope.greeting = 'Hola!';
}]);
```
HTML
```
<div ng-controller="GreetingController">
  {{ greeting }}
</div>
```

Los controladores se usan para:

- Inicializar el objeto $scope.
- Definir el comportamiento del $scope (añadiendo variables y métodos).

Los controladores no se usan para:

- Manipular el DOM: Los controladores sólo deben encargarse de la lógica de negocio.	Para la lógica de presentación, podemos usar el "data-binding" o las directivas (para realizar la manipulación del DOM), ya que hacerlo en los controladores, puede afectar significativamente su testabilidad.
- Formatear los datos de entrada: Use angular form controls instead.
- Filtrar los datos de salida: Para ello se usan los filtros de angular.
- Compartir código entre controladores: En lugar de eso, es mejor usar servicios.
- Manejar el ciclo de vida de otros componentes (por ejemplo, para crear instancias de un servicio).

#### Scope
Los scopes son objetos que permiten la separación entre el modelo y la vista, mediante la observación de los cambios que se producen en el modelo.
También facilitan la emsión y suscripción de eventos ($emit, $watch).

En el controlador, dentro del objeto $scope, se almacenan todas las variables del ámbito de dicho controlador. En el HTML (vista), todo lo que se encuentre dentro de la directiva ng-controller="" es accesible/puede acceder al objeto $scope.
```
myApp.controller("MainCtrl", ["$scope", "$window", function($scope, $window) {
	// Your code here, i.e.:
	$window.alert("Hello World!!");
}]);
```

#### Notación "controller as"
Al utilizar un controlador, se puede utilizar un alias, mediante el uso de "controller as", lo que da al controlador un comportamiento diferente. En estos casos, el controlador se comporta como si fuese una propiedad más del nuevo "scope" y las variables que definamos, formarán parte del controlador:

HTML
```
<div ng-controller="GreetingController controller as greetCtrl">
  {{ greetCtrl.greeting }}
</div>
```

Esta notación tambien implica cambios en la definición del controlador, donde el $scope "desaparece" y hacemos uso del objeto "this":

JavaScript
```
app.controller('MainCtrl', function () {
  this.title = 'Some title';
});
```

#### RootScope
Todas aplicaciones de AngularJS tienen un único "root scope" y todos los demás scopes son descendientes de éste.

Para utilizarlo, utilizaremos el servicio "$rootScope" perteneciente al núcleo de AngularJS:
```
myApp.controller("MainCtrl", ["$scope", "$rootScope", function($scope, $rootScope) {
	$rootScope.version = "1.0.2";
}]);
```

[Más info][https://docs.angularjs.org/guide/scope]

Ejemplos:
- http://jsfiddle.net/JoseAntonioGil/nhwvk9wb/

### Directivas
A grandes rasgos, las directivas son marcadores de los elementos DOM (como atributos, elementos, comentarios o clases CSS), que le dicen al compilador de HTML de AngularJS que asigne un comportamiento concreto a dicho elemento DOM (p.e. mediante escuchadores de eventos), o incluso transformando el propio elemento DOM y sus hijos.

JavaScript
```
angular.module('docsRestrictDirective', [])
	.controller('Controller', ['$scope', function($scope) {
		$scope.customer = {
			name: 'Naomi',
			address: '1600 Amphitheatre'
		};
	}])
	.directive('myCustomer', function() {
		return {
			restrict: 'E',
			templateUrl: 'my-customer.html'
		};
	});
```
HTML
```
<div ng-controller="Controller">
	<my-customer></my-customer>
</div>
```

Ejemplos:
- http://jsfiddle.net/JoseAntonioGil/232y12a6/

#### Isolated Scope
https://umur.io/angularjs-directives-using-isolated-scope-with-attributes/

- Text Binding (Prefix: @)
- One-way Binding (Prefix: &)
- Two-way Binding (Prefix: =)

JavaScript
```
angular.module('docsIsolateScopeDirective', [])
	.controller('Controller', ['$scope', function($scope) {
		$scope.naomi = { name: 'Naomi', address: '1600 Amphitheatre' };
		$scope.igor = { name: 'Igor', address: '123 Somewhere' };
	}])
	.directive('myCustomer', function() {
		return {
			restrict: 'E',
			scope: {
				customerInfo: '=info'
			},
			templateUrl: 'my-customer-iso.html'
		};
	});
```
HTML
```
<div ng-controller="Controller">
	<my-customer info="naomi"></my-customer>
	<hr>
	<my-customer info="igor"></my-customer>
</div>
```

Ejemplos:
- http://jsfiddle.net/JoseAntonioGil/5p1jezcc/

#### Directivas de Angular
A continuación, se indica un listado con las directivas mas usadas que vienen incluídas en AngularJS:

- **ng-model**: permite asociar el valor de una variable al valor del elemento HTML (proporcionando two-way-binding)
	```
		<input type="text" name="login" ng-model="user.login" />
	```
- **ng-bind**: asocia el valor de una expresión al contenido (innerHTML) del elemento
	```
		<div class="username" ng-bind="user.login"></div>
	```
- **ng-repeat**: permite recorrer todos los elementos de un array o las propiedades de un objeto
	```
		<li class="menutItem" ng-repeat="item in ['Inicio', 'Productos', 'Contacto', 'Ayuda']"></li>
	```
- **ng-class**: establece una clase CSS en función del valor de una expresión
	```
		<div ng-class="{'redNumbers': cuenta.saldo < 0}" ng-bind="cuenta.saldo"></div>
	```
- **ng-disabled**: activa o desactiva un elemento según el valor de una expresión
	```
		<button ng-disabled="isValidForm" ng-bind="Enviar"></button>
	```
- **ng-show/ng-hide**: muestra u oculta un elemento si se cumple una condición
	```
		<div class="adminBtns" ng-show="isAdmin"></div>
		<div class="options" ng-hide="notLogged"></div>
	```
- **ng-if**: muestra un elemento si se cumple una condición. A diferencia de los dos ejemplos anteriores (ng-show y ng-hide), "ng-if" no renderiza el contenido cuando no se cumple la condición.
	```
		<div class="adminBtns" ng-if="isAdmin"></div>
	```
- **ng-change/ng-click/...** (events): permite asociar un manejador (listener) al evento en cuestión
	```
		<button ng-click="Enviar()" ng-bind="Enviar"></button>
		<button ng-mouseenter="Resaltar(true)" ng-mouseleave="Resaltar(false)" ng-bind="Enviar"></button>
		<form ng-submit="SubmitForm()"></form>
	```

### Servicios
Los servicios de Angular son objetos *sustituibles* que se pueden conectar entre sí mediante la inyección de dependencias (DI). Además, se pueden usar para organizar y compartir código/datos entre diferentes componentes de una aplicación.

Los servicios de angular son:

- *Instanciación perezosa*: Angular solo instancia un servicio cuando un componente de la aplicación depende de él.
- *Singletons*: Todas los componentes que dependen de un servicio reciben una referencia a una única instacia del mismo, generada por el constructor del servicio.

Angular ofrece varios servicios muy útiles ([como $http](#servicios-de-angular)), pero también es posible crear nuestros propios servicios y usarlos en nuestra aplicación.
```
angular
	.module('myServiceModule', [])
	.controller('MyController', ['$scope','notify', function ($scope, notify) {
		$scope.callNotify = function(msg) {
			notify(msg);
		};
	}])
	.factory('notify', ['$window', function(win) {
		var msgs = [];
		return function(msg) {
			msgs.push(msg);
			if (msgs.length == 3) {
				win.alert(msgs.join("\n"));
				msgs = [];
			}
		};
	}]);
```

#### Servicios de Angular
[**$http**](https://docs.angularjs.org/api/ng/service/$http)
El servicio $http del núcleo de Angular que facilita la comunicación con servidores HTTP remotos a través del objeto XMLHttpRequest del navegador o mediante JSONP.
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

Otros servicios útiles de AngularJS:

- **$compile**: Compiles an HTML string or DOM into a template and produces a template function, which can then be used to link scope and the template together.
- **$filter**: Filters are used for formatting data displayed to the user.
- **$interval**: Angular's wrapper for window.setInterval. The fn function is executed every delay milliseconds.
- **$location**: The $location service parses the URL in the browser address bar (based on the window.location) and makes the URL available to your application. Changes to the URL in the address bar are reflected into $location service and changes to $location are reflected into the browser address bar.
- **$log**: Simple service for logging. Default implementation safely writes the message into the browser's console (if present).
- **$q**: A service that helps you run functions asynchronously, and use their return values (or exceptions) when they are done processing.
- **$rootScope**: Every application has a single root scope. All other scopes are descendant scopes of the root scope. Scopes provide separation between the model and the view, via a mechanism for watching the model for changes. They also provide an event emission/broadcast and subscription facility. See the developer guide on scopes.
- **$timeout**: Angular's wrapper for window.setTimeout. The fn function is wrapped into a try/catch block and delegates any exceptions to $exceptionHandler service.
- **$window**: A reference to the browser's window object. While window is globally available in JavaScript, it causes testability problems, because it is a global variable. In angular we always refer to it through the $window service, so it may be overridden, removed or mocked for testing.

https://docs.angularjs.org/api/ng/service

### Router
Una de las principales ventajas de Angular es la orientación a aplicaciones SPA (single page application), las cuales consisten en la navegación dentro de la misma página, sin necesidad de recargarla, mediante la utilización de vistas/plantillas.
Para ello, en Angular se utiliza el módulo *ngRoute*, el cual permite configurar diferentes rutas y asociarlas a sendas vistas y controladores.

```
angular
	.module('ngRouteExample', ['ngRoute'])
	.config(function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/Book/:bookId', {
				templateUrl: 'book.html',
				controller: 'BookController',
				resolve: {
					// I will cause a 1 second delay
					delay: function($q, $timeout) {
						var delay = $q.defer();
						$timeout(delay.resolve, 1000);
						return delay.promise;
					}
				}
			})
			.when('/Book/:bookId/ch/:chapterId', {
				templateUrl: 'chapter.html',
				controller: 'ChapterController'
			});

		// configure html5 to get links working on jsfiddle
		$locationProvider.html5Mode(true);
	});
```

### Enlaces de utilidad

- Curso de AngularJS en Code School: https://www.codeschool.com/courses/shaping-up-with-angular-js
- Tutorial oficial de AngularJS: https://docs.angularjs.org/tutorial
- Blog con temas de AngularJS en español: https://carlosazaustre.es/blog/tag/angularjs
- Developer guide de AngularJS: https://docs.angularjs.org/guide
- API reference de AngularJS: https://docs.angularjs.org/api

- URL este tutorial (GitHub): https://github.com/igzJoseAntonioGil/IntroduccionAngularJS
