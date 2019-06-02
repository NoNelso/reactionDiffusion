var grid;
var next;

var da = 1;
var db = 0.5;
var feed = 0.055;
var k = 0.062;

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
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      var c = grid[x][y].c;
      next[x][y].a = a + da * lapla(x, y) - a * b * b + feed * (1 - a);
      next[x][y].b = a + db * laplb(x, y) - a * b * b - (k + feed) * b;
      next[x][y].c = c + random(-1, 1);
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
  swap();
}

function swap() {
  var holder = grid;
  grid = next;
  next = holder;
}

function lapla(x, y) {
  //do the thing
}

function laplb(x, y) {
  //do the other thing
}