/**
 * Created by nishavaity on 12/6/16.
 */

module.exports = function(app,model){
    //var HotelModel = model.hotelModel;
    app.get('/api/getCityId/:name',findCityByName);



    function findCityByName(req,res) {
        console.log("Inside city by id")
        var city = req.params.name;
        model.cityModel
            .findCityByName(city)
            .then(
                function (user) {
                    console.log(user["City ID"]);
                    if(user)
                        res.send(user);
                    else
                        res.send('0');
                },
                function (error) {
                    res.sendStatus(400).send(error);
                });
        //res.send('0');
    }

}