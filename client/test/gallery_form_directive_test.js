var angular = require('angular');
var template = require('../app/templates/gals/directives/gallery_form_directive.html');

describe('gallery form directive', () => {
  var $compile;
  var $rootScope;
  var $httpBackend;

  beforeEach(angular.mock.module('galsApp'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
  }));

  it('should load the directive', () => {
    $httpBackend.when('GET', '/templates/gals/directives/gallery_form_directive.html').respond(200, template);

    var element = $compile('<gallery-form data-gallery="{}" data-button-text="test button"></gallery-form>')($rootScope);
    $httpBackend.flush();
    $rootScope.$digest();
    expect(element.html()).toContain('test button');
  });

  it('should be able to call a passed save function', () => {
    var scope = $rootScope.$new();
    $httpBackend.when('GET', '/templates/gals/directives/gallery_form_directive.html').respond(200, template);
    var called = false;
    scope.gallery = {name: 'inside scope'};

    scope.testSave = function(input) {
      expect(input.name).toBe('from directive');
      scope.gallery = input;
      called = true;
    };

    var element = $compile('<gallery-form data-gallery="{name: \'inside directive\'}" data-save=testSave></gallery-form>')(scope);
    $httpBackend.flush();
    $rootScope.$digest();

    element.isolateScope().save(scope)({name: 'from directive'});
    expect(called).toBe(true);
    expect(scope.gallery.name).toBe('from directive');
  });
});
