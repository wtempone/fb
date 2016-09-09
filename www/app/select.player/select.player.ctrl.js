(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('selectPlayerCtrl', selectPlayerCtrl);

    selectPlayerCtrl.$inject = ['$scope', '$window', '$state', '$cookieStore', 'Storage'];
    function selectPlayerCtrl($scope, $window, $state, $cookieStore, Storage) {

        Storage.getUser().then(function(user){
            $scope.user = user;            
        });
        Storage.getGame().then(function(game){
            $scope.game = game;            
        });
        
        $scope.dashboard = function() {
            $state.go("dashboard");
        }

        $scope.onSelect = function(selectedPlayers) {
            console.log(selectedPlayers);

            var players =[], ind=0;
            angular.forEach(selectedPlayers, function(player) {
                players.push({
                    id: ind,
                    score: 0,
                    player: player                 
                })
                ind =+1;
            });
            
            $scope.game.players = players;
            $scope.game.playerTurn = 0;
            Storage.setGame($scope.game);
            $state.go("selectcard");

        }
    }
})();