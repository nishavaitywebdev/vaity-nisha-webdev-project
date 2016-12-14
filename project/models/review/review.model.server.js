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
        findAllReviews: findAllReviews,
        updateReview : updateReview,
        deleteReview : deleteReview,
        setModel: setModel //,
        //findWebsitesForUser: findWebsitesForUser
    };
    return api;


    function setModel(_model) {
        model = _model;
    }


    function findAllReviews(hotelId) {
        return ReviewModel.find({
            'hotelId' : hotelId
        });
    }
    function findReviewById(reviewId) {

        return ReviewModel.findById(reviewId)
            .then(function (review) {
                return review;
            })
    }

    function createReview(userId,hotelId,reviewNew) {
        //console.log(reviewNew);

        return ReviewModel.create(reviewNew)
            .then(function(reviewObject){
                return model.userModel
                    .findUserById(userId)
                    .then(function(userObject) {
                        return model.hotelModel
                            .findHotelByIbiboHotelId(hotelId)
                            .then(function (hotelObj) {
                                userObject.reviews.push(reviewObject);
                                userObject.save();
                                hotelObj.reviews.push(reviewObject);
                                hotelObj.save();
                                reviewObject._user = userObject._id;
                                reviewObject.username = userObject.username;
                                reviewObject._hotel = hotelObj._id;
                                reviewObject.save();
                                return reviewObject.save();
                            },
                                function(error){
                                    console.log("in model restaurant error");
                                    console.log(error);
                                });
                    },
                        function(error){
                            console.log("in model restaurant error");
                            console.log(error);
                        });
            },
                function(error){
                    console.log("in model restaurant error");
                    console.log(error);
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