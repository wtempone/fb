(function() {
    'use strict';

    angular
        .module('memoryFriends')
        .directive('cardMap', cardMap);

    cardMap.$inject = ['$timeout'];
    function cardMap($timeout) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            //bindToController: true,
            //controllerAs: 'vm',
            link: link,
            restrict: 'E',
            scope: {
                bgColor: '=bgColor',
                itemColor: '=itemColor',
                frameSize: '=frameSize',
                cols: '=cols',
                itens: '=itens',
                numItensToSelect: '=numItensToSelect'                
            },
            templateUrl: 'app/core/directives/card.map/card.map.html'  

        };
        return directive;
        
        function link(scope, element, attrs) {
            var defaultCols = 6;
            var selectedItens = [];
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

            scope.select = function(item) {
                if (selectedItens.length < scope.numItensToSelect) {
                    item.selected = true;
                    selectedItens.push(item);
                }
            }

            scope.deselect = function(item) {
                var exclude = null, ind=selectedItens.indexOf(item);
                 selectedItens.splice(ind, 1);     
                item.selected = false;            
                selectedItens.slice(exclude,1);
            }

        }
    }
})();
/*(function() {
    'use strict';
 
    angular
    .module('memoryFriends')
        .directive('cardMap', cardMap);

    cardMap.$inject = ['$scope','$elem', '$attrs'];

    function cardMap($scope,$elem , $attrs){
        return {
            restrict: 'E',
            controller: cardMapcontroller,            
            scope: {
                bgColor: '=bg-color',
                itemColor: '=item-color',
                frameSize: '=frame-size',
                cols: '=cols',
                itens: '=itens'
            },
            templateUrl: 'app/core/directives/card.map/card.map.html'  
        }

        function cardMapcontroller(scope, element, attrs) {
            var defaultCols = 6;
            scope.itemSize = frameSize / cols;
            if (itens.length) { 
                scope.scrollArea = itens.length * scope.itemSize / 4;
            } else {
                scope.scrollArea = defaultCols  * scope.itemSize / 4;
            }
        }        
    }; 
 })();

*/