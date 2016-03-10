module.exports = function(app) {
  app.directive('simgDirective', function() {
    return {
      restrict: 'A',
      replace: true,
      transclude: true,
      template: '<img src="{{galleryData.mainImg}}">',
      scope: {
        mainImg: '@',
      }
    };
  });
};

// angular.module('galsApp', []).config(function($sceProvider) {
//   $sceProvider.enabled(false);
// });
// 1 <div my-directive
// 2 my-url="http://google.com"
// 3 my-link-text="Click me to go to Google"></div>
// 1 angular.module('myApp', [])
// 2 .directive('myDirective', function() {
// 3 return {
// 4 restrict: 'A',
// 5 replace: true,
// 6 scope: {
// 7 myUrl: '@', // binding strategy
// 8 myLinkText: '@' // binding strategy
// 9 },
// 10 template: '<a href="{{myUrl}}">' +
// 11 '{{myLinkText}}</a>'
// 12 }
// 13 })
