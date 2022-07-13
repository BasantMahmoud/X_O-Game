//................Collection Values from session Storage.................
let p1 = sessionStorage.getItem("player1");
let p2 = sessionStorage.getItem("player2");
let w = sessionStorage.getItem("with");

//...........collecting Some DOM elements..............
const boxes = document.querySelectorAll(".grid-container>.box");
const reload = document.getElementById("reload");
const turn_msg = document.getElementById("turn-el");
const pop_up = document.getElementById("popup");
const Replay = document.getElementById("replay-btn");
const Exit = document.getElementById("exit-btn");

let Turn = p1;
let win_matrix = [undefined, -1, -2, -3, -4, -5, -6, -7, -8, -9];
let empty_block = [1, 2, 3, 4, 5, 6, 7, 8, 9];

//calling startGame function......
startGame();

//FUNCTION................

function startGame() {
  Turn = p1 == "X" ? p1 : p2;
  console.log(Turn);
  //   turn_msg.textContent = Turn + "TURN";

  // 2D matrix for winning caeck;

  if (w == "cpu") {
    if (p1 == "O") {
      cpu_turn();
      Turn = p1;
      renderGame();
    } else {
      renderGame();
    }
  } else {
    renderGame();
  }
}

//if Game is played with Computer

function cpu_turn() {
  let ele = 0;

  let grid = Math.floor(Math.random() * 10);
  while (empty_block.includes(grid) != true && empty_block.length != 0) {
    grid = Math.floor(Math.random() * 10);
  }
  if (empty_block.length != 0) {
    if (p2 == "O") {
      ele = display_image("./o.png", "zero");
    } else {
      ele = display_image("./X.png", "cross");
    }
    document.getElementById(grid).appendChild(ele);

    win_matrix[grid] = p2;

    empty_block.splice(empty_block.indexOf(grid), 1);

    //checking the condition of winning......
    let iswin = check_win();
    if (iswin == true) {
      Display_Popup("CPU");
      document.getElementById("grid").style.pointerEvents = "none";
    }
    //checking for DRAW......
    let isDraw = check_draw();
    if (isDraw == true) {
      Display_Popup("DRAW");
    }
  }

  // console.log(empty_block);
}

// renderGame function contains Game Logic

function renderGame() {
  let v = undefined;
  //adding eventlistner to each box of Grid

  boxes.forEach((item) => {
    item.addEventListener("click", events, { once: true });

    // item.removeEventListener('click',events);
  });

  //Handles Click Events of Box

  function events() {
    let ele = 0;
    if (Turn == "O") {
      ele = display_image("./o.png", "zero");
    } else {
      ele = display_image("./X.png", "cross");
    }
    this.appendChild(ele);
    empty_block.splice(empty_block.indexOf(parseInt(this.id)), 1);
    win_matrix[this.id] = Turn;

    //winning check...

    let iswin = check_win();
    if (iswin == true) {
      Display_Popup(Turn);
      document.getElementById("grid").style.pointerEvents = "none";
    } else {
      let isDraw = check_draw();
      if (isDraw == true) {
        Display_Popup("DRAW");
      } else {
        if (w == "cpu") {
          //if Game is with computer call cpu_turn
          cpu_turn();
        } else {
          Turn = Turn == p1 ? p2 : p1;
          //   turn_msg.textContent = Turn + " TURN";
        }
      }
    }
  }
}

//function to render imge of zero or cross in the clicked box

function display_image(src, alt) {
  var image = document.createElement("img");
  image.src = src;
  image.alt = alt;
  image.style.display = "block";
  image.style.margin = "1rem auto";
  return image;
}

//function to reload Game

function reload_game() {
  window.location.reload();
}

//function that checks all winning conditions

function check_win() {
  if (win_matrix[1] == win_matrix[2] && win_matrix[2] == win_matrix[3]) {
    console.log("R1");
    return true;
  }
  if (win_matrix[4] == win_matrix[5] && win_matrix[5] == win_matrix[6]) {
    console.log("R2");
    return true;
  }
  if (win_matrix[7] == win_matrix[8] && win_matrix[7] == win_matrix[9]) {
    console.log("R3");
    return true;
  }
  if (win_matrix[1] == win_matrix[4] && win_matrix[4] == win_matrix[7]) {
    console.log("C1");
    return true;
  }
  if (win_matrix[2] == win_matrix[5] && win_matrix[5] == win_matrix[8]) {
    console.log("C2");
    return true;
  }
  if (win_matrix[3] == win_matrix[6] && win_matrix[6] == win_matrix[9]) {
    console.log("C3");
    return true;
  }
  if (win_matrix[1] == win_matrix[5] && win_matrix[5] == win_matrix[9]) {
    console.log("D1");
    return true;
  }
  if (win_matrix[3] == win_matrix[5] && win_matrix[5] == win_matrix[7]) {
    console.log("D2");
    return true;
  } else {
    return false;
  }
}

// checks for Draw conditions...........

function check_draw() {
  let win = check_win();
  if (empty_block.length == 0 && win == false) {
    return true;
  }
}

//function to display  wiining msg popUp
function Display_Popup(player) {
  let winmsg = "";
  if (player == "DRAW") {
    winmsg = "Game Over";
  } else {
    winmsg = "!!! " + player + " WINS !!!";
  }

  let heading = document.getElementById("win-msg");
  heading.textContent = winmsg;
  pop_up.classList.add("active");
  Replay.addEventListener("click", reload_game);
  Exit.addEventListener("click", () => {
    window.location.replace("./index.html");
  });
}

//click of reload logo is handled

reload.addEventListener("click", reload_game);
