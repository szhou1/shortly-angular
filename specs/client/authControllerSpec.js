'use strict';

describe('AuthController', function () {
  var $scope, $rootScope, $location, $window, $httpBackend, createController, Auth;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('shortly'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    Auth = $injector.get('Auth');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    // used to create our AuthController for testing
    createController = function () {
      return $controller('AuthController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        Auth: Auth
      });
    };

    createController();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
    $window.localStorage.removeItem('com.shortly');
  });

  it('should have a signup method', function () {
    expect($scope.signup).to.be.a('function');
  });

  it('should store token in localStorage after signup', function () {
    // create a fake JWT for auth
    var token = 'sjj232hwjhr3urw90rof';
    $scope.user = {
      username: 'steve',
      password: 'steve'
    };
    // make a 'fake' reques to the server, not really going to our server
    $httpBackend.expectPOST('/api/users/signup').respond({token: token});
    $scope.signup();
    $httpBackend.flush();
    expect($window.localStorage.getItem('com.shortly')).to.equal(token);
  });

  it('should have a signin method', function () {
    expect($scope.signin).to.be.a('function');
  });

  it('should store token in localStorage after signin', function () {
    // create a fake JWT for auth
    var token = 'sjj232hwjhr3urw90rof';
    $scope.user = {
      username: 'steve',
      password: 'steve'
    };
    $httpBackend.expectPOST('/api/users/signin').respond({token: token});
    $scope.signin();
    $httpBackend.flush();
    expect($window.localStorage.getItem('com.shortly')).to.equal(token);
  });

  it('should not call signin function when user enters faulty input', function() {
    sinon.spy(Auth, 'signin');
    $scope.user = {
      username: '',
      password: 'mypass'
    }
    $scope.signin();
    expect(Auth.signin.called).to.equal(false);
  });

  it('should not call signup function when user enters faulty input', function() {
    sinon.spy(Auth, 'signup');
    $scope.user = {
      username: '',
      password: ''
    }
    $scope.signup();
    expect(Auth.signup.called).to.equal(false);
  });
});
