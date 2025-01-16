sampleApp.controller('LoginController', function ($scope, $http, $location, $log) {
   
    $scope.tagline = 'LOGIN HERE';
  
    // Refresh function to handle page state
    const refresh = function () {
        const role = getCookie('role');
        if (!role) {
            $scope.signInContainer = true;
            $scope.adminCity = false;
            $scope.adminTheatre = false;
            $scope.adminAssign = false;
            $scope.adminMovies = false;
            $scope.adminShowtime = false;
            $scope.adminBookings = false;
        } else {
            $location.path('/home');
        }
    };
    refresh();
  
    // Helper function to read cookies
    function getCookie(name) {
        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }
  
    // Sign Up a new user and assign a role
    $scope.signUpUser = function (user) {
        $http.post('/signup', { username: user.email, password: user.password, role: user.role })
            .then((response) => {
                alert("Sign-up successful! Role assigned.");
                $scope.goBack(); // Redirect to the sign-in page
            })
            .catch((error) => {
                console.error("Error signing up user:", error);
                alert(error.data.message || "Failed to sign up.");
            });
    };
  
    // Sign In a user
    $scope.signInUser = function (user) {
        $http.post('/signin', { username: user.email, password: user.password })
            .then((response) => {
                const token = response.data.token;
                //const role = response.data.role;

                 // Decode the token to extract role
                var decodedToken = jwt_decode(token); // Use jwt-decode to decode the token
                var role = decodedToken.role;
  
                // Store token and role in cookies or localStorage
                document.cookie = `role=${role}; path=/`;
                localStorage.setItem('token', token);
  
                // Redirect based on role
                if (role === "admin") {
                    $scope.adminCity = true;
                    $scope.adminTheatre = true;
                    $scope.adminMovies = true;
                    $scope.adminShowtime = true;
                    $scope.adminBookings = true;
                    $scope.adminAssign = true;
                } else {
                    $scope.adminCity = false;
                    $scope.adminTheatre = false;
                    $scope.adminMovies = false;
                    $scope.adminShowtime = false;
                    $scope.adminBookings = false;
                    $scope.adminAssign = false;
                }
  
                $location.path('/home');
            })
            .catch((error) => {
                console.error("Login failed:", error);
                alert(error.data.message || "Failed to log in.");
            });
    };
      
  
    // Show Sign Up container
    $scope.signUpShow = function () {
        $scope.signUpContainer = true;
        $scope.signInContainer = false;
    };
  
    // Go back to Sign In container
    $scope.goBack = function () {
        $scope.signUpContainer = false;
        $scope.signInContainer = true;
    };
  
    // Logout function
    $scope.logoutUser = function () {
        document.cookie = "role=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.removeItem('token');
        $location.path('/');
    };
  });
  