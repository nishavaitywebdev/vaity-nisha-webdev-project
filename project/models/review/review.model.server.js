/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server")();
    var ReviewModel = mongoose.model("ReviewModel", ReviewSchema);

    var api = {
        createReview:createReview,
        findReviewById:findReviewById,
        updateReview : updateReview,
        deleteReview : deleteReview,
        setModel: setModel //,
        //findWebsitesForUser: findWebsitesForUser
    };
    return api;


    function setModel(_model) {
        model = _model;
    }


    function findReviewById(reviewId) {

        return ReviewModel.findById(reviewId)
            .then(function (review) {
                return review;
            })
    }

    function createReview(userId,hotelId,reviewNew) {
        //console.log(review);

        return ReviewModel.create(reviewNew)
            .then(function(reviewObject){
                model.userModel
                    .findUserById(userId)
                    .then(function(userObject) {
                        reviewObject._user = userObject._id;
                        reviewObject.save();
                        userObject.reviews.push(reviewObject);
                        userObject.save();
                        model.hotelModel
                            .findHotelByIbiboHotelId(hotelId)
                            .then(function (hotelObj) {
                                hotelObj.reviews.push(reviewObject);
                                return hotelObj.save();
                            })
                    });
            });
    }


    function updateReview(reviewId, review) {

        return ReviewModel.update(
            {
                _id: reviewId
            },
            {
                $set: review
            }
        );
    }

    function deleteReview(reviewId) {

        return ReviewModel.remove({
            _id: reviewId
        })

    }
    
    // function findWebsitesForUser(userId) {
    //     return UserModel.findById(userId)
    //         .then(function(user){
    //             return user.websites;
    //         });
    //         // .then(function(user){
    //         //     return user.websites;
    //         //});
    // }

};