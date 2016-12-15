/**
 * Created by nishavaity on 12/11/16.
 */
(function () {
    angular
        .module("MakeYourTourApp")
        .factory("ReviewService", ReviewService)
    function ReviewService($http) {
        var api = {

            findReviewById: findReviewById,
            findReviewByHotelId: findReviewByHotelId,
            createReview: createReview,
            updateReview: updateReview,
            deleteReview: deleteReview

        };
        return api;


        function findReviewById(reviewId) {
            var url = '/api/review/' +  reviewId;
            return $http.get(url);
        }

        function findReviewByHotelId(hotelId) {
            var url = '/api/hotel/review/' +  hotelId;
            return $http.get(url);
        }

        function createReview(userId, hotelReview) {
            var url = '/api/user/'+ userId +'/review';
            return $http.post(url,hotelReview);
        }

        function updateReview(reviewId, reviewUpdated) {
            var url = '/api/editReview/'+reviewId;
            console.log(url);
            return $http.put(url,reviewUpdated);
        }
        function deleteReview(reviewId) {
            var url = '/api/delReview/'+reviewId;
            console.log(url);
            return $http.delete(url);
        }

    }
})();