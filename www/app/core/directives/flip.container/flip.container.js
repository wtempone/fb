(function() {
    'use strict';

    angular
        .module('memoryFriends')
        .directive('flipper', flipper);

    function flipper() {
        return {
            restrict: "E",
            template: "<div class='flipper' ng-transclude ng-class='{ flipped: flipped }'></div>",
            transclude: true,
            scope: {
                flipped: "="
            }
    	};
    }
})();

(function() {
    'use strict';

    angular
        .module('memoryFriends')
        .directive('front', front);

    function front() {
        return {
            restrict: "E",
            template: "<div class='front tile' ng-transclude></div>",
            transclude: true
        };
    }
})();

(function() {
    'use strict';

    angular
        .module('memoryFriends')
        .directive('back', back);

    function back() {
        return {
            restrict: "E",
            template: "<div class='back tile' ng-transclude></div>",
            transclude: true
        }
    }
})();
