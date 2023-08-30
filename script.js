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
const tension = vector(100,canvas.width/2 + (cable.Radius - bucket.height-70)*Math.cos(alpha),
                       canvas.height/2 + (cable.Radius - bucket.height-70)*Math.sin(alpha));
const centripetalForce = vector(null,null,null); //to use them later


function drawCable() {
    //------------cable-----------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height-70)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius - bucket.height-70)*Math.sin(alpha));
    ctx.lineWidth = 4;
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

    //-------tension vector---------
    tension.x = canvas.width/2 + (cable.Radius - bucket.height-70)*Math.cos(alpha); // to update position
    tension.y = canvas.height/2 + (cable.Radius - bucket.height-70)*Math.sin(alpha);
    ctx.beginPath();
    ctx.moveTo(tension.x, tension.y);
    ctx.lineTo(tension.x + tension.length*Math.cos(-Math.PI + alpha),
               tension.y + tension.length*Math.sin(-Math.PI + alpha));
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

    //--tension vector's arrowhead---
    ctx.beginPath();
    ctx.moveTo(tension.x + tension.length*Math.cos(-Math.PI + alpha),
               tension.y + tension.length*Math.sin(-Math.PI + alpha));
    ctx.lineTo(tension.x + tension.length*Math.cos(-Math.PI + alpha) + arrowhead*Math.cos(alpha-Math.PI/6),
               tension.y + tension.length*Math.sin(-Math.PI + alpha) + arrowhead*Math.sin(alpha-Math.PI/6));
    ctx.lineTo(tension.x + tension.length*Math.cos(-Math.PI + alpha),
               tension.y + tension.length*Math.sin(-Math.PI + alpha));
    ctx.lineTo(tension.x + tension.length*Math.cos(-Math.PI + alpha) + arrowhead*Math.cos(alpha+Math.PI/6),
               tension.y + tension.length*Math.sin(-Math.PI + alpha) + arrowhead*Math.sin(alpha+Math.PI/6));
    ctx.strokeStyle = 'blue';
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
    
}

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    t += 1;
    dalpha = (Math.PI/180)*(t);
    alpha = Math.PI/2 - dalpha;

    drawCable();
    drawBucket();
    drawVectors();
    
    // if(alpha>-Math.PI/2){requestAnimationFrame(drawAll);}
    requestAnimationFrame(drawAll);
}

drawAll();