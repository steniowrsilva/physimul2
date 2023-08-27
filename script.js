const canvas = document.querySelector('.canvas');
ctx = canvas.getContext('2d');



const cable = {
    Radius: 350
}

function vector () {
    return {
        
    }
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

let dalpha = (Math.PI/180)*0;

let alpha = Math.PI/2 - dalpha;

let betha = Math.atan(bucket.radiusDiff/bucket.height)


function drawBucket () {
    //------------cable-----------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, canvas.height/2);
    ctx.lineTo(canvas.width/2 + (cable.Radius - bucket.height)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius - bucket.height)*Math.sin(alpha));
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'orange';
    ctx.stroke();
    ctx.closePath();

    //-----------bucket------------------
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 + (cable.Radius)*Math.cos(alpha),
               canvas.height/2 + (cable.Radius)*Math.sin(alpha))
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(Math.PI/2 + alpha),
               canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(Math.PI/2 + alpha));
               // (bucket.height/Math.cos(betha))
    ctx.lineTo(canvas.width/2 + cable.Radius*Math.cos(alpha) + bucket.bottomRadius*Math.cos(Math.PI/2 + alpha)
                + bucket.L*Math.cos(-Math.PI/2 - dalpha - betha),
                canvas.height/2 + cable.Radius*Math.sin(alpha) + bucket.bottomRadius*Math.sin(Math.PI/2 + alpha)
               + bucket.L*Math.sin(-Math.PI/2 - dalpha - betha));
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();

}

function drawAll() {
    drawBucket();
}

drawAll();