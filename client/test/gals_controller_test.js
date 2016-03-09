var angular = require('angular');

describe('gals controller', () => {
  var $httpBackend;
  var $scope;
  var $ControllerConstructor;

  beforeEach(angular.mock.module('galsApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $ControllerConstructor = $controller;
    $scope = $rootScope.$new();
  }));

  it('should be able to make a controller', () => {
    var galsController = $ControllerConstructor('GalsController', {$scope});
    expect(typeof galsController).toBe('object');
    expect(Array.isArray($scope.gals)).toBe(true);
    expect(typeof $scope.getAll).toBe('function');
  });

  describe('REST requests', () => {
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $ControllerConstructor('GalsController', {$scope});
    }));

    afterEach(() => {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should make a get request to /api/gals', () => {
      $httpBackend.expectGET('http://localhost:3000/api/gals').respond(200, [{name: 'test gallery'}]);
      $scope.getAll();
      $httpBackend.flush();
      expect($scope.gals.length).toBe(1);
      expect($scope.gals[0].name).toBe('test gallery');
    });

    it('should create a new gallery', () => {
      $httpBackend.expectPOST('http://localhost:3000/api/gals', {name: 'the sent gallery'}).respond(200, {name: 'the response gallery'});
      $scope.newGallery = {name: 'the new gallery'};
      $scope.createGallery({name: 'the sent gallery'});
      $httpBackend.flush();
      expect($scope.gals.length).toBe(1);
      expect($scope.newGallery).toBe(null);
      expect($scope.gals[0].name).toBe('the response gallery');
    });

    it('should update a gallery', () => {
      var testGallery = {name: 'inside scope', editing: true, _id: 5};
      $scope.gals.push(testGallery);
      $httpBackend.expectPUT('http://localhost:3000/api/gals/5', testGallery).respond(200);
      $scope.updateGallery(testGallery);
      $httpBackend.flush();
      expect(testGallery.editing).toBe(false);
      expect($scope.gals[0].editing).toBe(false);
    });

    it('should close a gallery', () => {
      var testGallery = {name: 'broke gallery', _id: 1};
      $scope.gals.push(testGallery);
      expect($scope.gals.indexOf(testGallery)).not.toBe(-1);
      $httpBackend.expectDELETE('http://localhost:3000/api/gals/1').respond(200);
      $scope.deleteGallery(testGallery);
      $httpBackend.flush();
      expect($scope.gals.indexOf(testGallery)).toBe(-1);
    });
  });
});
