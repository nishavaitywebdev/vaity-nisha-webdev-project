/**
 * Created by nishavaity on 10/13/16.
 */
(function() {
    angular
        .module("MakeYourTourApp")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            .when("/user/:uid/home", {
                templateUrl: "/project/views/user/homepage.html",
                controller: "CityListController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid/hotelDetails/:hid",{
                templateUrl: "/project/views/hotel/hotel-details.view.client.html",
                controller: "HotelDetailsController",
                controllerAs: "model"
            })
            .when("/user/:uid/city/:cid", {
                templateUrl: "/project/views/hotel/hotel-list.view.client.html",
                controller: "HotelListController",
                controllerAs: "model"
            })
            .when("/user/:uid/hotel/:hid/new",{
                templateUrl: "/project/views/review/new-review.view.client.html",
                controller: "NewReviewController",
                controllerAs: "model"
            })
            .when("/user/:uid/hotel/:hid/review/:rid/edit",{
                templateUrl: "/project/views/review/edit-review.view.client.html",
                controller: "EditReviewController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "/project/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/loginAdmin", {
                templateUrl: "/project/views/admin/admin-login.view.client.html",
                controller: "AdminLoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "/project/views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/registerAdmin", {
                templateUrl: "/project/views/admin/admin-register.view.client.html",
                controller: "AdminRegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "/project/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/userAdmin", {
                templateUrl: "/project/views/admin/admin-home.view.client.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/user/:uid", {
                templateUrl: "/project/views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLogin: checkLogin
                }
            })
            .when("/userAdmin/:uid", {
                templateUrl: "/project/views/admin/admin-home.view.client.html",
                controller: "AdminProfileController",
                controllerAs: "model",
                resolve: {
                    checkAdmin: checkAdmin
                }
            })
            .otherwise({
                redirectTo : "/login"
            });
        
        function checkLogin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkLogin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }

                });
            return deferred._promise;
        }

        function checkAdmin($q, UserService, $location) {
            var deferred = $q.defer();
            UserService
                .checkAdmin()
                .success(function (user) {
                    if(user != '0')
                        deferred.resolve();
                    else {
                        deferred.reject();
                        $location.url("/login");
                    }

                });
            return deferred._promise;
        }
    }
})();