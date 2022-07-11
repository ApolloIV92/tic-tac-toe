const gameBoard = (() => {
    //0 is blank, 1 is X, 2 is O.
    let boardArr = []
    const board = document.getElementById("board");
    const populateBoardArr = function() {
        if(board.firstChild) {
            while(board.firstChild) {
                board.removeChild(board.firstChild);
            }
        }
        this.boardArr = [];
        for(i=0;i<9;i++) {
            this.boardArr.push(cellFactory());
        }
        return boardArr;
    }

    const test = function() {
        console.log("test");
        console.log(this===gameBoard);
    }
    
    const populateBoard = function() {
        populateBoardArr.call(this);
        for(i=0;i<this.boardArr.length;i++) {
            if(this.boardArr[i].cell===0) {
                let cell = document.createElement("div");
                cell.textContent = "";
                cell.setAttribute("class", "cell");
                cell.setAttribute("id", i);
                board.appendChild(cell);
            } else if(this.boardArr[i].cell===1) {
                let cell = document.createElement("div");
                cell.textContent = "X";
                cell.setAttribute("class", "cell");
                cell.setAttribute("id", i);
                board.appendChild(cell);
            } else if(this.boardArr[i].cell===2) {
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

    return {populateBoard, boardArr, test, populateBoardArr};
})();
 
const gameController = (() => {
    let playerTurn = "one";
    let moveCount = 0;
    const playerOneLabel = document.getElementById("playerOneLabel");

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
            for(i=0;i<=6;i+=3) {
                if(gameBoard.boardArr[i].cell===inputToCheck &&
                    gameBoard.boardArr[i+1].cell===inputToCheck &&
                    gameBoard.boardArr[i+2].cell===inputToCheck) {
                        console.log(`Horizontal, ${inputToCheck}`);
                        return true;
                    }
            }
        }

        function verticalCheck(inputToCheck) {
            let cellCount = 0;
            for(i=0;i<=2;i++) {
                if(gameBoard.boardArr[i].cell===inputToCheck && 
                    gameBoard.boardArr[i+3].cell===inputToCheck &&
                    gameBoard.boardArr[i+6].cell===inputToCheck) {
                        console.log(`Vertical, ${inputToCheck}`)
                        return true;
                    }
            }
        }

        function diagCheck(inputToCheck) {
            if ((gameBoard.boardArr[0].cell===inputToCheck &&
                gameBoard.boardArr[4].cell===inputToCheck &&
                gameBoard.boardArr[8].cell===inputToCheck) ||
                (gameBoard.boardArr[2].cell===inputToCheck &&
                gameBoard.boardArr[4].cell===inputToCheck &&
                gameBoard.boardArr[6].cell===inputToCheck)) {
                    console.log(`Diagonal, ${inputToCheck}`)
                    return true;
                    
                }
        }
        if(horizontalCheck(inputToCheck)) {return true;}
        if(verticalCheck(inputToCheck)) {return true;}
        if(diagCheck(inputToCheck)) { return true;}
    }

    const addOutcome = (type, player) => {
        const playerOneColumn = document.getElementById("wCounterOne");
        const playerTwoColumn = document.getElementById("wCounterTwo");
        const win = document.createElement("span");
        win.setAttribute("class", "win");
        win.textContent = "W";
        const loss = document.createElement("span");
        loss.setAttribute("class", "loss");
        loss.textContent = "L";
        const tie = document.createElement("span");
        tie.setAttribute("class", "tie");
        tie.textContent = "T";
        if(player==="one") {
            if(type==="win") {
                playerOneColumn.appendChild(win);
            } else if(type==="loss") {
                playerOneColumn.appendChild(loss);
            } else if(type==="tie") {
                playerOneColumn.appendChild(tie);
            }
        } else if(player==="two") {
            if(type==="win") {
                playerTwoColumn.appendChild(win);
            } else if(type==="loss") {
                playerTwoColumn.appendChild(loss);
            } else if(type==="tie") {
                playerTwoColumn.appendChild(tie);
            }
        }
    }

    const changeTurn = function() {
        const playerOneLabel = document.getElementById("playerOneLabel");
        const playerTwoLabel = document.getElementById("playerTwoLabel");
        const winOverlay = document.getElementById("winOverlay");
        
        const changePlayer = () => {
            if(gameController.playerTurn==="one") {
                playerOneLabel.setAttribute("class", "player");
                playerTwoLabel.setAttribute("class", "player selected");
                gameController.playerTurn = "two";
            } else if(gameController.playerTurn==="two") {
                playerTwoLabel.setAttribute("class", "player");
                playerOneLabel.setAttribute("class", "player selected");
                gameController.playerTurn = "one";
            }
        }
        
        if(checkForWin(1)) {
            winOverlay.textContent = `${playerOneLabel.textContent} wins!`
            addOutcome("win", "one");
            addOutcome("loss", "two");
            this.moveCount = 0;
            setTimeout(() => {
                gameBoard.populateBoard();
                winOverlay.textContent = "";
            }, 3000);
            return;
        }
        if(checkForWin(2)) {
            winOverlay.textContent = `${playerTwoLabel.textContent} wins!`
            addOutcome("win", "two");
            addOutcome("loss", "one");
            this.moveCount = 0;
            setTimeout(() => {
                gameBoard.populateBoard();
                winOverlay.textContent = "";
                changePlayer();
            }, 3000);
            return;
        } if(this.moveCount===8) {
            winOverlay.textContent = `Tie game!`
            addOutcome("tie", "two");
            addOutcome("tie", "one");
            this.moveCount = 0;
            setTimeout(() => {
                gameBoard.populateBoard();
                winOverlay.textContent = "";
                changePlayer();
            }, 3000);
            return;
        } else {
            this.moveCount++
            changePlayer();
            
        }
        }



    return {playerTurn, inputInit, checkForWin, changeTurn, moveCount};

})();


const cellFactory = function() {
    let cell = 0;
    const changeContent = function(cellClicked) {
        let cellToChange = document.getElementById(cellClicked);
        let winOverlay = document.getElementById("winOverlay");
        if(gameController.playerTurn==="one" && !winOverlay.textContent) {
            if(cellToChange.textContent==="") {
                this.cell = 1;
                cellToChange.textContent = "X";
                gameController.changeTurn();
            }
        } else if(gameController.playerTurn==="two" && !winOverlay.textContent) {
            if(cellToChange.textContent==="") {
                this.cell = 2;
                cellToChange.textContent = "O";
                gameController.changeTurn();
            }
        }
    
    }
    return {cell, changeContent};
}

gameController.inputInit();
gameBoard.populateBoard();