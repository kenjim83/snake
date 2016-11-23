var dot = document.getElementById('dot');
var UNIT_OF_MOVE = 20;
var SPEED = 100 // ms to update
var FOOD_FREQUENCY = 3000; // per unit of speed
var TIMER = 0;

var app = {};

var pxToInt = function(px){
    return parseInt(px.replace('px',''));
}
var getScreenDims = function(){
    return [ Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        Math.max(document.documentElement.clientHeight, window.innerHeight || 0)];
}

app.init = function(){
    // create snake
    var snake = new Snake();
    app.bindKeys(snake);
    // start game
    setInterval(function(){
        TIMER += SPEED;
        // document.getElementById('timer').innerHTML = TIMER;
        if(snake.alive){
            switch(snake.dir){
                case 'left':
                    snake.moveLeft();
                    break;
                case 'right':
                    snake.moveRight();
                    break;
                case 'up':
                    snake.moveUp();
                    break;
                case 'down':
                    snake.moveDown();
                    break;
            }
        }
        if(TIMER % FOOD_FREQUENCY === 0){
            Food.populateRandom();
        }
    }, SPEED);
};

app.bindKeys = function(snake){
    document.onkeydown = checkKey;
    function checkKey(e) {
        e = e || window.event;
        if(!snake.alive){
            snake.alive = true;
        }
        if (e.keyCode == '38') {
            console.log('up');
            snake.dir = 'up';
        }
        else if (e.keyCode == '40') {
            console.log('down arrow');
            snake.dir = 'down';

        }
        else if (e.keyCode == '37') {
            console.log('left arrow');
            snake.dir = 'left';
        }
        else if (e.keyCode == '39') {
            console.log('right arrow');
            snake.dir = 'right';
        }

    }
}

var Snake = function(){

    this.alive = false;
    this.x = getScreenDims()[0]/2;
    this.y = getScreenDims()[1]/2;
    this.dir = 'right'; // up,down,left,right
    var div = document.createElement('div');
    div.id = 'dot';
    div.style.left = this.x + 'px';
    div.style.top = this.y + 'px';
    document.body.appendChild(div);
    this.node = div;
    this.body = [];
}

Snake.prototype.moveUp = function(){
    this.node.style.top = pxToInt(this.node.style.top || '0') - UNIT_OF_MOVE + 'px';
};
Snake.prototype.moveDown = function(){
    this.node.style.top = pxToInt(this.node.style.top || '0') + UNIT_OF_MOVE + 'px';
}
Snake.prototype.moveLeft = function(){
    this.node.style.left = pxToInt(this.node.style.left || '0') - UNIT_OF_MOVE + 'px';
}
Snake.prototype.moveRight = function(){
    this.node.style.left = pxToInt(this.node.style.left || '0') + UNIT_OF_MOVE + 'px';
}

var Food = function(x,y){
    this.x = x;
    this.y = y;
    var div = document.createElement('div');
    div.className = 'food';
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    document.body.appendChild(div);
}

Food.populateRandom = function(){
    var dims = getScreenDims();
    var randX = Math.floor(Math.random() * dims[0]);
    var randY = Math.floor(Math.random() * dims[1]);
    return new Food(randX, randY);
}

app.init();
