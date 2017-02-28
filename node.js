function Node(x, y) {
    this.f = 0;
    this.h = 0;
    this.g = 0;
    this.x = x;
    this.y = y;
    this.wall = false;
    this.opponent = false;

    if (random(1) < wallRate) {
        this.wall = true;
    }

    if (!this.wall) {
        if (random(1) < opponentRate) {
            this.opponent = true;
        }
    }
    this.neighbours = [];
    this.show = function (col) {
        fill(col);
        if (this.wall) {
            fill(0);
        }

        if (this.opponent) {
            this.y -= speed;
            this.x += speed;
            fill(color(236, 156, 16));

            rect(this.x * w, this.y * h, w - 1, h - 1);

            if(this.y < 0){
                this.y = cols;
            }
            else if(this.y > cols){
                this.y = 0;
            }
            if(this.x < 0){
                this.x = rows;
            }else if(this.x > rows){
                this.x = 0;
            }

        }

        if (!this.opponent && this.wall) {
            fill(0);
        }
        noStroke();
        rect(this.x * w, this.y * h, w - 1, h - 1);
    }

    this.addneighbours = function (grid) {
        var x = this.x;
        var y = this.y;

        if (x < cols - 1) {
            this.neighbours.push(grid[x + 1][y]);
        }
        if (x > 0) {
            this.neighbours.push(grid[x - 1][y]);
        }
        if (y < rows - 1) {
            this.neighbours.push(grid[x][y + 1]);
        }
        if (y > 0) {
            this.neighbours.push(grid[x][y - 1]);
        }

        if (x > 0 && y > 0) {
            this.neighbours.push(grid[x - 1][y - 1]);
        }
        if (x > cols && y > 0) {
            this.neighbours.push(grid[x + 1][y - 1]);
        }
        if (x > 0 && y > rows - 1) {
            this.neighbours.push(grid[x - 1][y + 1]);
        }
        if (x < cols - 1 && y < rows - 1) {
            this.neighbours.push(grid[x + 1][y + 1]);
        }
    }
}