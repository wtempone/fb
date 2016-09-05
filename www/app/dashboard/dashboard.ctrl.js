(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$scope', '$window', '$state', '$cookieStore'];
    function dashboardCtrl($scope, $window, $state, $cookieStore) {
        // Set user details
        $scope.user = $cookieStore.get('userInfo');
        
        // Logout user
        $scope.logout = function () {
            $cookieStore.remove("userInfo");
            $state.go('welcome');
            $window.location.reload();
        };
    }
})();