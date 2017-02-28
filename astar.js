function setup() {
    createCanvas(400, 400)
    initSystem(init);
    init = false;
}

function initSystem(initSystem) {
    w = width / cols;
    h = height / rows;

    if (initSystem == true) {
        for (var i = 0; i < cols; i++) {
            grid[i] = new Array(rows);
        }
        for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
                grid[i][j] = new Node(i, j);
            }
        }
    }

    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].addneighbours(grid);
        }
    }
    start = grid[0][0];
    end = grid[[Math.round((Math.random() * cols))]][[Math.round((Math.random() * cols))]];
    document.getElementById("displayCoords").innerHTML = "Current Target Axis: " + end.x + "," + end.y;
    updateTargetLabel();
    end.show(color(254, 52, 121));
    start.wall = false;
    end.wall = false;
    end.opponent = false;
    start.opponent = false;
    openSet.push(start);
}

function draw() {
    background(0);
    if (openSet.length > 0) {
        var winner = 0;
        for (var i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[winner].f) {
                winner = i;
            }
        }
        
        var current = openSet[winner];

        document.getElementById("changeTarget").addEventListener('click', function () {
            var x = Math.round((Math.random() * cols));
            var y = Math.round((Math.random() * cols));
            for(var i=0;i<closedSet.length;i++)
            {
                while(x == closedSet[i].x && y == closedSet[i].y){
                    x = Math.round((Math.random() * cols) + 1);
                    y = Math.round((Math.random() * cols) + 1);
                }
            }
            end = grid[x][y];

            document.getElementById("displayCoords").innerHTML = "Current Target Axis: " + end.x + "," + end.y;
            updateTargetLabel();
        });

        document.getElementById("stop").addEventListener("click", function () {
            noLoop();
        });

        document.getElementById("start").addEventListener("click", function () {
            loop();
            start = true;
        });

        document.getElementById("reset").addEventListener("click", function () {
            location.reload();
        });

        if (current === end) {
            document.getElementById("doneLbl").innerHTML = "Done!";
            noLoop();
            done = true;
        }

        removeFromArray(openSet, current);
        closedSet.push(current);
        var neighbours = current.neighbours;

        for (var i = 0; i < neighbours.length; i++) {
            var neighbour = neighbours[i];

            if (!closedSet.includes(neighbour) && !neighbour.wall && !neighbour.opponent) {
                var tempg = current.g + 1;
                var newPath = false;
                if (openSet.includes(neighbour)) {
                    if (tempg < neighbour.g) {
                        neighbour.g = tempg;
                        newPath = true;
                    }
                }
                else {
                    neighbour.g = tempg;
                    newPath = true;
                    openSet.push(neighbour);
                }

                if (newPath) {
                    neighbour.h = heuristic(neighbour, end);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = current;
                }
            }
        }

    } else {
        document.getElementById("doneLbl").innerHTML = "No Solution";
        noLoop();
        return;
    }
    drawGrid();
    path = [];
    var temp = current;
    path.push(temp);
    while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
    }
    for (var i = 0; i < path.length; i++) {
        if (i === 0) {
            path[i].show(color(0, 0, 255));
        }
        else {
            path[0].show(color(0, 0, 255));
            path[i].show(color(0, 0, 255));
            path[i - 1].show(color(178, 16, 238));
        }
    }
}

function drawGrid() {
    for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
            grid[i][j].show(color(255));
        }
    }

    for (var i = 0; i < closedSet.length; i++) {
        if (!closedSet[i].opponent) {
            closedSet[i].show(color(255, 0, 0))
        }
    }

    for (var i = 0; i < openSet.length; i++) {
        if (!openSet[i].opponent) {
            openSet[i].show(color(0, 255, 0))
        }
    }

    end.show(color(254, 52, 121));
}