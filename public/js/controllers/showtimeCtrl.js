sampleApp.controller('showtimeController', function($scope, $http, $log, $location){

  $scope.tagline = "Schedule Your Next Showtime with Ease";

  // Helper function to read cookies
	function getCookie(name) {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		return match ? match[2] : null;
	  }
   
    const role = getCookie('role');
  if (role !== 'admin') {
    alert('Access denied for Basic users.');
    $location.path('/home'); // Redirect unauthorized users to /home
    return;
  }

  $scope.formatTime = function () {
    const time = $scope.showtime.showTimings; // e.g., 1970-01-01T20:31:00.000Z
    if (time) {
      const date = new Date(time);

      // Get local hours and minutes
      const hours = date.getHours();
      const minutes = date.getMinutes();

      // Format hours and minutes to always have two digits
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');

      // Set the formatted time back to showTimings in HH:mm format
      $scope.showtime.showTimings = `${formattedHours}:${formattedMinutes}`;
    }
  };


  var loadTheatres = function() {
    var cookieInfo = document.cookie;
		if(cookieInfo == "") {
			alert('Please Login / Sign-up to access this module');
			$location.path('/');
		} else {
      $http.get('/theatre/getTheatre').success(function(response){
        console.log('Inside Load Threatres');
        $scope.theatreList = response;
        console.log($scope.theatreList);
        $scope.threatre = "";
      });
      $scope.adminCity = true;
      $scope.adminTheatre = true;
      $scope.adminAssign = true;
      $scope.adminMovies = true;
      $scope.adminShowtime = true;
      $scope.adminBooking = true;
    }
  };

  loadTheatres();

  var refresh = function() {
    $http.get('/showtime/getTimings').success(function(response){
      console.log("READ IS SUCCESSFUL");
      $scope.showtimeList = response;
      console.log($scope.showtimeList);
      console.log("SHOWED TIME LIST INSIDE SHOWTIME CONTROLLER");
      $scope.showtime = "";
    });
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

  $scope.addTimings = function(showtime){
    var showObj = {
      STiming: showtime.showTimings,
      STheatre: showtime.theatreName
    };

    console.log(showObj);

    $http({
      method: 'POST',
      url: 'showtime/addTimings',
      headers: {'Content-Type': 'application/json'},
      data: angular.fromJson(showObj)
    })
    .then(function(response){
      console.log(response);
      console.log("TIMINGS ARE ADDED TO THEATRE SELECTED");
      refresh();
    })
  };

  $scope.removeShowtime = function(showtime) {
    console.log(showtime.id);
    $http.delete('/showtime/deleteShowtime/' + showtime._id).success(function(response){
      console.log(response);
      console.log("DELETED SHOWTIME SUCCESSFLLY");
      refresh();
    });
  };

  $scope.editShowtime = function(showtime) {
    $http.get('/showtime/getTimings/' + showtime._id).success(function(response){
      $scope.showtime = response[0];
    });
  };

  $scope.updateShowtime = function(showtime) {
    console.log("REACHED SHOWTIME UPDATE");
    console.log($scope.showtime._id);
    $http.put('/showtime/updateShowtime/' + $scope.showtime._id, $scope.showtime).success(function(response){
      console.log(response);
      console.log("Showtimes Updated Successfully");
      refresh();
    });
  };

});
