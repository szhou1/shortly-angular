// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};
  $scope.inputError = false;

  $scope.signin = function () {
    console.log('user', $scope.user);
    if(!$scope.user.username || !$scope.user.password) {
      $scope.inputError = true;
    }

    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    console.log('user', $scope.user);
    console.log($scope.inputError);
    if(!$scope.user.username || !$scope.user.password) {
      $scope.inputError = true;
    }


    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

});
