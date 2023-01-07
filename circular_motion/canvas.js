var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

c = canvas.getContext("2d");

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};
var colorArray = [
    "#F205CB",
    "#7C05F2",
    "#6204BF",
    "#050259",
    "#F23827"
];

addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

let particles;

function randColor() {
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function intBetween(start, end) {
    return Math.floor(Math.random() * (end - start + 1) + start);
}

function init() {
    particles = [];
    for (var i = 0; i < 100; i++) {
        const radius = (Math.random() * 3) + 2;
        particles.push(new Patricle(canvas.width / 2, canvas.height / 2, radius, randColor()))
    }
}

function Patricle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = intBetween(100, 500);
    this.lastMouse = {
        x: x,
        y: y
    };
    this.update = () => {
        const lastPoint = {
            x: this.x,
            y: this.y
        };
        this.radians += this.velocity;

        this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw(lastPoint);
    }

    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        c.stroke();
        c.closePath();
    };
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
    });
}
init();
animate();