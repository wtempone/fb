(function() {
    'use strict';
    angular.module('memoryFriends', [
        'ngCookies', 'ionic', 'ngStorage'
    ])
    .config(configBlock)
    .run(runBlock);

    function configBlock ($stateProvider, $urlRouterProvider) {
        // setup states
        $stateProvider
                .state('welcome', {
                    url: "/welcome",
                    templateUrl: "app/welcome/welcome.html",
                    controller: 'welcomeCtrl'
                })
                .state('dashboard', {
                    url: "/dashboard",
                    templateUrl: "app/dashboard/dashboard.html",
                    controller: "dashboardCtrl"
                })
                .state('selectcard', {
                    url: "/selectcard",
                    templateUrl: "app/select.card/select.card.html",
                    controller: 'selectCardCtrl'
                });                
        // default route           
        $urlRouterProvider.otherwise("/welcome");

    }

    function runBlock ($rootScope, $cookieStore, $state) {
        // Check login session
        $rootScope.$on('$stateChangeStart', function (event, next, current) {
            var userInfo = $cookieStore.get('userInfo');
            if (!userInfo) {
                // user not logged in | redirect to login
                if (next.name !== "welcome") {
                    // not going to #welcome, we should redirect now
                    $state.go('welcome');
                }
            } else if (next.name === "welcome") {
                $state.go('dashboard');
            }
        });
    }

})();