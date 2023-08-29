const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


function vector (length, x, y) {
    return {
        length,
        x,
        y
    }
}

const weight = vector(null,null,null);
const weightX = vector(null,null,null);
const weightY = vector(null,null,null);
const tension = vector(null,null,null);
const centripetalForce = vector(null,null,null); //to use them later

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
    //get betha() {Math.atan(this.radiusDiff/this.height)},
    get L() {
        return Math.sqrt(this.radiusDiff**2 + this.height**2)
    }
}
let t = 0;
let dalpha = (Math.PI/180)*(t);

let alpha = Math.PI/2 - dalpha;

let betha = Math.atan(bucket.radiusDiff/bucket.height)

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

function drawAll() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    t += 1;
    dalpha = (Math.PI/180)*(t);
    alpha = Math.PI/2 - dalpha;

    drawCable();
    drawBucket();
    
    requestAnimationFrame(drawAll);
}

drawAll();