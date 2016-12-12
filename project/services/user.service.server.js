/**
 * Created by nishavaity on 10/24/16.
 */

module.exports = function(app,model){

    var passport      = require('passport');
    var LocalStrategy      = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var cookieParser  = require('cookie-parser');
    var session       = require('express-session');

    // var users = [
    //     {_id: "123", email:"alice@gmail.com", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", email:"bob@gmail.com", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", email:"charly@gmail.com", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", email:"jannunzi@gmail.com", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];


    app.use(session({
        secret: 'this is the secret',
        resave: true,
        saveUninitialized: true
    }));

    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(passport.session());
    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    var facebookConfig = {
        clientID    :   "302238760175775",
        clientSecret : "666d0c6ad902fc6d36c2c1cf2f882fbd",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    }

    passport.use(new LocalStrategy(localStrategy));
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //console.log("Inside user service server js");
    app.post('/api/login', passport.authenticate('local'),login);
    app.post('/api/checkLogin', checkLogin);
    app.post('/api/checkAdmin', checkAdmin);
    app.post('/api/logout', logout);
    app.get('/api/user', findUser);
    app.post ('/api/register', register);
    //app.get('/api/loggedin', loggedin);
    //app.get('/api/user?username=username&password=password',findUserByCredentials);
    app.get('/api/user/:userId',findUserById);
    app.post('/api/user',createUser);
    app.put('/api/user/:userId',loggedInAndSelf, updateUser);
    app.delete('/api/user/:userId', loggedInAndSelf, deleteUser);


    function register(req, res) {
        //console.log("In project user service")
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model.userModel
            .createUser(user)
            .then(
            function(user){
                //console.log(user);
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }
        );
    }
    
    function logout(req, res) {
        req.logout();
        res.send(200);
    }


    function checkLogin(req, res) {
        res.send(req.isAuthenticated() ? req.user :  '0');
    }

    function checkAdmin(req, res) {

        var loggedIn = req.isAuthenticated();
        var isAdmin = req.user.role == 'ADMIN';

        if(loggedIn&& isAdmin)
            res.json(req.user);
        else
            res.send('0');
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        //console.log(profile);
        //done(null, profile);
        model.userModel
            .findUserByFacebookId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        // var email = profile.emails[0].value;
                        // var emailParts = email.split("@");
                        var newFacebookUser = {
                            username:  profile.displayName.replace(/\s+/g, ''),
                            firstName: profile.displayName.split(" ")[0],
                            lastName:  profile.displayName.split(" ")[1],
                            email:     "",
                            facebook: {
                                id:    profile.id,
                                email:     "",
                                token: token
                            }
                        };
                        return model.userModel.createUser(newFacebookUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    function localStrategy(username, password, done) {
       // console.log(username);
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    //console.log(user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        //console.log("In if ")
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
        //res.send('0');
    }
    
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    //  console.log(user);
                    done(null, user)
                    // if(user)
                    //     res.send(user);
                    // else
                    //     res.send('0');
                },
                function (error) {
                    done(error, null)
                    //res.sendStatus(400).send(error);
                });
    }
        function login(req, res) {
            var user  = req.user;
            res.json(user);
        }
        function createUser(req, res) {
            var user = req.body;
            // user._id = (new Date().getTime()).toString();
            // user.push(user);
            //console.log(user);
            model.userModel.createUser(user)
                .then(
                    function (newuser) {
                        res.send(newuser);
                    },
                    function (error) {
                        res.sendStatus(400).send("Error");
                    }
                );


        }

        function findUser(req, res){
            //console.log("Inside find user")
            var params = req.params;
            var query = req.query;
            //console.log(query);
            if(query.password && query.username){
                //console.log("In if of creds");
                findUserByCredentials(req, res);
            } else if (query.username){
                //console.log("In if of username");
                findUserByUsername(req, res);
            } else{
                res.json(req.user);
            }
            // console.log(params);
            // console.log(query);
            //res.send(user);
        }


        function findUserByUsername(req,res) {

            var user,username;
            username = req.query.username;
            for( var u in users){
                if(users[u].username === username){
                    user = users[u];
                    res.send(user);
                    return;
                }
            }
            res.send('0');
        }
        function findUserByCredentials(req,res) {

            var user, username, password;
            username = req.query.username;
            password = req.query.password;

            model
                .userModel
                .findUserByCredentials(username, password)
                .then(
                    function (user) {
                        if(user)
                            res.json(user);
                        else
                            res.send('0');
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
            //res.send('0');
        }

    function findUserById(req,res) {
        //console.log("Inside ind user by id")
        var userId = req.params.userId;
        model.userModel
            .findUserById(userId)
            .then(
                function (user) {
                    console.log(user);
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


    function loggedInAndSelf(req, res, next) {
        var loggedIn = req.isAuthenticated();
        var userId = req.params.userId;

        var self = userId == req.user._id;

        if(self && loggedIn){
            next();
        }else{
            res.send("You are not the same person.");
        }
    }

    function updateUser(req, res){
        var user = req.body;
        var uid = req.params.userId;
        //console.log(uid);
        model
            .userModel
            .updateUser(uid, user)
            .then(function (status) {
                res.send(200);
            },
            function (error) {
                res.sendStatus(400).send(error);
            })
        // for(var u in user){
        //     if(user[u]._id == uid.toString()){
        //         user[u] = user;
        //     }
        // }
        res.send('0');
    }

    function deleteUser(req, res){
        var uid = req.params.userId;
        model.userModel
            .deleteUser(uid)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
        // for(var u in user){
        //     if(user[u]._id == uid.toString()){
        //         user.splice(u, 1);
        //         res.send(200);
        //     }
        // }
        //res.send('0');
    }
}