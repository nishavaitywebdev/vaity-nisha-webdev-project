/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser:createUser,
        findUserById:findUserById,
        findUserByUsername : findUserByUsername,
        findUserByCredentials:findUserByCredentials,
        updateUser : updateUser,
        deleteUser : deleteUser,
        findUserByFacebookId: findUserByFacebookId,
        addFollower: addFollower,
        setModel: setModel //,
        //findWebsitesForUser: findWebsitesForUser
    };
    return api;

    function addFollower(followerId, followeeId) {
        return model.userModel
            .findUserById(followerId)
            .then(function (followerUserObj) {
                followerUserObj.following.push(followeeId);
                followerUserObj.save();
                return model.userModel
                    .findUserById(followeeId)
                    .then(function (followeeUserObj) {
                        followeeUserObj.followers.push(followerId);
                        followeeUserObj.followerNames.push(followerUserObj.username);
                        followerUserObj.followingNames.push(followeeUserObj.username);
                        followerUserObj.save();
                        return followeeUserObj.save();
                    })
            })
    }

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function setModel(_model) {
        model = _model;
    }


    function findUserById(userId) {

        return UserModel.findById(userId)
            .then(function (user) {
                return user;
            })
    }

    function createUser(user) {
        console.log("In project");
        return UserModel.create(user);
    }

    function findUserByCredentials(username, password) {

        return UserModel.findOne({
            username:username,
            password:password
        });
    }

    function findUserByUsername(username) {

        return UserModel.findOne({
            username:username
        });
    }

    function updateUser(userId, user) {

        return UserModel.update(
            {
                _id: userId
            },
            {
                $set:user
            }
        );
    }

    function deleteUser(userId) {

        return UserModel.remove({
            _id: userId
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