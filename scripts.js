const gameController = (() => {
    let playerTurn = "one";
    return {playerTurn};
})();

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
        for (let cell in cells) {
            document.addEventListener("click", (e) => gameBoard.boardArr[e.target.id].changeContent(e.target.id));
        }
    }
    const clearBoard = () => {
        boardArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        return boardArr;
    }
    return {populateBoard, clearBoard, boardArr, test};
})();

const cellFactory = () => {
    let cell = 0;
    let changeContent = (cellClicked) => {
        let cellToChange = document.getElementById(cellClicked)
        if(gameController.playerTurn==="one") {
            if(cell===0) {
                cell = 1;
                gameController.playerTurn = "two";
            }
        } else if(gameController.playerTurn==="two") {
            if(cell===0) {
                cell = 2;
                gameController.playerTurn = "one";
            }
        }
        if(cell===1) {
            cellToChange.textContent = "X";
        } else if(cell===2) {
            cellToChange.textContent = "O";
        }
    }
    return {cell, changeContent};
}

gameBoard.populateBoard();