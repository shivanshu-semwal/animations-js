//Array to store the nodes of the tree
let arr = []

// root of the tree
let ix = 500
let iy = 100
let b, input, butt;
function setup() {
    let cnv = createCanvas(1000,600);
    cnv.mouseClicked(RaddToTree);
    cnv.position(windowWidth/8, windowHeight/4);
    background(240);
    
    let button = createButton("reset");
    button.mousePressed(reset);
    button.position(windowWidth/16, windowHeight/16);
    button.position(windowWidth/2-60, 60);
    button.size(100, 40);
    
    b = new BST();

    input = createInput();
    input.position(windowWidth/6, windowHeight/6);
    input.size(800, 30);
    butt = createButton('Build');
    butt.size(100, 35);
    butt.position(input.x + input.width, input.y);
    butt.mousePressed(addToTree);
  
}

function addToTree() {
    let inp = input.value();
    input.value("")
    let res = inp.split(" ");
    for(let i=0;i<res.length;i++){
        b.insert(int(res[i]));
        drawTree(b.root);
    }
}

function reset(){
    arr = [];
    b = new BST();
}

function draw() {
    background(240);
    preorder(b.root);
}

// Preorder Traversal to draw the tree
function preorder(root){
    if(root===null) return;
    root.draw();
    preorder(root.lchild);
    preorder(root.rchild);
}

function RaddToTree(){
    //Random click addition
    b.insert(int(random(10,99)));
    drawTree(b.root);
}

function height(root){
    if(root === null) return 0;
    return max(root.lchild, root.rchild)
}


// Just some measures to keep the nodes at regular distances
// which MISERABLY fails after level 5 -_-
let level = 0;
let myDegrees = 180-20;
let dis = 250

//orginal paramters
let oridis = 250
let degori = 180-20

// I should rename this function to Update tree
function drawTree(root){
    arr = []
    // Used a queue
    let q = [];
    root.x = ix;
    root.y = iy;
    q.push(root);
    q.push(null);

    while(q.length){
        let t = q.shift();

        if(t){
            arr.push(t);

            let v0 = p5.Vector.fromAngle(radians(myDegrees), dis);
            let v1 = p5.Vector.fromAngle(radians(180-myDegrees), dis);
            if(t.lchild){
                t.lchild.x = t.x + v0.x;
                t.lchild.y = t.y + v0.y;
                q.push(t.lchild);

            }
            if(t.rchild){
                t.rchild.x = t.x + v1.x;
                t.rchild.y = t.y + v1.y;
                q.push(t.rchild);
            }
            if(t.lchild && t.rchild){
                let d = dist(t.lchild.x, t.lchild.y, t.rchild.x, t.rchild.y);
                if(d < 50){
                    t.lchild.x -= 20;
                    t.rchild.x += 20;
                }
            }
        }else{
            if(q.length){
                q.push(null);
                myDegrees += (90-myDegrees)*0.35;
                if(dis > 60)
                    dis-= (dis)*0.30;
            }
        }
    }

    dis = oridis;
    myDegrees = degori;
}

function mouseDragged(){

}
