/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    //var CityListSchema = require("../review/review.schema.server")();
    var CityListSchema = mongoose.Schema({
        "City Name": String,
        "City ID": Number,
        "Domestic Flag": Number
    },{collection:"cityList"});
    return CityListSchema;
}