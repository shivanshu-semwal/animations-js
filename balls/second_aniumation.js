var canvas = document.querySelector('canvas');
canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;

c = canvas.getContext("2d");

// var x = Math.random() * window.innerWidth;
// var y = Math.random() * window.innerHeight;
var x = 100
var y = 100
var dx = 4;
var dy = 4;
var radius  = 30;
c.strokeStyle = 'blue';
c.beginPath();
c.arc(100,100,20,0,3.141,false);
c.stroke();
function animate(){
    requestAnimationFrame(animate);
    c.strokeStyle = 'blue';
    c.clearRect(0,0,window.innerWidth, window.innerHeight);
    c.beginPath();
    c.arc(x,y,radius, 0, Math.PI * 2, false);
    c.stroke();
    if(x+radius > window.innerWidth || x- radius <0){
        dx = - dx;
    }
    if(y + radius > window.innerHeight || y-radius<0){
        dy = -dy;
    }
    x += dx;
    y += dy;
}
animate()