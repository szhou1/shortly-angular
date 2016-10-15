angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  //$scope.flag = false;

  $scope.addLink = function() {
    $scope.flag = true;
    Links.addOne($scope.link)
      .then(function (resp) {
        $scope.linksArray.push(resp.data);
        $scope.flag = false;
        $scope.link = '';
        console.log('addLink resp', resp);
      })
      .catch(function(err) {
        $scope.flag = false;
      });
  };
});
// .directive('shortLink', function() {
//   return {
//     templateUrl: '/app/links/short-link.html'
//   }
// });
