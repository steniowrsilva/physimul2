const canvas = document.querySelector('.canvas');
ctx = canvas.getContext('2d');

let dalpha = (Math.PI/180)*0;

let alpha = Math.PI/2 - dalpha;
let theta = Math.PI/2 - alpha;

const cable = {
    Radius: 300
}

const bucket = {
    x: 400,
    y: 400,
    height: 100,
    radiusDiff: 20,
    bottomRadius: 50,
    topRadius: this.radiusDiff+this.bottomRadius,
}

function drawBucket () {

    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha),
               canvas.height/2 + cable.Radius*Math.sin(alpha));
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) - bucket.bottomRadius*Math.cos(theta),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(theta));
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();

}

function drawAll() {
    drawBucket();
}

drawAll();