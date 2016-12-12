/**
 * Created by nishavaity on 10/13/16.
 */

(function () {
    angular
        .module ("MakeYourTourApp")
        .factory("UserService", UserService)
    function UserService($http){
    //
    // var user = [
    //     {_id: "123", email:"alice@gmail.com", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    //     {_id: "234", email:"bob@gmail.com", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    //     {_id: "345", email:"charly@gmail.com", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    //     {_id: "456", email:"jannunzi@gmail.com", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    // ];
        var api = {
            createUser   : createUser,
            findUserById : findUserById,
            findCurrentUser: findCurrentUser,
            findUserByUsername : findUserByUsername,
            findUserByCredentials : findUserByCredentials,
            updateUser : updateUser,
            deleteUser : deleteUser,
            login:login,
            logout:logout,
            register:register,
            checkLogin: checkLogin,
            checkAdmin: checkAdmin

    };
        return api;


        function findCurrentUser() {
            var url = '/api/user/';
            return $http.get(url);
        }

        function register(user) {
            var url = '/api/register';
            return $http.post(url,user);
        }

        function logout() {
            return $http.post("/api/logout");
        }

        function checkLogin() {
            return $http.post("/api/checkLogin");
        }

        function checkAdmin() {
            return $http.post("/api/checkAdmin");
        }

        function login(username,password) {

            var user ={
                username:username,
                password:password
            }
            console.log(user);

            //console.log("IN client service login"+user);
            return $http.post('/api/login', user);
        }

        function createUser(user) {
            //user.push(user);
            //console.log(user);
            var url = '/api/user';
            return $http.post(url,user);
            //console.log(user);
        }

        function findUserById(userId) {

            var url = '/api/user/' +  userId;
            return $http.get(url);
            // var user;
            // for( var u in user){
            //     if(user[u]._id === userId){
            //         user = user[u];
            //         console.log(user)
            //         break;
            //     }
            // }
            // return user;

        }
        function findUserByUsername(username) {

            var url = '/api/user?username='+username;
            return $http.get(url);
            // user.forEach(function(user){
            //     if(user.username == username){
            //         return user;
            //     }
            // });
        }
        function findUserByCredentials(username, password) {

            var url = '/api/user?username='+username+'&password='+password;
            //console.log(url);
            return $http.get(url);
            // var user;
            // for( var u in user){
            //     if(user[u].username === username && user[u].password === password){
            //         user = user[u];
            //         break;
            //     }
            // }
            // return user;
        }
        function updateUser(userId,user) {
            var url = "/api/user/" + userId;
            return $http.put(url,user);
            // for( var u in user){
            //     if(user[u]._id === userId){
            //         user[u] = userUpdated;
            //         break;
            //     }
            // }
        }
        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url);
            // for( var u in user){
            //     if(user[u]._id === userId.toString()){
            //         user.splice(u, 1);
            //         console.log(user)
            //         break;
            //     }
            // }

        }
}
})();