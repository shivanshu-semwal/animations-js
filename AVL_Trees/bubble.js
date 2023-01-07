class Bubble{
    constructor(x=0,y=0,data,r=30){
        this.x = x;
        this.y = y;
        this.r = r;
        this.data = data;
        this.lchild = null;
        this.rchild = null;
        this.height = 0;
    }
    
    //draw the node
    draw(){
        if(this.lchild){
            stroke(0);
            line(this.x, this.y, this.lchild.x, this.lchild.y);
        }
        if(this.rchild){
            stroke(0);
            line(this.x, this.y, this.rchild.x, this.rchild.y);
        }
        stroke(2);
        fill(255);
        circle(this.x, this.y, this.r);
        fill(0);
        textSize(15);
        text(this.data, this.x-8, this.y+5);
    }

  }

// AVL tree implementation
class BST{
    constructor(root=null){
        this.root = root;
    }

    insert(val){
        let n = new Bubble(0,0,val);
        this.root = this.insertNode(this.root, n);
    }

    balanceFactor(root){
        if(root === null) return 0;

        let l = (root.lchild === null) ? 0 : root.lchild.height+1;
        let r = (root.rchild === null) ? 0 : root.rchild.height+1;
        
        return l-r;
    }

    height(root){
        if(root === null) return 0;
        return root.height;
    }

    LLRotation(root){
        let pl = root.lchild;
        root.lchild = pl.rchild;
        pl.rchild = root;
        // Update heights;
        root.height = max(this.height(root.lchild), this.height(root.rchild)) + 1;
        pl.height = max(this.height(pl.lchild), this.height(pl.rchild)) + 1;
        return pl;
    }

    RRRotation(root){
        let pr = root.rchild;
        root.rchild = pr.lchild;
        pr.lchild = root;
        // Update heights;
        root.height = max(this.height(root.lchild), this.height(root.rchild)) + 1;
        pr.height = max(this.height(pr.lchild), this.height(pr.rchild)) + 1;
        return pr;
    }

    LRRotation(root){
        let pl = root.lchild;
        let plr = pl.rchild;
        pl.rchild = plr.lchild;
        root.lchild = plr.rchild;
        plr.lchild = pl;
        plr.rchild = root;
        root.height = max(this.height(root.lchild), this.height(root.rchild)) + 1;
        pl.height = max(this.height(pl.lchild), this.height(pl.rchild)) + 1;
        plr.height = max(this.height(plr.lchild), this.height(plr.rchild)) + 1;
        return plr;
    }

    RLRotation(root){
        let pr = root.rchild;
        let prl = pr.lchild;
        pr.lchild = prl.rchild;
        root.rchild = prl.lchild;

        prl.rchild = pr;
        prl.lchild = root;
        root.height = max(this.height(root.lchild), this.height(root.rchild)) + 1;
        pr.height = max(this.height(pr.lchild), this.height(pr.rchild)) + 1;
        prl.height = max(this.height(prl.lchild), this.height(prl.rchild)) + 1;
        return prl;
    }

    insertNode(root, node){
        if(root === null){
            return node;
        }
      
        if(node.data < root.data){
            root.lchild = this.insertNode(root.lchild, node);
        }else if(node.data > root.data){
            root.rchild = this.insertNode(root.rchild, node);
        }else{
            return root;
        }
        
        root.height = max(this.height(root.lchild), this.height(root.rchild)) + 1;
        // console.log("bal factor: ", root.data, this.balanceFactor(root));
        if(this.balanceFactor(root) == 2){
            if(this.balanceFactor(root.lchild) == 1){
                // LL rotation
         
                root = this.LLRotation(root);
            }else if(this.balanceFactor(root.lchild) == -1){
                // LR Rotation
                root = this.LRRotation(root);
            }
        }else if(this.balanceFactor(root) == -2){
            if(this.balanceFactor(root.rchild) == -1){
                // RR rotation
                root = this.RRRotation(root);
            }else if(this.balanceFactor(root.rchild) == 1){
                // RL Rotation
                root = this.RLRotation(root);
            }
        }
        return root;
    }
}
