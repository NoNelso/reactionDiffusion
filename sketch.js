var grid;
var next;

function setup() {
  createCanvas(400, 300);
  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        a: 0,
        b: 1,
        c: 3
      };
      next[x][y] = {
        a: 0,
        b: 0,
        c: 0
      };
    }
  }
}

function draw() {
  background(0);
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      next[x][y].a = grid[x][y].a
      next[x][y].b = grid[x][y].b
      next[x][y].c = grid[x][y].c
    }
  }
  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var pix = (x + y * width) * 4;
      pixels[pix + 0] = grid[x][y].a * 255;
      pixels[pix + 1] = grid[x][y].b * 255;
      pixels[pix + 2] = grid[x][y].c * 255;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

function swap() {
  var holder = grid;
  grid = next;
  next = holder;
}