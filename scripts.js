const gameBoard = (() => {
    //0 is blank, 1 is X, 2 is O.
    let boardArr = []
    const board = document.getElementById("board");
    const populateBoardArr = () => {
        if(boardArr.length===0) {
            for(i=0;i<9;i++) {
                boardArr.push(cellFactory());
            }
        }
        return boardArr;
    }

    const test = () => {
        console.log("test");
    }
    
    const populateBoard = () => {
        populateBoardArr()
        for(i=0;i<boardArr.length;i++) {
            if(boardArr[i].cell===0) {
                let cell = document.createElement("div");
                cell.textContent = "";
                cell.setAttribute("class", "cell");
                cell.setAttribute("id", i);
                board.appendChild(cell);
            } else if(boardArr[i].cell===1) {
                let cell = document.createElement("div");
                cell.textContent = "X";
                cell.setAttribute("class", "cell");
                cell.setAttribute("id", i);
                board.appendChild(cell);
            } else if(boardArr[i].cell===2) {
                let cell = document.createElement("div");
                cell.textContent = "O";
                cell.setAttribute("class", "cell");
                cell.setAttribute("id", i);
                board.appendChild(cell);
            }
        }
        const cells = document.getElementsByClassName("cell");
        Array.from(cells).forEach((cell) => {
            cell.addEventListener("click", (e) => gameBoard.boardArr[e.target.id].changeContent(e.target.id));
        });
     
    }
    const clearBoard = () => {
        boardArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        return boardArr;
    }
    return {populateBoard, clearBoard, boardArr, test};
})();
 
const gameController = (() => {
    let playerTurn = "two";
    let playerOneName = "";
    let playerTwoName = "";

    //Initializes the name input form and assigns names.
    const inputInit = () => {
        const playerOneField = document.getElementById("playerOne");
        const playerTwoField = document.getElementById("playerTwo");
        const playerOneLabel = document.getElementById("playerOneLabel");
        const playerTwoLabel = document.getElementById("playerTwoLabel");
        const nameForm = document.getElementById("nameForm");
        const overlay = document.getElementById("overlay");
        nameForm.addEventListener("submit", (e) => {
            playerOneName = playerOneField.value;
            playerTwoName = playerTwoField.value;
            overlay.setAttribute("class", "overlay hidden");
            e.preventDefault();
            playerOneLabel.textContent = `${playerOneName}`;
            playerTwoLabel.textContent = `${playerTwoName}`;
        })
    }

    const checkForWin = (inputToCheck) => {
        function horizontalCheck(inputToCheck) {
            let i = 0;
            let cellCount = 0;
            for(let cell in gameBoard.boardArr) {
                if(cell.cell===inputToCheck) {
                    i++
                } else {
                    i = 0;
                }
                if(i===3) {
                    return true;
                }
            }
        }

        function verticalCheck(inputToCheck) {
            let cellCount = 0;
            for(i=0;i<gameBoard.boardArr.length;i++) {
                if(gameBoard.boardArr[i]===1) {
                    cellCount++
                } else {
                    cellCount = 0;
                }
                if(cellCount===3) {
                    return true;
                }
            }
        }

        function diagCheck(inputToCheck) {
            if ((gameBoard.boardArr[0]===inputToCheck &&
                gameBoard.boardArr[4]===inputToCheck &&
                gameBoard.boardArr[8]===inputToCheck) ||
                (gameBoard.boardArr[2]===inputToCheck &&
                gameBoard.boardArr[4]===inputToCheck &&
                gameBoard.boardArr[6]===inputToCheck)) {
                    return true;
                }
        }
        horizontalCheck(inputToCheck);
        verticalCheck(inputToCheck);
        diagCheck(inputToCheck);
    }

    const changeTurn = () => {
        if(gameController.playerTurn==="one") {
            gameController.playerTurn = "two";
        } else if(gameController.playerTurn==="two") {
            gameController.playerTurn = "one";
        }
        if(checkForWin(1)) {prompt(`${gameController.playerOneName} wins!`)};
        if(checkForWin(2)) {prompt(`${gameController.playerTwoName} wins!`)};
        }

    return {playerTurn, inputInit, playerOneName, playerTwoName, checkForWin, changeTurn};

})();


const cellFactory = function() {
    let cell = 0;
    let changeContent = (cellClicked) => {
        let cellToChange = document.getElementById(cellClicked);
        let cellArrToChange = gameBoard.boardArr[cellClicked];
        if(gameController.playerTurn==="one") {
            if(cell===0) {
                cellArrToChange.cell = 1;
                cellToChange.textContent = "X";
                gameController.changeTurn();
            }
        } else if(gameController.playerTurn==="two") {
            if(cell===0) {
                cellArrToChange.cell = 2;
                cellToChange.textContent = "O";
                gameController.changeTurn();
            }
        }
    
    }
    return {cell, changeContent};
}

gameController.inputInit();
gameBoard.populateBoard();