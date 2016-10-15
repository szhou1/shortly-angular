angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {

  $scope.getAll = Links.getAll;
  $scope.addOne = Links.addOne;
  $scope.data = {};
  $scope.init = function() {
    $scope.getAll()
      .then(function(data) {
        $scope.data.links = data;
      });
  };

  $scope.init();

})
.directive('shortLink', function() {
  return {
    templateUrl: '/app/links/short-link.html'
  };
});
