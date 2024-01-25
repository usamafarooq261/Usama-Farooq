const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    const boxSize = 20;
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = 'right';
    let isGameRunning = false;
    let score = 0;
    let gameInterval;
    let pauseState = null;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw snake
      ctx.fillStyle = '#2ecc71';
      for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x * boxSize, snake[i].y * boxSize, boxSize, boxSize);
      }

      // Draw food
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
    }

    function move() {
      let headX = snake[0].x;
      let headY = snake[0].y;

      // Move the head in the current direction
      if (direction === 'right') headX++;
      else if (direction === 'left') headX--;
      else if (direction === 'up') headY--;
      else if (direction === 'down') headY++;

      // Check for collision with the food
      if (headX === food.x && headY === food.y) {
        // Increase the snake length and place new food
        snake.unshift({ x: headX, y: headY });
        food = { x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 30) };
        score++;
        updateScoreboard();
      } else {
        // Move the snake
        snake.pop();
        snake.unshift({ x: headX, y: headY });
      }
    }

    function checkCollision() {
      const headX = snake[0].x;
      const headY = snake[0].y;

      // Check for collision with walls
      if (headX < 0 || headY < 0 || headX >= 30 || headY >= 30) {
        gameOver();
      }

      // Check for collision with itself
      for (let i = 1; i < snake.length; i++) {
        if (headX === snake[i].x && headY === snake[i].y) {
          gameOver();
        }
      }
    }

    function resetGame() {
      snake = [{ x: 10, y: 10 }];
      food = { x: 15, y: 15 };
      direction = 'right';
      score = 0;
      updateScoreboard();
    }

    function gameLoop() {
      if (isGameRunning) {
        move();
        checkCollision();
        draw();
      }
    }

    function startOrResumeGame() {
      if (isGameRunning || pauseState) {
        resumeGame();
      } else {
        startGame();
      }
    }

    function startGame() {
      clearInterval(gameInterval);
      resetGame();
      isGameRunning = true;
      gameInterval = setInterval(gameLoop, 100);
    }

    function pauseGame() {
      if (isGameRunning) {
        pauseState = {
          snake: [...snake],
          food: { ...food },
          direction: direction,
          score: score,
        };
        isGameRunning = false;
        clearInterval(gameInterval);
      }
    }

    function resumeGame() {
      if (!isGameRunning && pauseState) {
        snake = pauseState.snake;
        food = pauseState.food;
        direction = pauseState.direction;
        score = pauseState.score;
        updateScoreboard();
        pauseState = null;
        isGameRunning = true;
        gameInterval = setInterval(gameLoop, 100);
      }
    }

    function confirmNewGame() {
      if (isGameRunning || pauseState) {
        const confirmReset = confirm('Do you want to start a new game?');
        if (confirmReset) {
          newGame();
        }
      } else {
        newGame();
      }
    }

    function newGame() {
      clearInterval(gameInterval);
      resetGame();
      isGameRunning = true;
      gameInterval = setInterval(gameLoop, 100);
    }

    function gameOver() {
      alert('Game Over! Your score: ' + score);
      resetGame();
      isGameRunning = false;
      clearInterval(gameInterval);
    }

    function updateScoreboard() {
      document.getElementById('scoreboard').innerText = 'Score: ' + score;
    }

    document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
      } else if (event.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
      } else if (event.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
      } else if (event.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
      }
    });