(function() {
    'use strict';

    angular
        .module('memoryFriends')
        .directive('cardMap', cardMap);

    cardMap.$inject = ['$timeout', 'Storage', '$q'];
    function cardMap($timeout, Storage, $q) {

        var directive = {
            //bindToController: true,
            //controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                type: '=type',
                messageSelected: '=messageSelected',
                messageItens: '=messageItens',
                bgColor: '=bgColor',
                itemColor: '=itemColor',
                frameSize: '=frameSize',
                cols: '=cols',
                itens: '=itens',
                numItensToSelect: '=numItensToSelect',
                onSelect: "&"                
             
            },
            templateUrl: 'app/core/directives/card.map/card.map.html'  

        };
        return directive;
        
        function link(scope, element, attrs) {
            var defaultCols = 6;
            var selectedItens = [];

            scope.$watch('itens', function(newVal) {
                if(newVal) { 
                    if (scope.itens) {
                        if (scope.itens.length) {
              
                            scope.selectedItens = selectedItens;
                            scope.itemSize = scope.frameSize / scope.cols;
                            if (scope.itens.length) {
                                var sqrtLen =  Math.sqrt(scope.itens.length);
                                /*if (sqrtLen != Math.abs(sqrtLen)) {
                                    sqrtLen = Math.abs(sqrtLen) + 1;
                                }*/
                                scope.scrollArea = (sqrtLen * (scope.itemSize + 10));
                            }        
                            if (scope.scrollArea < scope.frameSize) {
                                scope.scrollArea = scope.frameSize;
                            }        


                        }        
                    }                     
                }
            }, true);

            scope.select = function(item) {
                if (selectedItens.length < (scope.numItensToSelect)) {
                    item.selected = true;
                    selectedItens.push(item);
                }
            }

            scope.setSelect = function() {
                scope.onSelect({
                    selectedItens: scope.selectedItens
                })      
            }      

            scope.deselect = function(item) {
                item.selected = false;
                $timeout(function() {
                    var exclude = null, ind=selectedItens.indexOf(item);
                    selectedItens.splice(ind, 1);     
                },400);                            
            }

        }
    }
})();