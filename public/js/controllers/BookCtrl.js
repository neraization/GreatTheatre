sampleApp.controller('BookController', function($scope, $http, $log, $location)
{

    $scope.tagline = 'All Reservations can be found here!';

   // Helper function to read cookies
	/*function getCookie(name) {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		return match ? match[2] : null;
	  }
   
    const role = getCookie('role');
  if (role !== 'admin') {
    alert('Access denied for Basic users.');
    $location.path('/home'); // Redirect unauthorized users to /home
    return;
  } */

    var refresh = function() {
      var cookieInfo = document.cookie;
  		if(cookieInfo == "") {
  			alert('Please Login / Sign-up to access this module');
  			$location.path('/');
  		} else {
        $http.get('/book/getBooking').success(function(response) {
            console.log('READ IS SUCCESSFUL');
            $scope.bookList = response;
            console.log($scope.bookList);
            $scope.booking = "";
        });
        $scope.adminCity = true;
  			$scope.adminTheatre = true;
  			$scope.adminAssign = true;
  			$scope.adminMovies = true;
  			$scope.adminShowtime = true;
  			$scope.adminBooking = true;
  		}
    };

    $scope.logoutUser = function() {
      var cookieInfo = document.cookie;
      console.log(cookieInfo);
      if(cookieInfo == "") {
        alert("Already Logged Out");
      } else {
        document.cookie = cookieInfo + '; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        //alert("Log Out Successful!");
        $location.path('/');
      }
    }

    refresh();

    $scope.deleteBooking = function(booking) {
        console.log($scope.booking);
        $http.delete('/book/deleteBooking/' + booking._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

});
