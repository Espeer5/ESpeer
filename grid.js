let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
let cellSize = 6;
let numRows, numCols;
let grid, nextGrid;
let cellColors;

// Color scheme
const aliveColors = [
    '#F8F8F82F', // FrostT
    '#F8F8F82F',
    '#C8C8C82F', // Stardust
    '#C8C8C82F'
]; // Array of different colors for live cells

// Initial setup
setupGame();

// Resize canvas and game grid when window size changes
window.addEventListener('resize', handleResize);

// Setup game grid and start animation
function setupGame() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.2; // Top 20% of the window

  numRows = Math.floor(canvas.height / cellSize);
  numCols = Math.floor(canvas.width / cellSize);

  grid = createRandomGrid(numRows, numCols);
  nextGrid = createEmptyGrid(numRows, numCols);
  cellColors = initializeCellColors(grid);

  requestAnimationFrame(gameLoop);
}

// Resize canvas and update game grid accordingly
function handleResize() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setupGame();
}

// Game loop
function gameLoop() {
  updateGrid();
  drawGrid();
  requestAnimationFrame(gameLoop);
}

// Create a random grid
function createRandomGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = Math.random() > 0.5 ? 1 : 0;
    }
  }
  return grid;
}

// Create an empty grid
function createEmptyGrid(rows, cols) {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
}

// Initialize cell colors based on the initial grid
function initializeCellColors(initialGrid) {
  const colors = [];
  for (let i = 0; i < numRows; i++) {
    colors[i] = [];
    for (let j = 0; j < numCols; j++) {
      if (initialGrid[i][j] === 1) {
        colors[i][j] = aliveColors[Math.floor(Math.random() * aliveColors.length)];
      } else {
        colors[i][j] = '';
      }
    }
  }
  return colors;
}

// Update the game grid
function updateGrid() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const numNeighbors = countNeighbors(i, j);
      if (grid[i][j] === 1) {
        if (numNeighbors < 2 || numNeighbors > 3) {
          nextGrid[i][j] = 0;
          cellColors[i][j] = '';
        } else {
          nextGrid[i][j] = 1;
        }
      } else {
        if (numNeighbors === 3) {
          nextGrid[i][j] = 1;
          cellColors[i][j] = aliveColors[Math.floor(Math.random() * aliveColors.length)];
        }
      }
    }
  }

  // Copy the nextGrid to grid
  grid = JSON.parse(JSON.stringify(nextGrid));
}

// Count the number of neighbors for a given cell
function countNeighbors(row, col) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue; // Skip the current cell

      const newRow = (row + i + numRows) % numRows;
      const newCol = (col + j + numCols) % numCols;

      count += grid[newRow][newCol];
    }
  }

  return count;
}

// Draw the game grid
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      if (grid[i][j] === 1) {
        const color = cellColors[i][j];
        ctx.fillStyle = color;
        ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }
    }
  }
}