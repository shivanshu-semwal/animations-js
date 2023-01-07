var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c = canvas.getContext("2d");

var colorArray = [
    "#F205CB",
    "#7C05F2",
    "#6204BF",
    "#050259",
    "#F23827"
]
var circleArray = []
var maxRadius = 70;
var mouse = {
    x: undefined,
    y: undefined
}
function init(){
    circleArray = []
    for (var i = 0; i < 500; i++) {
        var radius = Math.random() * 10 + 2;
        var x = Math.random() * (window.innerWidth - 2 * radius) + radius;
        var y = Math.random() * (window.innerHeight - 2 * radius) + radius;
        var dx = Math.random() * 4 -2;
        var dy = Math.random() * 4 -2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.radius = radius;
    this.minRadius = radius
    this.draw = function () { 
        c.strokeStyle = this.color;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.stroke();
        c.fill();
    }
    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 50 && mouse.x-this.x>-50 && mouse.y - this.y < 50 && mouse.y - this.y >-50 && this.radius < maxRadius){
            this.radius +=1;
        }
        else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}
init();
animate();