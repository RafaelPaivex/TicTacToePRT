import { useState } from "react";

const App = () => {

    const [playerTurn, setPlayerTurn] = useState('X'); //Defines the player turn
    const [squaresValue, setSquaresValue] = useState(Array(9).fill(null)); //Array of 9 with the values fo the games board
    const [gameState, setGameState] = useState(false); //Defines the game state (false = winner not found) (true = winner found / end game)
    const [phrase, setPhrase] = useState("It's your turn player X"); // phrase


    //Check for winnerInicial
    const checkWinner = (squaresValue) => {

        //Winning positions
        const winnerPositions = {
            vertical: [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
            ],
            horizontal: [
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
            ],
            diagonal: [
                [0, 4, 8],
                [6, 4, 2]
            ]

        };

        //Check for winner logic
        for (let winnerPosition in winnerPositions) {

            winnerPositions[winnerPosition].forEach((pattern) => {

                if (squaresValue[pattern[0]] === null || squaresValue[pattern[1]] === null || squaresValue[pattern[2]] === null) {
                    //Do nothing
                } else if (squaresValue[pattern[0]] === squaresValue[pattern[1]] && squaresValue[pattern[1]] === squaresValue[pattern[2]]) {

                    //Winner is found
                    setPhrase('The winner is ' + playerTurn);//Change text to display winner
                    document.getElementById("info").style.color = "green"; //Change color to green when a winner is found
                    setGameState(true); //End game

                }

            })

        }

    }


    //Function that runs when the board is clicked
    const playGame = (e) => {

        let buttonValue = e.target.value; //Get the value of the clicked button

        //Check if the area that the player chose is available
        if (squaresValue[buttonValue] === null) {

            //Change the play turn
            if (playerTurn === 'X') {
                squaresValue[buttonValue] = 'X'; //Output X in the game board
                setPlayerTurn('O'); //Switch player
                setPhrase("It's your turn player O");
            } else {
                squaresValue[buttonValue] = 'O'; //Output O in the game board
                setPlayerTurn('X'); //Switch player
                setPhrase("It's your turn player X");
            }

        }

        checkWinner(squaresValue);

    }


    //Reset the game
    const reset = () => {
        setSquaresValue(Array(9).fill(null)); // Reset array
        setPlayerTurn('X'); //Reset player turn
        setGameState(false); //Start game (allows clicks in buttons)
        setPhrase("It's your turn player X"); //Change text to display player turn
        document.getElementById("info").style.color = "white"; //Change color to white

    }


    return (
        <div className="container">
            <div>
                <h1>Tic Tac Toe</h1>
            </div>
            <div className="turn">
                <p id="info">{phrase}</p>
            </div>
            <div className="gameBorde">
                <table>
                    <tbody>
                        <tr>
                            <td><button value="0" onClick={playGame} disabled={gameState}>{squaresValue[0]}</button></td>
                            <td><button value="1" onClick={playGame} disabled={gameState}>{squaresValue[1]}</button></td>
                            <td><button value="2" onClick={playGame} disabled={gameState}>{squaresValue[2]}</button></td>
                        </tr>
                        <tr>
                            <td><button value="3" onClick={playGame} disabled={gameState}>{squaresValue[3]}</button></td>
                            <td><button value="4" onClick={playGame} disabled={gameState}>{squaresValue[4]}</button></td>
                            <td><button value="5" onClick={playGame} disabled={gameState}>{squaresValue[5]}</button></td>
                        </tr>
                        <tr>
                            <td><button value="6" onClick={playGame} disabled={gameState}>{squaresValue[6]}</button></td>
                            <td><button value="7" onClick={playGame} disabled={gameState}>{squaresValue[7]}</button></td>
                            <td><button value="8" onClick={playGame} disabled={gameState}>{squaresValue[8]}</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="resetButton">
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default App;