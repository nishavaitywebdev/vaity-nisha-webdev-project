/**
 * Created by nishavaity on 12/6/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var CityListSchema = require("./city.schema.server")();
    var CityModel = mongoose.model("CityModel", CityListSchema);

    var api = {
        findCityByName: findCityByName,
        setModel: setModel //,
        //findWebsitesForUser: findWebsitesForUser
    };
    return api;


    function setModel(_model) {
        model = _model;
    }


    function findCityByName(cityName) {

        return CityModel.findOne({
            "City name":cityName
        });
    }

};