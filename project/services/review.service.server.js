/**
 * Created by nishavaity on 12/11/16.
 */
module.exports = function(app, model){

    var ReviewModel = model.reviewModel;

    app.get("/api/hotel/review/:hid", findReviewByHotelId);
    app.get("/api/review/:rid", findReviewById);
    app.post("/api/user/:uid/review", createReview);
    app.put("/api/review/:rid", updateReview);
    app.delete("/api/review/:rid", deleteReview);


    function findReviewByHotelId(req, res) {
        var hotelId = req.params.hid;
        return HotelModel
            .findHotelByIbiboHotelId(hotelId)
            .then(function (hotelObj) {
                return ReviewModel
                    .findReviewByHotelId(hotelObj._id)
                    .then(function (reviews) {
                        res.json(reviews);
                    });
            },
                function(error){
                return HotelModel
                    .createHotel(hotelId)
                    .then(function (hotelObj) {
                        res.statusCode(200);
                    })
                });
    }

    function createReview(req,res){
        //console.log("Hello review");
        var userId = req.params.uid;
        var hotelReview = req.body;
        var hotelId = hotelReview._hotel;
        var reviewNew = {
            comment:hotelReview.comment
        }
        //var id = (Math.floor(100000 + Math.random() * 900000)).toString();
        //id = id.substring(-2);

        //website._id = id;
        //hotelReview._user = userId;
        // websites.push(website);
        // res.send(userId);
        return ReviewModel
            .createReview(userId,hotelId,reviewNew)
            .then(function (review) {
                console.log(review);
                return model.hotelModel
                    .findHotelByIbiboHotelId(hotelReview._hotel)
                    .then(function (hotelObj) {
                        hotelObj.reviews.push(review._id);
                        hotelObj.save();
                    })
                    //console.log(website);
                    //res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findReviewById(req, res){
        //console.log("in website by id")
        var reviewId = req.params.rid;
        ReviewModel
            .findReviewById(reviewId)
            .then(function (review) {
                    console.log(review);
                    res.send(review);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function updateReview(req, res){
        var review = req.body;
        var reviewId = req.params.rid;
        ReviewModel
            .updateReview(reviewId, review)
            .then(function (data) {
                    //console.log(website);
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

    function deleteReview(req, res){
        var reviewId = req.params.rid;
        ReviewModel
            .deleteReview(reviewId)
            .then(function (data) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
    }

    function findAllWebsitesForUser(req,res) {
        var userId = req.params.userId;
        //var websites = []
        WebsiteModel
            .findWebsitesForUser(userId)
            .then(function (websites) {
                    res.json(websites);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                })
        // var userId = req.params.userId;
        // //console.log(userId);
        // var websitesOfUser=[];
        // for( var w in websites){
        //     if(websites[w].developerId === userId.toString()){
        //         websitesOfUser.push(websites[w]);
        //     }
        // };
        // res.send(websitesOfUser);
    }

}