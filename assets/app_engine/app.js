// Variable declaration

//declaring players
var players = {
    player1: [],
    player2: []
};
// At the start of the game the condition for winning is false
var winCondition = false;
// Winning sets
var winSets= [
    ['.cell1', '.cell2', '.cell3'],
    ['.cell4', '.cell5', '.cell6']
    ['.cell7', '.cell8', '.cell9']
    ['.cell1', '.cell4', '.cell7']
    ['.cell2', '.cell5', '.cell8']
    ['.cell3', '.cell6', '.cell9']
    ['.cell1', '.cell5', '.cell9']
    ['.cell3', '.cell6', '.cell7']
];

function validState(cell) {
    if (players.player1.indexOf(cell) !== -1) {
        return false;
    }
    if (players.player2.indexOf(cell) !== -1) {
        return false;
    }
    return true;
};

// Set condition to win the match
function playerWins() {
    if (players.player1.length < 3) {
        winCondition = false;
    };
    winSets.forEach(function(item) {
        var p1 = _.filter(item, function(value) {
            return players.player1.indexOf(value) !== -1;
        });
        var p2 = _.filter(item, function(value) {
            return players.player2.indexOf(value) !== -1;
        });
        if(_.isEqual(p1, item)) {
            winCondition = true;
            $('#result').text("Player 1 A.K.A. 'X' Wins!");
            $('#resultModal').modal('toggle');
        };
        if(_.isEqual(p2, item)) {
            winCondition = true;
            $('#result').text("Player 2 A.K.A. 'X' Wins!");
            $('#resultModal').modal('toggle');
        };
    });
};

/* whenever the user clicks a cell, "X" is displayed for player 1 and
"O" is displayed for player 2. If player 1 has completed 5 turns while
the winCondition is true, then that game is a tie. */
function clicked(cell) {
    if (!winCondition) {
        if (validState(cell)) {
            if (players.player1.length === players.player2.length) {
                players.player1.push(cell);
                $(cell).text('X');
            } else if(players.player1.length > players.player2.length) {
                players.player2.push(cell);
                $(cell).text('O');
            };
            playerWins();
            if (players.player1.length === 5 && !winCondition) {
                $('#result').text('Draw, Nobody Wins!');
                $('#resultModal').modal('toggle');
                winCondition = true;
            };
        };
    };
};

//Clear the game board and start a new game by clicking on replay
function resetGame() {
    $('span').text('');
    winCondition = false;
    players.player1 = [];
    players.player2 = [];
};