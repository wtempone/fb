(function() {
     'use strict';
 
     angular
         .module('memoryFriends')
         .directive('flipContainer', flipContainer);
 
     flipContainer.$inject = ['$scope','$elem', '$attrs'];
     function flipContainer($scope,$elem , $attrs){
        return {
            restrict: 'C',
            link: function($scope, $elem, $attrs) {
                $scope.flip = function() {
                    $elem.toggleClass('flip');
                }
            }
        }
    }; 
 })();
