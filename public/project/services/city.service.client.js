/**
 * Created by nishavaity on 12/6/16.
 */
(function () {
    angular
        .module("MakeYourTourApp")
        .factory("CityService", CityService)
    function CityService($http) {
        var api = {

            findCityByName: findCityByName

        };
        return api;


    function findCityByName(city) {
        var url = "/api/getCityId/"+city;
        //console.log(url);
        return $http.get(url);
    }

    }
})();