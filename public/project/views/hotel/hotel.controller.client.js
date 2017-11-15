/**
 * Created by nishavaity on 12/6/16.
 */
(function() {
    var app = angular
        .module("MakeYourTourApp")
        .controller("HotelListController", HotelListController)
        .controller("HotelDetailsController", HotelDetailsController)
        .controller("CityListController", CityListController);

    //console.log("Hello outside hotel list controller");

    //$routeParams, HotelService

    function CityListController($routeParams,UserService, HotelService, ReviewService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        function init() {
            vm.userId = $routeParams.uid;
            var promise = UserService.findUserById(vm.userId);
            promise
                .success(function (user) {
                    vm.user = user;
                    console.log(vm.user);
                })

        }init()
    }
    function HotelDetailsController($location, $routeParams, HotelService, ReviewService, UserService) {
        var vm = this;
        vm.hotelId = $routeParams.hid;
        vm.userId = $routeParams.uid;
        vm.cityId = $routeParams.cid;

        vm.addFollower = addFollower;


        function addFollower(followerId, followeeId) {
            var promise = UserService.addFollower(followerId, followeeId);
            promise
                .success(function (user) {
                    console.log(user);
                    //$location.url("/user/"+vm.userId+"/hotelDetails/"+vm.hotelId);
                })
                .error(function (err) {
                    console.log(err);
                })
        }

        //console.log(vm.hotelId);
        function init() {
            var promise = HotelService.findHotelById(vm.hotelId);
            promise
                .success(function (hotelDetails) {
                    vm.hotelDetails = hotelDetails.data[vm.hotelId].hotel_data_node;
                    HotelService.createHotel(vm.hotelId);

                    var prom = ReviewService.findReviewByHotelId(vm.hotelId);
                    prom
                        .success(function (UserReviews) {
                            vm.Reviews = UserReviews;
                            console.log(UserReviews);
                        })
                        .error(function (err) {
                            console.log(err);
                        });
                })
                .error(function (err) {
                    console.log(err);
                });
            var promise1 = UserService.findUserById(vm.userId);
            promise1
                .success(function (user) {
                    vm.user = user;
                })


            // var promise1 = HotelService.createHotel(vm.hotelId);
            // promise1
            //     .success(function (hotel) {
            //         console.log("New hotel created");
            //     })
            //     .error(function (err) {
            //         console.log(err);
            //     });
        }
        init()

        function addReview(user, hotelDetails) {

        }
        // function initMap() {
        //     var uluru = {lat: -25.363, lng: 131.044};
        //     var map = new google.maps.Map(document.getElementById('map'), {
        //         zoom: 4,
        //         center: uluru
        //     });
        //     var marker = new google.maps.Marker({
        //         position: uluru,
        //         map: map
        //     });
        // }

    }

    function HotelListController($routeParams,UserService, HotelService, CityService) {
        //console.log("Hello in hotel list controller");
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.getCityId = getCityId;

        function getCityId(city) {
            console.log(city);
            var promise = CityService.findCityByName(city);
            promise
                .success(function (id) {
                    console.log(id);

                })
        }

        function init() {
            //console.log("Hi");
            vm.cityId = $routeParams.cid;
            vm.userId = $routeParams.uid;

            var promise = HotelService.findHotelByCityId(vm.cityId);
            promise
                .success(function (hotels) {
                    vm.hotels_list = hotels.data;
                })
                .error(function () {

                });
            var promise1 = UserService.findUserById(vm.userId);
            promise1
                .success(function (user) {
                    vm.user = user;
                })
            // vm.hotels_list = hotel_list;
            //console.log(vm.hotels_list);
        }

        init();

        vm.cityName_Id = [
            
        ];

//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter
//
//         app.filter('startFrom', function() {
//             return function (input, start) {
//                 start = +start; //parse to int
//                 return input.slice(start);
//             }
//         });


    }

})();