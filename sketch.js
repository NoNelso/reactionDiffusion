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
  for (var x = 1; x < width - 1; x++) {
    for (var y = 1; y < height - 1; y++) {
      var a = grid[x][y].a;
      var b = grid[x][y].b;
      var c = grid[x][y].c;
      next[x][y].a = a + da * lapla(x, y) - a * b * b + feed * (1 - a);
      next[x][y].b = a + db * laplb(x, y) - a * b * b - (k + feed) * b;
      next[x][y].c = c + random(-0.1, 0.1);
      if (next[x][y].c < 0) next[x][y].c += 0.1;
      if (next[x][y].c > 1) next[x][y].c -= 0.9;

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
      //ok cool
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
  var sum = 0;
  sum += grid[x - 1][y - 1].a * .20;
  sum += grid[x + 0][y - 1].a * .05;
  sum += grid[x + 1][y - 1].a * .20;
  sum += grid[x - 1][y + 0].a * .05;
  sum += grid[x + 0][y + 0].a * -1;
  sum += grid[x + 1][y + 0].a * .05;
  sum += grid[x - 1][y + 1].a * .20;
  sum += grid[x + 0][y + 1].a * .05;
  sum += grid[x + 1][y + 1].a * .20;
  return sum;

}

function laplb(x, y) {
  sum += grid[x - 1][y - 1].b * .20;
  sum += grid[x + 0][y - 1].b * .05;
  sum += grid[x + 1][y - 1].b * .20;
  sum += grid[x - 1][y + 0].b * .05;
  sum += grid[x + 0][y + 0].b * -1;
  sum += grid[x + 1][y + 0].b * .05;
  sum += grid[x - 1][y + 1].b * .20;
  sum += grid[x + 0][y + 1].b * .05;
  sum += grid[x + 1][y + 1].b * .20;
  return sum;
}