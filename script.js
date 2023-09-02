const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

function vector (length, x, y) {
    return {
        length,
        x,
        y
    }
}

const cable = {
    Radius: 350
}

const bucket = {
    height: 80,
    radiusDiff: 20,
    bottomRadius: 50,
    get topRadius() {
        return this.radiusDiff+this.bottomRadius
    },
    get L() {
        return Math.sqrt(this.radiusDiff**2 + this.height**2)
    }
}
let signal = 1;
let t = 0;
let dalpha = (Math.PI/180)*(t);

let alpha = Math.PI/2 - dalpha;

let betha = Math.atan(bucket.radiusDiff/bucket.height);

let arrowhead = 20;

const weight = vector(85,canvas.width/2 + (cable.Radius)*Math.cos(alpha),
                         canvas.height/2 + (cable.Radius)*Math.sin(alpha));
const weightRadial = vector(weight.length*Math.cos(dalpha), canvas.width/2 + (cable.Radius)*Math.cos(alpha),
                                                            canvas.height/2 + (cable.Radius)*Math.sin(alpha));
const centripetalForce = vector(120,canvas.width/2 + (cable.Radius - bucket.height-70)*Math.cos(alpha),
                       canvas.height/2 + (cable.Radius - bucket.height-70)*Math.sin(alpha));
// const centripetalForce = vector(null,null,null); //to use them later


function drawCable() {
    //------------cable-----------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height-70)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius - bucket.height-70)*Math.sin(alpha));
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
    ctx.closePath();

}

function drawBucket () {
    //-----------bucket's rim------------------------------
    ctx.beginPath();
    ctx.arc(canvas.width/2 + (cable.Radius - bucket.height)*Math.cos(alpha),
            canvas.height/2 + (cable.Radius - bucket.height)*Math.sin(alpha),
            70, Math.PI - dalpha, 2*Math.PI - dalpha);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'brown';
    ctx.stroke();
    ctx.closePath();

    //-----------bucket's left fill------------------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 + (cable.Radius)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius)*Math.sin(alpha))
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(Math.PI/2 + alpha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(Math.PI/2 + alpha));
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(Math.PI/2 + alpha)
                + (bucket.L-13)*Math.cos(-Math.PI/2 - dalpha - betha),
                canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(Math.PI/2 + alpha)
                + (bucket.L-13)*Math.sin(-Math.PI/2 - dalpha - betha));
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height+13)*Math.cos(alpha),
                canvas.height/2 + (cable.Radius - bucket.height+13)*Math.sin(alpha));
    ctx.fillStyle = 'aqua';
    ctx.fill();
    ctx.closePath();

    //-----------bucket's right fill------------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 + (cable.Radius)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius)*Math.sin(alpha))
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(-dalpha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(-dalpha));
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(-dalpha) 
             + (bucket.L-13)*Math.cos(-Math.PI/2 - dalpha + betha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(-dalpha)
             + (bucket.L-13)*Math.sin(-Math.PI/2 - dalpha + betha));
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height+13)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius - bucket.height+13)*Math.sin(alpha));
    ctx.fillStyle = 'aqua';
    ctx.fill();
    ctx.closePath();
    //-----------bucket's left size------------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 + (cable.Radius)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius)*Math.sin(alpha))
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(Math.PI/2 + alpha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(Math.PI/2 + alpha));
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(Math.PI/2 + alpha)
                + bucket.L*Math.cos(-Math.PI/2 - dalpha - betha),
                canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(Math.PI/2 + alpha)
                + bucket.L*Math.sin(-Math.PI/2 - dalpha - betha));
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height)*Math.cos(alpha),
                canvas.height/2 + (cable.Radius - bucket.height)*Math.sin(alpha));
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

    //-----------bucket's right size------------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 + (cable.Radius)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius)*Math.sin(alpha))
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(-dalpha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(-dalpha));
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(-dalpha) 
             + bucket.L*Math.cos(-Math.PI/2 - dalpha + betha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(-dalpha)
             + bucket.L*Math.sin(-Math.PI/2 - dalpha + betha));
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius - bucket.height)*Math.sin(alpha));
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
}

function drawVectors() {
    //---------weight vector----------
    weight.x = canvas.width/2 + (cable.Radius)*Math.cos(alpha); // to update position
    weight.y = canvas.height/2 + (cable.Radius)*Math.sin(alpha);
    ctx.beginPath();
    ctx.moveTo(weight.x, weight.y);
    ctx.lineTo(weight.x, weight.y + weight.length);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //----weight vector's arrowhead---
    ctx.beginPath();
    ctx.moveTo(weight.x, weight.y + weight.length);
    ctx.lineTo(weight.x + arrowhead*Math.cos(-Math.PI/2 - Math.PI/6),
               weight.y + weight.length + arrowhead*Math.sin(-Math.PI/2 - Math.PI/6));
    ctx.lineTo(weight.x, weight.y + weight.length);
    ctx.lineTo(weight.x + arrowhead*Math.cos(-Math.PI/2 + Math.PI/6),
               weight.y + weight.length + arrowhead*Math.sin(-Math.PI/2 + Math.PI/6));
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //-------centripetalForce vector---------
    // - bucket.height-70
    centripetalForce.x = canvas.width/2 + (cable.Radius)*Math.cos(alpha); // to update position
    centripetalForce.y = canvas.height/2 + (cable.Radius)*Math.sin(alpha);
    ctx.beginPath();
    ctx.moveTo(centripetalForce.x, centripetalForce.y);
    ctx.lineTo(centripetalForce.x + centripetalForce.length*Math.cos(-Math.PI + alpha),
               centripetalForce.y + centripetalForce.length*Math.sin(-Math.PI + alpha));
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //--centripetalForce vector's arrowhead---
    ctx.beginPath();
    ctx.moveTo(centripetalForce.x + centripetalForce.length*Math.cos(-Math.PI + alpha),
               centripetalForce.y + centripetalForce.length*Math.sin(-Math.PI + alpha));
    ctx.lineTo(centripetalForce.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + arrowhead*Math.cos(alpha-Math.PI/6),
               centripetalForce.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + arrowhead*Math.sin(alpha-Math.PI/6));
    ctx.lineTo(centripetalForce.x + centripetalForce.length*Math.cos(-Math.PI + alpha),
               centripetalForce.y + centripetalForce.length*Math.sin(-Math.PI + alpha));
    ctx.lineTo(centripetalForce.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + arrowhead*Math.cos(alpha+Math.PI/6),
               centripetalForce.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + arrowhead*Math.sin(alpha+Math.PI/6));
    ctx.strokeStyle = 'purple';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //-----weight vector's radial component---
    weightRadial.x = canvas.width/2 + (cable.Radius)*Math.cos(alpha);
    weightRadial.y = canvas.height/2 + (cable.Radius)*Math.sin(alpha);
    weightRadial.length = weight.length*Math.cos(dalpha);

    ctx.beginPath();
    ctx.moveTo(weightRadial.x, weightRadial.y);
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha),
               weightRadial.y + weightRadial.length*Math.sin(alpha));
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //-----weight vector's radial component's arrowhead---
    const tolerance = 1e-10; // A small value to consider as close to zero
    if (Math.abs(Math.sin(alpha)) < tolerance) { signal *= -1}

    ctx.beginPath();
    ctx.moveTo(weightRadial.x + weightRadial.length*Math.cos(alpha),
               weightRadial.y + weightRadial.length*Math.sin(alpha));
    if (signal>0) {
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha) +
               arrowhead*Math.cos(-Math.PI/2 + Math.PI/6 - dalpha),
               weightRadial.y + weightRadial.length*Math.sin(alpha) +
               arrowhead*Math.sin(-Math.PI/2 + Math.PI/6 - dalpha));
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha),
               weightRadial.y + weightRadial.length*Math.sin(alpha));
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha) +
               arrowhead*Math.cos(-Math.PI/2-dalpha-Math.PI/6),
               weightRadial.y + weightRadial.length*Math.sin(alpha) + 
               arrowhead*Math.sin(-Math.PI/2-dalpha-Math.PI/6));
    } else {
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha) +
               arrowhead*Math.cos(-Math.PI/6 - dalpha + Math.PI/2),
               weightRadial.y + weightRadial.length*Math.sin(alpha) +
               arrowhead*Math.sin(-Math.PI/6 - dalpha +  Math.PI/2));
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha),
               weightRadial.y + weightRadial.length*Math.sin(alpha));
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha) +
               arrowhead*Math.cos(alpha+Math.PI/6),
               weightRadial.y + weightRadial.length*Math.sin(alpha) + 
               arrowhead*Math.sin(alpha+Math.PI/6));  
    }

    ctx.strokeStyle = 'green';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //---tension force-----
    ctx.beginPath();
    ctx.moveTo(weightRadial.x, weightRadial.y);
    ctx.lineTo(weightRadial.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + weightRadial.length*Math.cos(alpha),
               weightRadial.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + weightRadial.length*Math.sin(alpha));
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //--tension force vector's arrowhead---
    ctx.beginPath();
    ctx.moveTo(weightRadial.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + weightRadial.length*Math.cos(alpha),
               weightRadial.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + weightRadial.length*Math.sin(alpha));
    ctx.lineTo(weightRadial.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + weightRadial.length*Math.cos(alpha) +
               arrowhead*Math.cos(alpha-Math.PI/6),
               weightRadial.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + weightRadial.length*Math.sin(alpha) +
               arrowhead*Math.sin(alpha-Math.PI/6));
    ctx.lineTo(weightRadial.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + weightRadial.length*Math.cos(alpha),
               weightRadial.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + weightRadial.length*Math.sin(alpha));
    ctx.lineTo(weightRadial.x + centripetalForce.length*Math.cos(-Math.PI + alpha) + weightRadial.length*Math.cos(alpha) + 
               arrowhead*Math.cos(alpha+Math.PI/6),
               weightRadial.y + centripetalForce.length*Math.sin(-Math.PI + alpha) + weightRadial.length*Math.sin(alpha) +
               arrowhead*Math.sin(alpha+Math.PI/6));
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //--dashed line---
    ctx.beginPath();
    ctx.setLineDash([10, 5]);
    ctx.moveTo(weight.x, weight.y + weight.length);
    ctx.lineTo(weightRadial.x + weightRadial.length*Math.cos(alpha),
               weightRadial.y + weightRadial.length*Math.sin(alpha));
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    
}

function legendas() {
    //legendas
    ctx.fillStyle = 'black';
    ctx.font = "24px serif";
    ctx.fillText(": Força peso", 40, 30);
    ctx.fillText(": Força centrípeta", 40, 55);
    ctx.fillText(": Componente radial da força peso", 40, 80);
    ctx.fillText(": Tensão da corda", 40, 110);

    ctx.fillStyle = 'purple';
    ctx.fillText("Fc          ", 40, 140);
    ctx.fillStyle = 'black';
    ctx.fillText("     =          ", 40, 140);
    ctx.fillStyle = 'green';
    ctx.fillText("         Pr      ", 40, 140);
    ctx.fillStyle = 'black';
    ctx.fillText("              +    ", 40, 140);
    ctx.fillStyle = 'red';
    ctx.fillText("                  T", 40, 140);
    // θ
    ctx.fillStyle = 'black';
    let dy = 550;
    ctx.fillText("m: massa",20, 170 + dy);
    ctx.fillText("v: velocidade",20, 200 + dy);
    ctx.fillText("R: raio da trajetória",20, 230 + dy);
    ctx.fillText("g: aceleração da gravidade",20, 260 + dy);
    ctx.fillText("θ: menor angulo entre T e P",20, 290 + dy);

    ctx.fillText("Fc = mv²/R", 40, 170);
    ctx.fillText("Pr = mgcosθ", 40, 190);

    //vetores
    ctx.font = "25px Arial";
    ctx.fillStyle = 'blue';
    ctx.fillText("→", 10, 15);
    ctx.fillText("P", 10, 30);

    ctx.fillStyle = 'green';
    ctx.fillText("→", 10, 70);
    ctx.fillText("Pr", 10, 83);

    ctx.fillStyle = 'purple';
    ctx.fillText("→", 10, 41);
    ctx.fillText("Fc", 10, 55);

    ctx.fillStyle = 'red';
    ctx.fillText("→", 10, 97);
    ctx.fillText("T", 10, 113);
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    t += 1;
    dalpha = (Math.PI/180)*(t);
    alpha = Math.PI/2 - dalpha;

    ctx.setLineDash([]);
    drawCable();
    drawBucket();
    drawVectors();
    legendas();
    
    requestAnimationFrame(drawAll);
}

drawAll();