(function() {
'use strict';

    angular
        .module('memoryFriends')
        .controller('welcomeCtrl', welcomeCtrl);

    welcomeCtrl.$inject = ['$scope', '$state', '$cookieStore'];

    function welcomeCtrl($scope, $state, $cookieStore) {
        /**
         * SOCIAL LOGIN
         * Facebook and Google
         */
        // FB Login
        $scope.fbLogin = function () {
            FB.login(function (response) {
                if (response.authResponse) {
                    getUserInfo();
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            }, {scope: 'email,user_photos,user_videos, user_friends'});

            function getUserInfo() {
                // get basic info
                FB.api('/me', function (response) {
                    console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                    // get profile picture
                    FB.api('/me/picture?type=normal', function (picResponse) {
                        console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                        FB.api("/" + response.id + "/invitable_friends", {limit:1000}, function (friendsResponse) {
                            console.log('Facebook Login RESPONSE: ');
                            console.log(friendsResponse);
                            response.imageUrl = picResponse.data.url;
                            // store data to DB - Call to API
                            // Todo
                            // After posting user data to server successfully store user data locally
                            var user = {};
                            user.name = response.name;
                            user.email = response.email;
                            user.friends = friendsResponse.data;
                            user.profilePic = picResponse.data.url;

                            $cookieStore.put('userInfo', user);
                            
                            $state.go('dashboard');

                        });
                    });
                });
            }

        };
        // END FB Login

    }
})();