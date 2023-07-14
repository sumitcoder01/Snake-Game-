console.log("Welcome To SnakeMania...");

//Initilization...
let inputDir = { x: 0, y: 0 };
let score = document.getElementById('score');
let hiscore = document.getElementById('hiscore');
let board = document.querySelector('.board');
let lastpaint = 0;
let speed = 7;
let scoreval = 0;
let hiscoreVal = 0;
let snake = [{ x: 5, y: 3 }];
let food = { x: 16, y: 6 };
const music = new Audio('music/music.mp3');
const gameover = new Audio('music/gameover.mp3');
const foodmusic = new Audio('music/food.mp3');
const move = new Audio('music/move.mp3');

// Game Logic...

function updateScore() {
    score.innerHTML = "Score: " + scoreval;
    for (i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }

    snake[0].x += inputDir.x;
    snake[0].y += inputDir.y;

    if (scoreval > hiscoreVal) {
        hiscoreVal = scoreval;
        hiscore.innerHTML = "Hiscore: " + hiscoreVal;
        localStorage.setItem("Hiscore", JSON.stringify(hiscoreVal));
    }
}

function isCollide(snake) {
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            return true;
        }
    }
    if (snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18) {
        return true;
    }
    return false;

}

function gameStatergy() {
    //For Collition with itself and walls
    if (isCollide(snake)) {
        console.log("Game Over...");
        music.pause();
        gameover.play();
        alert("Please Enter Any Key To Restart The Game...");
        music.play();
        snake = [{ x: 5, y: 3 }];
        inputDir = { x: 0, y: 0 };
        scoreval = 0;
        lastpaint = 0;
        updateScore();
    }

    //Eating Food ,Regenerate Food  and update Score
    if (snake[0].x == food.x && snake[0].y == food.y) {
        foodmusic.play();
        scoreval += 1;
        updateScore();
        snake.unshift({ x: snake[0].x + inputDir.x, y: snake[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food.x = Math.round(a + (b - a) * Math.random());
        food.y = Math.round(a + (b - a) * Math.random());
    }
    // Moving Snake...

    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }
    snake[0].x += inputDir.x;
    snake[0].y += inputDir.y;

    //Display Snake

    board.innerHTML = "";

    snake.forEach((e, index) => {
        let snakelement = document.createElement('div');
        snakelement.style.gridRowStart = `${e.y}`;
        snakelement.style.gridColumnStart = `${e.x}`;
        if (index == 0) {
            snakelement.classList.add('head');
        }

        else {
            snakelement.classList.add('snakeBody');
        }

        board.appendChild(snakelement);
    });
    //Display Food..
    let foodelement = document.createElement('div');
    foodelement.style.gridRowStart = `${food.y}`;
    foodelement.style.gridColumnStart = `${food.x}`;
    foodelement.classList.add('fooditem');
    board.appendChild(foodelement);
}

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastpaint) / 1000 < 1 / speed) {
        return;
    }
    lastpaint = ctime;
    gameStatergy();
}
// main Logic StartsHere...
music.play();

if (localStorage.getItem("Hiscore") == null) {
    localStorage.setItem("Hiscore", JSON.stringify(hiscoreVal));
}

else {
    hiscoreVal = JSON.parse(localStorage.getItem("Hiscore"));
    if (scoreval > hiscoreVal) {
        hiscoreVal = scoreval;
        localStorage.setItem("Hiscore", JSON.stringify(hiscoreVal));
    }
    hiscore.innerHTML = "Hiscore: " + hiscoreVal;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    move.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            inputDir = { x: 1, y: 0 };
            break;
    }


});

