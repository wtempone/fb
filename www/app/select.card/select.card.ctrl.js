(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('selectCardCtrl', selectCardCtrl);

    selectCardCtrl.$inject = ['$scope', '$window', '$state', '$cookieStore'];
    function selectCardCtrl($scope, $window, $state, $cookieStore) {
        // Set user details
        $scope.user = $cookieStore.get('userInfo');

        console.log("passa");
        console.log($scope.user);
    }

})();