var cols = 50;
var rows = 50;
var grid = new Array(cols);
var openSet = []
var closedSet = []
var start;
var end;
var endChange = 0;
var w,h;
var path = [];
this.previous = undefined;
this.init = true;
this.changeCounter = 0;
this.done = false;
this.start = false;
this.image = null
this.speed = 1;
this.wallRate = 0.2;
this.opponentRate = 0.05;