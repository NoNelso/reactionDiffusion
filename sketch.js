let grid;
let next;

function setup() {
  createCanvas(400, 400);
  grid = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[y] = {
        a: 0,
        b: 0
      };
      next[y] = {
        a: 0,
        b: 0
      };
    }
  }
}

function draw() {

}