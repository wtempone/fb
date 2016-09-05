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
        }

        $scope.selectCard = function () {
            $cookieStore.put('userInfo', $scope.user);            
            $state.go('selectcard');
        }

        $scope.modeHasChanged = function(index) {
            $scope.settings.mode = index;
        }
        
        $scope.numOfPlayerHasChanged = function(index) {
            $scope.settings.numOfPlayer = index;
        }
        
        $scope.numOfCardHasChanged = function(index) {
            $scope.settings.numOfCard = index;
        }
        
        $scope.settings = { 
            mode: 0,
            modes: ["Normal", "Outra"], 
            numOfPlayer: 0,
            numOfPlayers: [1,2,3,4],
            numOfCard: 0,
            numOfCards: [12, 16, 2 , 24, 30, 36,  42, 48]
        }

    }

})();