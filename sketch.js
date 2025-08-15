// Array holding the positions of the snake's body segments
let snakePositions = [
    {
        x: 300,
        y: 300
    }
]

// Delay between key presses to prevent rapid direction changes
const keyDelay = 120;
let lastKeypress = 0; // Timestamp of last key press

let bodyLength = 1; // Initial length of the snake


// Direction flags for snake movement
let snakeUp = false;
let snakeDown = false;
let snakeRight = false;
let snakeLeft = false;

let isRunning = true; // Game running state

// Random initial positions for food
let IntegerX = Math.ceil(Math.random() * 23) * 25;
let IntegerY = Math.ceil(Math.random() * 23) * 25;
let IntegerX2 = Math.ceil(Math.random() * 22) * 25 + 12.5;
let IntegerY2 = Math.ceil(Math.random() * 22) * 25 + 12.5;

let score = 0; // Player's score

// Food position variables
let foodXpos = IntegerX2;
let foodYpos = IntegerY2;

// Food hitbox variables
let foodHitboxLeft, foodHitboxRight, foodHitboxTop, foodHitboxBottom;

// Function to end the game and display GAME OVER
function endGame(){
    console.log("GAME OVER")
    isRunning = false;
    // Draw snake in red to indicate game over
    for(i = 0; i< snakePositions.length;i++){
        fill(255,0,0);
        rect(snakePositions[i].x, snakePositions[i].y, 25, 25)
    }
    alert("Game Over! Your score is " + score);
    window.location.reload();
    noLoop(); // Stop the draw loop
}

// p5.js setup function, runs once at start
function setup(){
    createCanvas(600,600); // Create game canvas
    frameRate(9) // Set game speed
    // Prevent arrow keys from scrolling the page
    window.addEventListener("keydown", function(e) {
        if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code)>-1){
            e.preventDefault();
        }
    });
}

// p5.js draw function, runs every frame
function draw(){
    background(0); // Clear background

    // Check for collision with walls
    if (snakePositions[0].x == 0 || snakePositions[0].x == 600 || snakePositions[0].y == 0|| snakePositions[0].y == 600) {
        snakeUp = false
        snakeLeft = false
        snakeRight = false
        snakeDown = false
        endGame();
    }
    
    // Calculate food hitbox
    foodHitboxLeft = foodXpos - 12.5;
    foodHitboxRight = foodXpos + 12.5;
    foodHitboxTop = foodYpos - 12.5;
    foodHitboxBottom = foodYpos + 12.5;

    // Create new snake head position based on direction
    let snakeBody = {
        x:snakePositions[0].x,
        y:snakePositions[0].y
    }

    // Move snake if any direction is active
    if(snakeUp || snakeDown || snakeLeft || snakeRight){

        // Update head position based on direction
        if (snakeUp == true){
            snakeBody.y = snakePositions[0].y - 25;
        }
        if (snakeDown == true){
            snakeBody.y = snakePositions[0].y + 25;
        }
        if (snakeRight == true){
            snakeBody.x = snakePositions[0].x + 25;
        }
        if (snakeLeft == true){
            snakeBody.x = snakePositions[0].x - 25;
        }
        
        // Add new head to snakePositions
        snakePositions.unshift(snakeBody)
        // Remove extra segments to maintain correct length
        for(i = snakePositions.length - 1; i >= bodyLength;i--){
            snakePositions.splice(i,1)
        }

        // Check if snake eats the food
        if (snakePositions[0].x + 12.5 == foodXpos && snakePositions[0].y  + 12.5 == foodYpos){
            // Generate new food position
            foodXpos = Math.ceil(Math.random() * 22) * 25 + 12.5;
            foodYpos = Math.ceil(Math.random() * 22) * 25 + 12.5;
            score++; // Increase score
            bodyLength++; // Increase snake length
            document.getElementById("score").innerHTML = "Score: " + score
        }

        // Draw snake and check for self-collision
        for(i = 0; i< snakePositions.length;i++){
            fill(0,255,0);
            rect(snakePositions[i].x, snakePositions[i].y, 25, 25)

            // If head collides with body, end game
            if(snakePositions[0].x == snakePositions[i].x && snakePositions[0].y == snakePositions[i].y && i != 0){
                endGame();
            }
        }
    }

    // Draw grid lines
    for (let i = 0; i < 24; i++){
        stroke("grey");
        line(i*25, 0, i * 25, 600)
        line(0, i*25, 600, i*25)
    }

    // Draw food as a red ellipse
    fill(255,0,0);
    ellipse(foodXpos, foodYpos, 12.5, 12.5)
}

// p5.js function to handle key presses for snake direction
function keyPressed() {
    // Prevent rapid direction changes
    if(lastKeypress + keyDelay > millis())
        return;

    // Change direction based on arrow key pressed, prevent reversing
    if (keyCode === LEFT_ARROW && snakeRight == false){
        snakeRight = false;
        snakeLeft = true;
        snakeUp = false;
        snakeDown = false;
    }
    else if (keyCode === RIGHT_ARROW && snakeLeft == false){
        snakeRight = true;
        snakeLeft = false;
        snakeUp = false;
        snakeDown = false;
    }
    else if (keyCode === UP_ARROW && snakeDown == false){
        snakeRight = false;
        snakeLeft = false;
        snakeUp = true;
        snakeDown = false;
    }
    else if (keyCode === DOWN_ARROW && snakeUp == false){
        snakeRight = false;
        snakeLeft = false;
        snakeUp = false;
        snakeDown = true;
    }

    lastKeypress = millis(); // Update last key press
}

