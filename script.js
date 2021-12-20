let guessesArray = ["Rock", "Papers", "Scissors"];

function computerPlay() {
    let randomIndex = Math.floor(Math.random() * 3);
    return guessesArray[randomIndex];
}

function getPlayerSelection() {
    let playerSelection = '';
    while (! guessesArray.includes(playerSelection)) {
        playerSelection = prompt("Make your right choose: Rock, Papers, Scissors or choose Cancel");
        if (playerSelection === null) return playerSelection;
    }
    return playerSelection;
}

function playRound(computerSelection, playerSelection) {
    // Scissors - Papers // rock - paper // scissors - rock -> Won
    if (
        (playerSelection === "Scissors" && computerSelection === "Papers") ||
        (computerSelection === "Rock" && playerSelection === "Papers") ||
        (computerSelection === "Scissors" && playerSelection === "Rock")
    ) return "Won";
    else if (
        // papers - Scissors // paper - rock // rock - scissors -> Loose
        (computerSelection === "Scissors" && playerSelection === "Papers") ||
        (playerSelection === "Rock" && computerSelection === "Papers") ||
        (playerSelection === "Scissors" && computerSelection === "Rock")
    ) return "Loose";
    
    // papers - papers  // scissors-scissors  // rock-rock -> Tie
    else return "Tie";
}

function game() {
    let playerScore = 0,
        computerScore = 0,
        roundResult,
        computerSelection,
        playerSelection;

    for (var i = 0; i < 5; i++) {
    
        computerSelection = computerPlay(); // computer choice
        playerSelection = getPlayerSelection(); // player choice
        
        if (playerSelection == null) return; // cancel game

        // play round
        roundResult = playRound(computerSelection, playerSelection);
        // report round result
        console.log("Computer choose: ", computerSelection);
        console.log("You choose: ", playerSelection);
        console.log('---------------------------------');
        console.log("Round Result: ", roundResult);
        console.log('    ');
        
        // add result to total score
        if (roundResult == "Won") {
            playerScore += 1;
        } else if (roundResult == "Loose") {
            computerScore += 1;
        }
    }
    // report total game score
    console.log("Total score of player: ", playerScore);
    console.log("Total score of computer: ", computerScore);
    console.log('==========================================');
    if (playerScore > computerScore) console.log("Game result: You won!");
    else if (playerScore < computerScore) console.log("Game result: You loose!");
    else console.log('Game result: Tie');
}

game();
