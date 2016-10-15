angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.flag = false;
  $scope.addLink = function() {
    $scope.flag = true;
    Links.addOne($scope.link)
      .then(function (resp) {
        $scope.flag = false;
        //Todo spinner stuff
        $scope.link = '';
        console.log('addLink resp', resp);
      });
  };
});
