var app = new Vue({
    el: '#app',
    data: {
        gameView: [],
        gameObject: [],

        rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        cols: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        players: {},
        hits: [],
        opponentTable: false,
    },

    created() {
        this.fetchData();

    },
    methods: {
        fetchData: function () {
            let id = window.location.search.split("=")[1];
            let url = '/api/game_view/' + id;
            fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                .then((response) => response.json())
                .then(function (data) {

                    app.gameView = data.gameView;
                    console.log(app.gameView);

                    app.gameObject = app.gameView.game.gamePlayers;
                    app.displayShips();
                    app.getUsername();
                    app.displaySalvoes(app.gameView['userSalvoes'], 'E')
                    if (app.gameObject.length == 2) {
                       app.opponentTable = true; app.displaySalvoes(app.gameView['opponentSalvoes'], 'U')
                    } else{
                        app.opponentTable = false;
                    }

                })
        },



        displayShips: function () {
            let ships = app.gameView.ships;
            for (let i = 0; i < ships.length; i++) {
                for (let j = 0; j < ships[i].locations.length; j++) {
                    let shipLocation = ships[i].locations[j];
                    console.log(shipLocation);
                    //shiplocation id - dinamically calculates the id as you move on the grid with every cell - it's a special :id="r+c
                    let cell = document.getElementById('U' + shipLocation).classList.add("ship-location");
                }
            }
        },

        displaySalvoes: function (array, table) {
            let salvoes = array;
            for (var i = 0; i < salvoes.length; i++) {
                let turn = salvoes[i].turn;
                let locations = salvoes[i].locations;
                for (let j = 0; j < locations.length; j++) {
                    let salvoLocation = locations[j];
                    let cell = document.getElementById(table + salvoLocation);
                    cell.innerHTML = turn;
                    cell.classList.add("salvo-location");
                    if (cell.classList.contains("ship-location")) {
                        cell.classList.add("hit");
                    }
                }
            }

        },

        getUsername: function () {
            let gamePlayers = this.gameView.game.gamePlayers;
            let player1 = gamePlayers["0"].player.email;
            let player2;
            if (gamePlayers[1]) {
                player2 = gamePlayers[1].player.email;
            } else {
                player1 = gamePlayers["0"].player.email;
                player2 = '';
            }
            app.players = {
                player1: player1,
                player2: player2
            }
        }
    }

})
//drag and drop 
let ships = document.querySelectorAll('.shipTypeLabel');
let cells = document.querySelectorAll('.userCells');
let existingShips = document.querySelectorAll('.ship-location');
var id;

function allowDrop(ev) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function startDrag(ev) {
    id = ev.target.id;
    let placedShip = document.getElementsByClassName(".shipTypeLabel")
    console.log(placedShip);
    console.log(existingShips);

}

function drop(ev) {

    let locShip = ev.target.id;
    console.log(ships)
    ev.target.append(document.getElementById(id));

}
//location of the ships ;






//    for (var i = 0; 1 < cells.length; i++) {
//    ships[i].addEventListener('dragstart', dragStart);
//    ships[i].addEventListener('dragend', dragEnd);
//}
//
//
//function dragStart() {
//    console.log('starts');
//}
//
//function dragEnd() {
//    console.log('end');
//}




//    data: function(){
//        let letterLoc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//        let numberLoc =["1", "2", "3", "4". "5", "6", "7", "8", "9", "10"];
//    }
//})

//$.ajax("/api/game_view/1").done(function (json) {
//            data = json;
//            createTable();
//});
//
//function createTable(){
//    var table = '';
//    var row = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//    var column = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
//    for (var r = 0; r < row.length; r++){
//        table += '<tr>';
//        for (var c = 0; c < column.length; c++){
//            table += '<td>'+ c +'</td>';
//        }  
//     document.write('<table'+ table + '</table>');
//}
//    
//
////            function createNod(el) {
////                return document.createElement(el);
////            }
////
////            function append(parent, el) {
////                return parent.appendChild(el);
////            }
////
////            let letterLoc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
////            let numberLoc = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
////
////            function createTable(letterLoc, numberLoc) {
////                for (let i = 0; i < letterLoc.length; i++) {
////                    let row = createNod("tr");
////                    for (var h = 0; j < numberLoc.length; i++) {
////                        let cell = createNod("td");
////                        append(row, cell);
////                    }
////                }
////            }
