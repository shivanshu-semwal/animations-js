var canvas = document.querySelector('canvas');
canvas.width =  window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas)
var c= canvas.getContext("2d");
var i=0;
c.clearRect(0,0,window.innerWidth,window.innerHeight)
for(i=0;i<100;i++){
    var x1 = Math.ceil(Math.random()*1000)
    var y1 = Math.ceil(Math.random()*1000)
    var a = Math.ceil(Math.random(255))
    c.fillStyle = 'rgba(a,0,0,0.1)'
    c.fillRect(x1,y1,10,10)
}

// c.fillRect(10,100,100,100)
