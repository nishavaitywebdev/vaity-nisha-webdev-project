/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var ReviewSchema = require("../review/review.schema.server")();
    var HotelSchema = mongoose.Schema({
        hotelId: String,
        hotelName: String,
        hotelCity: String,
        reviews:[{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}],
        dateCreated: {type: Date, default: Date.now}
    },{collection:"hotel"});
    return HotelSchema;
}