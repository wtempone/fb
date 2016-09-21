(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('gameSessionCtrl', gameSessionCtrl);

    gameSessionCtrl.$inject = ['$scope', '$window', '$state', '$cookieStore', 'Storage', '$timeout', '$ionicModal', '$interval'];

    function gameSessionCtrl($scope, $window, $state, $cookieStore, Storage, $timeout, $ionicModal, $interval) {
        var turnTime = 10; // seconds
        $scope.timeRefresh = 10 * turnTime;
        //var userTime = turnTime * (1000/$scope.timeRefresh);

        $scope.$on('$destroy', function() {
          $scope.stopGame();
        });

        // timer

        $scope.progressval = [0,0,0,0];
        $scope.stopinterval = null;
        
        $scope.updateProgressbar = function()
        {
            startprogress();
            
        }
        
        function startprogress()
        {
            $scope.progressval[$scope.game.playerTurn]  = 100;
            
            if ($scope.stopinterval)
            {
                $interval.cancel($scope.stopinterval);
            }
            
            $scope.stopinterval = $interval(function() {
                $scope.progressval[$scope.game.playerTurn] = $scope.progressval[$scope.game.playerTurn] - 1;
                if( $scope.progressval[$scope.game.playerTurn] < 0 ) {
                    $scope.changeTurn();
                }
            }, $scope.timeRefresh);
        }


        // end timer

        $scope.changeTurn = function() {

            if ( $scope.game.players[$scope.game.playerTurn].select) {
                if ( $scope.game.players[$scope.game.playerTurn].select.length > 0) {
                    $scope.game.players[$scope.game.playerTurn].select[0].selected = false;
                    $scope.game.players[$scope.game.playerTurn].select = [];  
                }
            }
          
            $scope.game.players[$scope.game.playerTurn].selected = false;
            $scope.progressval[$scope.game.playerTurn] = 0;

            
            if ($scope.game.playerTurn == ($scope.game.players.length - 1)) {
                $scope.game.playerTurn = 0;
            } else {
                $scope.game.playerTurn +=1;
            }

            $scope.game.players[$scope.game.playerTurn].selected = true;
            $scope.progressval[$scope.game.playerTurn] = 100;
        }

        $scope.restart = function() {
            Storage.getGame().then(function(game){
                $scope.game = game;      
                $scope.frameSize = window.innerWidth * 0.88;
                var sqrtLen =  Math.sqrt($scope.game.cards.length);
                $scope.cols = Math.ceil(sqrtLen);
                $scope.cardsOpened = 0;
                $scope.game.playerTurn = ($scope.game.players.length - 1);
                $scope.changeTurn();

                if ($scope.game.cards.length) {
                    $scope.game.cards = shuffle($scope.game.cards);
                    $scope.itemSize = ($scope.frameSize -  ($scope.cols * 11)) / $scope.cols;
                    if ($scope.game.cards.length) {
                        $scope.scrollArea = (sqrtLen * ($scope.itemSize + 11));
                    }        
                    if ($scope.scrollArea < $scope.frameSize) {
                        $scope.scrollArea = $scope.frameSize;
                    }        
                }                      

                if ($scope.modal) {
                    $scope.closeModal()
                }
                //$scope.showModal();
                startprogress();
            });
        }
        $scope.dashboard = function() {
            if ($scope.modal) {
                $scope.closeModal()
            }
            $state.go("dashboard");
        }

        $scope.select = function(item) {
            if (item.selected || item.opened) {return;}
            if (!$scope.game.players[$scope.game.playerTurn].select) {
                $scope.game.players[$scope.game.playerTurn].select = [];
            }
            if ($scope.game.players[$scope.game.playerTurn].select.length > 0) {
                if (angular.equals($scope.game.players[$scope.game.playerTurn].select[0].card,item.card)) {
                    $scope.progressval[$scope.game.playerTurn]  = 100;
                    item.selected = true;
                    item.opened = true;
                    $scope.game.players[$scope.game.playerTurn].select[0].opened = true;              
                    $scope.game.players[$scope.game.playerTurn].score += 1;
                    $scope.game.players[$scope.game.playerTurn].select = [];
                    $scope.cardsOpened += 2;
                    if ($scope.game.cards.length == $scope.cardsOpened) {
                        $scope.gameOver();
                    }
                } else {
                    item.selected = true;
                    $timeout(function() {
                        $scope.game.players[$scope.game.playerTurn].select[0].selected = false;
                        $scope.game.players[$scope.game.playerTurn].select = [];
                        $scope.changeTurn();   
                        item.selected = false;                        
                    },400);  
                }
            } else {
                item.selected = true;
                $scope.game.players[$scope.game.playerTurn].select.push(item)                                                    
            }

        }

        $scope.gameOver = function() {
            var scores = [], ind = 0;
            $scope.winnerCount = 0;
            $scope.winnerIndex = 0;
            angular.forEach($scope.game.players, function(player) {
                scores.push(player.score);
            });
            var maxScore = getMaxOfArray(scores);
            angular.forEach($scope.game.players, function(player) {
                if (player.score == maxScore) {
                    player.winner = true;
                    $scope.winnerIndex = ind;
                    $scope.winnerCount +=1;
                } else {
                    player.winner = false;
                }
                ind +=1;
            });       
            $scope.showModal();
     
        }

        $scope.createModal = function () {

            $ionicModal.fromTemplateUrl("app/game.session/gameover.html", {
                scope: $scope,
                animation: "slide-in-up"               
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        }

        $scope.closeModal = function() {
            $scope.modal.hide();            
        }

        $scope.showModal = function() {
            if ($scope.modal) {
                $scope.modal.show();
            } else {
                $scope.createModal();
            }            
        }

        function getMaxOfArray(numArray) {
            return Math.max.apply(null, numArray);
        }

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        $scope.restart();

    }
})();