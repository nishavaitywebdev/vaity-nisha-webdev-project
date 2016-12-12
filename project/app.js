/**
 * Created by nishavaity on 10/24/16.
 */

module.exports = function(app){
    var model = require("./models/model.server.js")();
    //console.log("Inside app js");

    require("./services/user.service.server.js")(app,model);
    require("./services/hotel.service.server.js")(app, model);
    require("./services/review.service.server.js")(app, model);
    // require("./services/widget.service.server.js")(app, model);

};