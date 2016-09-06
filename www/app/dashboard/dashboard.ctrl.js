(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('dashboardCtrl', dashboardCtrl);

    dashboardCtrl.$inject = ['$scope', '$window', '$state', '$cookieStore', 'Storage'];
    function dashboardCtrl($scope, $window, $state, $cookieStore, Storage) {

        $scope.settings = { 
            mode: 0,
            modes: ["Normal", "Outra"], 
            numOfPlayer: 0,
            numOfPlayers: [1,2,3,4],
            numOfCard: 0,
            numOfCards: [12, 16, 20 , 24, 30, 36,  42, 48]
        }
        //$scope.user = $cookieStore.get('userInfo');
        Storage.getUser().then(function(user){
            $scope.user = user;            
        });

        $scope.selectCard = function () {
            var game ={
                settings: {
                    mode: $scope.settings.mode,
                    numOfPlayers: $scope.settings.numOfPlayer,
                    numOfCards: $scope.settings.numOfCards[$scope.settings.numOfCard]
                }
            }

            Storage.getGame(game);
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

        $scope.logout = function(){
            UiUtils.confirm("Do you like Log Out?", "Log Out").then(function(res) { 
                if(res) {
                    Storage.removeUser().then();
                    $ionicHistory.clearHistory();
                    $ionicHistory.clearCache();
                    $state.go('welcome');
                    $window.location.reload();
                }
            });
        }        

    }

})();