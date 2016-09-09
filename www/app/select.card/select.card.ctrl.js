(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('selectCardCtrl', selectCardCtrl);

    selectCardCtrl.$inject = ['$scope', '$window', '$state', '$cookieStore', 'Storage'];
    function selectCardCtrl($scope, $window, $state, $cookieStore, Storage) {

        Storage.getUser().then(function(user){
            $scope.user = user;            
        });
        Storage.getGame().then(function(game){
            $scope.game = game;            
        });
        
        $scope.selectPlayer = function() {
            $state.go("selectplayer");
        }

        $scope.onSelect = function(selectedCards) {
            console.log(selectedCards);
            var cards =[], ind=0;
            angular.forEach(selectedCards, function(card) {
                cards.push({
                    id: ind,
                    card: card                 
                })
                ind =+1;
                cards.push({
                    id: ind,
                    card: card                 
                })
                ind =+1;
            });
            
            $scope.game.cards = cards;
            Storage.setGame($scope.game);
            $state.go("gamesession");
        }
    }

})();