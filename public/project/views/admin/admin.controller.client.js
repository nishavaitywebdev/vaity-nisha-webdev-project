/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("MakeYourTourApp")
        .controller("AdminLoginController", LoginController)
        .controller("AdminRegisterController", RegisterController)
        .controller("AdminProfileController", ProfileController)
        function AdminLoginController($location, UserService) {
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

                            if (user === '0' || user.role != 'ADMIN') {
                                vm.alert = "No such Admin";
                            }
                            else {
                                $location.url("userAdmin/" + user._id);
                            }
                        })
                        .error(function () {

                        });
                }

            }
        }
        function AdminRegisterController($rootScope,$location,UserService) {
            var vm = this;
            //console.log("In project user controller");

            vm.createUser = createUser;
            function createUser(user) {
                user.role = 'ADMIN';

                if(user == undefined)
                    vm.alert = "Username and Password required. Re-enter password";
                else {
                    if (!user.username) {
                        vm.alert = "Username required";
                    }
                    else if (!user.password) {
                        vm.alert = "Password required";
                    }
                    else if (!user.veryPassword) {
                        vm.alert = "Please re enter password required";
                    }
                    else if (user.veryPassword != user.password) {
                        vm.alert = "Passwords do not match";
                    }
                    else if (!user.username && !user.password && !user.veryPassword) {
                        vm.alert = "Username and Password required. Re-enter password";
                    }
                    else {

                        UserService
                            .register(user)
                            .then(
                                function (response) {
                                    var user = response.data;
                                    $rootScope.currentUser = user;
                                    $location.url("/userAdmin/" + user._id);
                                });

                    }

                }
            }
        }


        function AdminProfileController($routeParams, UserService,$location) {
            var vm = this;
            vm.userId = $routeParams["uid"];

            //console.log(vm.userId);
            function init() {
                UserService
                    //.findUserById(vm.userId)
                    .findCurrentUser()
                    .success(function(user){
                        if(user != null){
                            vm.user = user;
                            //console.log(vm.user);
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
                        $location.url("/loginAdmin");
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
                            $location.url("/loginAdmin");
                        }
                    })
                    .error(function(){

                    });


            }
        }
})();