/**
 * Created by nishavaity on 11/14/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    //var WebsiteSchema = require("../website/website.schema.server")();
    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        facebook: {
            id:    String,
            token: String,
            email: String
        },
        role: {type:String, default:"CUSTOMER", enum:['ADMIN', 'CUSTOMER']},
        reviews : [{type : mongoose.Schema.Types.ObjectId, ref:'ReviewModel'}],
        dateCreated: {type: Date, default: Date.now}
    },{collection:"user"});
    return UserSchema;
}