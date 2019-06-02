//array vars
var grid;
var next;
//laplace vars dispersion a&b, feed rate, kill rate
var da = 1;
var db = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
  createCanvas(400, 300);
  //assign grid based on width of canvas
  grid = [];
  next = [];
  for (var x = 0; x < width; x++) {
    grid[x] = [];
    next[x] = [];
    //set background seed state
    for (var y = 0; y < height; y++) {
      grid[x][y] = {
        a: 1,
        b: 0,
        c: 0
      };
      next[x][y] = {
        a: 1,
        b: 0,
        c: 0
      };
    }
  }
  //set seed for starting dark space
  for (var i = (width / 2) - 5; i < (width / 2) + 5; i++) {
    for (var j = (height / 2) - 5; j < (height / 2) + 5; j++) {
      grid[i][j].b = 1;
    }
  }
}

function draw() {
  background(0);
  //for all pixels in grid, asign next pixels based on formula
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
  //show current pixels from grid
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
  //exchange grid array for next array
  swap();
}

function swap() {
  var holder = grid;
  grid = next;
  next = holder;
}

//laplace weighted equasion for a
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

//laplace weighted equasion for b
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