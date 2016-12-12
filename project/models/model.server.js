/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/makeYouTour"); ///check
    //console.log("Inside model server js");
    var userModel = require("./user/user.model.server")();
    var reviewModel = require("./review/review.model.server")();
    var hotelModel = require("./hotel/hotel.model.server")();
    // var widgetModel = require("./widget/widget.model.server")();
    var model = {
        userModel:userModel,
        reviewModel:reviewModel,
        hotelModel:hotelModel
        // widgetModel:widgetModel
    };
    hotelModel.setModel(model);
    reviewModel.setModel(model);
    userModel.setModel(model);
    // widgetModel.setModel(model);
    return model;

};