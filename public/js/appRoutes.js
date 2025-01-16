angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/home', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/landing', {
			templateUrl: 'views/landing.html',
			controller: 'UserController'
		})
		.when('/booking', {
			templateUrl: 'views/booking.html',
			controller: 'BookController'
		})
		.when('/personalBooking', {
			templateUrl: 'views/personalBooking.html',
			controller: 'BookController'
		})
		.when('/movies', {
			templateUrl: 'views/movies.html',
			controller: 'MoviesController'
		})
		.when('/city', {
			templateUrl: 'views/city.html',
			controller: 'cityController'
		})
		.when('/showtime', {
			templateUrl: 'views/showtime.html',
			controller: 'showtimeController'
		})
		.when('/assign', {
			templateUrl: 'views/assign.html',
			controller: 'AssignController'
		})
		/*.when('/assign', {
			templateUrl: 'views/assign.html',
			controller: 'AssignController',
			resolve: {
			  access: function ($location) {
				const role = getCookie('role');
				if (role !== 'admin') {
				  alert('Access denied for Basic users');
				  $location.path('/home'); // Redirect to /home if not admin
				}
			  },
			},
		  })
		  .otherwise({
			redirectTo: '/home',
		  })*/
    .when('/theatre', {
			templateUrl: 'views/theatre.html',
			controller: 'theatreController'
		});

	$locationProvider.html5Mode(true);

	// Helper function to read cookies
	function getCookie(name) {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		return match ? match[2] : null;
	  }
}]);
