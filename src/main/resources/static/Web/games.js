//VUE JS 
var app = new Vue({
    el: '#app',
    data: {
        leaderboard: [],
        games: [],
        players: [],
        win: 0,
        lose: 0,
        total: 0,
        userName: '',
        password: '',
        message: '',
        isLoggedIn: false,
        status: [],
        loggedPlayer: '',
        joinButton: false,
        playButton: false,

    },
    created() {
        this.getData();
        this.fetchLeaderboard();
    },
    methods: {
        getData: function () {
            let url = "/api/games";
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data);
                    app.status = data;

                    if (data.player) {
                        app.isLoggedIn = true;
                        app.message = 'Welcome ' + data.player.email;
                        app.loggedPlayer = app.status.player.id;
                    } else {
                        app.isLoggedIn = false;
                    }

                    app.getGames();
                    app.message="Please log in to play a game";


                })
        },
        fetchLeaderboard: function () {
            let url = "/api/leaderboard";
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data)
                    app.players = data.sort((a, b) => b.total - a.total);
                })
        },

        login: function () {
            fetch("/api/login", {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName=' + this.userName + '&password=' + this.password,
                })
                .then(function (data) {
                    if (data.player = !null) {
                        app.getData();
                        app.message = "Welcome " + app.userName;
                    } else {
                        app.message = 'Login failed. Please try again';
                    }
                    console.log(app.userName);
                    console.log(data)

                })
                .catch(function (fail) {
                    console.log("error")
                })
        },


        getPlayerUrl: function () {
            var stateObject = {
                id: app.loggedPlayer
            };
            var title = "Game View" + app.loggedPlayer;
            var newUrl = "/web/game.html?gp=" + app.loggedPlayer;
            history.pushState(stateObject, title, newUrl);
        },

        logout: function () {
            fetch("/api/logout", {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName=' + this.userName + '&password=' + this.password,
                })
                .then(function (data) {
                    app.status = data;
                    app.message = "Please log in to play a game";
                    app.isLoggedIn = false;
                })
                .catch(function (fail) {
                    console.log("error")
                })
        },

        signUp: function () {
            fetch("/api/players", {
                    credentials: "include",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'userName=' + this.userName + '&password=' + this.password,
                })
                .then(function (data) {
                    console.log(data)
                    if (data.status == 201) {
                        app.isLoggedIn = true;
                        app.login();
                        app.message='Welcome ' + this.userName;
                    } else {
                        app.message = 'Information incomplete. Please try again';
                    }
                })
        },

        //        fetchData: function () {
        //            let url = '/api/games';
        //            fetch(url, {
        //                    method: "GET",
        //                    credentials: "include",
        //                })
        //                .then((response) => response.json())
        //                .then(function (data) {
        //                    console.log(data)
        //                    app.gamesJson = data;
        //                    app.getGames();
        //                })
        //        },


        getGames: function () {
            let array = [];
            let games = this.status.game;
            let playerTwo = "";
            let playerOne = "";
            let playerOneId = "";
            let playerTwoId = "";
            let status = "";
            //            let player2 = "";
            for (var i = 0; i < games.length; i++) {
                let date = new Date(games[i].created);
                let gp = games[i].gamePlayers;
                console.log(gp);
                let dates = date.toLocaleString();
                if ((gp.length == 2 && gp[0].player.id == this.loggedPlayer)) {
                    status = "Play";
                    playerOneId = gp[0].gpId;
                    playerOne = gp[0].player.email + ' vs';
                    playerTwo = gp[1].player.email;
                    playerTwoId = gp[1].gpId;

                } else if (gp.length == 2 && gp[1].player.id == this.loggedPlayer) {
                    status = "Play"
                    playerOneId = gp[1].gpId;
                    playerOne = gp[1].player.email + ' vs';
                    playerTwo = gp[0].player.email;
                    playerTwoId = gp[0].gpId;
                } else if (gp.length == 1 && gp[0].player.id == this.loggedPlayer) {
                    status = "Play"
                    playerOne = gp[0].player.email;
                    playerTwo = "";
                    playerOneId = gp[0].player.id;
                    playerTwoId = "";

                } else if (gp.length == 1 && gp[0].player.id != this.loggedPlayer) {
                    status = "Join";
                    playerOne = gp[0].player.email;
                    playerTwo = "";
                    playerOneId = gp[0].player.id;
                    playerTwoId = "";

                } else {
                    status = "IN GAME";
                    playerOneId = gp[0].gpId;
                    playerOne = gp[0].player.email + ' vs';
                    playerTwo = gp[1].player.email;
                    playerTwoId = gp[1].gpId;
                }
                console.log(status);
                let object = {
                    created: dates,
                    playerOne: playerOne,
                    playerTwo: playerTwo,
                    playerOneId: playerOneId,
                    playerTwoId: playerTwoId,
                    status: status,

                };
                array.push(object);

            }
            this.games = array;

        },
        //
        //    } //END api/games fetch 
    }



    //        login: function (evt) {
    //            evt.preventDefault();
    //            var form = evt.target.form;
    //            $.post("/api/login", {
    //                    username: form["username"].value,
    //                    password: form["password"].value
    //                })
    //                .done(function (d) {
    //                    console.log(d)
    //                })
    //                .fail(function (d) {
    //                    console.log(d)
    //                });
    //        },
    //        logout: function (evt) {
    //            evt.preventDefault();
    //            $.post("/api/logout")
    //                .done(function (d) {
    //                    console.log(d)
    //                })
    //                .fail(function (d) {
    //                    console.log(d)
    //                });

    //            for(var i = 0; i< players.length; i++){
    //                let wins = players[i].win;
    //                let tie = players[i].tie;
    //                wins.sort(function(a, b){
    //                    return a-b});
    //                } this.win = wins;
    //            }



    //end methods

    //fetch - api/games START
    //        

}); //end Vue



////VANILLA JAVASCRIPT
//document.addEventListener("DOMContentLoaded", function () {
//    const ol = document.getElementById("games");
//    const url = '/api/games';
////    fetch(url,{
//////        'credentials': 'included'
////    })
//    fetch(url)
//        .then(resp => resp.json()) //transform data into json 
//        .then(function (data) {
//            //code here
//        console.log(data)
//        let games = data;
//        return games.map(function(game){
//            let li = createNode("li");
//            li.innerHTML = game.created;
//            ol.append(li);
//        })
//
//        })
//        .catch(function (error) {
//            console.log('failed to load, try again', error);
//        });
//})
//
////function creates a type of element passed in the parameter
//function createNode(element) {
//    return document.createElement(element);
//}
////append the second el to its parent on the DOM 
//function append(parent, el) {
//    return parent.appendChild(el);
//}
