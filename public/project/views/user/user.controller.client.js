/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("MakeYourTourApp")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController)
        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;


            function login(username,password){
                if(!username){
                    vm.alert = "Username required";
                }
                else if(!password){
                    vm.alert = "Password required";
                }
                else if (!username && !password){
                    vm.alert = "Username and Password required";
                }
                else{
                    var promise = UserService.login(username, password);

                    //var promise = UserService.findUserByCredentials(username,password);
                    promise
                        .success(function (user) {
                            //console.log("Inside success of login")

                            if (user === '0') {
                                vm.alert = "No such user";
                            }
                            else {
                                $location.url("user/" + user._id);
                            }
                        })
                        .error(function () {

                        });
                }

            }
        }
    function RegisterController($scope,$rootScope,$location,UserService) {
        var vm = this;

        vm.createUser = createUser;
        function createUser(user) {
            console.log($scope.register);
            if(!$scope.register.$invalid && user.password == user.veryPassword){
                UserService
                    .register(user)
                    .then(
                        function (response) {
                            var user = response.data;
                            $rootScope.currentUser = user;
                            $location.url("/user/" + user._id);
                        });
            }
            else{
                vm.veryPasswordAlert = "Passwords do not match";
            }
            }
        }


        function ProfileController($routeParams, UserService,$location) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            console.log(vm.userId);
            function init() {
                UserService
                    //.findUserById(vm.userId)
                    .findCurrentUser()
                    .success(function(user){
                        if(user != null){
                            vm.user = user;
                            vm.followerSize = vm.user.followerNames.length;
                            vm.followingSize = vm.user.followingNames.length;
                            console.log(vm.followerSize);
                        }
                    })
                    .error(function(){

                    });
            }
            init();
            vm.updateUser = updateUser;
            vm.deleteUser = deleteUser;
            vm.logout = logout;

            
            function logout() {
                UserService.logout()
                    .success(function () {
                        $location.url("/login");
                    })
            }
            function updateUser(userId,user){
                UserService.updateUser(userId,user)
                    .success(function(user){
                        //console.log(user);
                        if(user != '0'){
                            vm.user = user;

                        }

                    })
                    .error(function(){

                    });

            }

            function deleteUser(userId){

                UserService.deleteUser(userId)
                    .success(function(response){
                        if(response == 'OK'){
                            $location.url("/login");
                        }
                    })
                    .error(function(){

                    });


            }
        }
})();