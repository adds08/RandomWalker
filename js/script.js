var isRunning = false;
var graphControl;
var graphControl_Speed = 200;


/** @type {HTMLCanvasElement} */
const rootCanvas = document.getElementById('screen');
const distance = document.querySelector('.distance');
const warnings = document.getElementById('warnings');

var slider = document.getElementById("speed-slider");
var output = document.getElementById("speed");

output.innerText = slider.value;

// Update the current slider value (each time you drag the slider handaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasle)
slider.oninput = function () {
    graphControl_Speed = this.value * 10;
    output.innerHTML = this.value -6;
}

var ctx = rootCanvas.getContext('2d');

ctx.translate(
    rootCanvas.width * 0.5,
    rootCanvas.height * 0.5,
)
let walker = {
    posx: 0,
    posy: 0,
    draw: function (context) {
        context.beginPath();
        context.arc(this.posx, this.posy, 10, 0, Math.PI * 2, false);

        context.fillStyle = "red";
        context.fill();
        context.stroke();
    },
    walk: function () {
        this.posx += setDirection() * 3;
        this.posy += setDirection() * 3;
    }
};


let line = {
    eposx: 0,
    eposy: 0,
    getDistance: function () {
        return Math.sqrt(this.eposx * this.eposx + this.eposy * this.eposx);
    },
    draw: function (context, walkX, walkY) {
        this.eposx = walkX;
        this.eposy = walkY;
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(walkX, walkY);
        context.strokeStyle = "green";
        context.stroke();
    }
};

function drawGraph() {
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(-rootCanvas.width, 0);
    ctx.lineTo(rootCanvas.width, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -rootCanvas.height);
    ctx.lineTo(0, rootCanvas.height);
    ctx.stroke();
}

function setDirection() {
    return (Math.round(Math.random()) == 0) ? -1 : 1;
}

function start() {
    drawGraph();
    walker.walk();
    walker.draw(ctx);
    line.draw(ctx, walker.posx, walker.posy);
    distance.innerText = (line.getDistance()).toFixed(2);
}

function clear() {
    // Store the current transformation matrix
    ctx.save();
    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, rootCanvas.width, rootCanvas.height);
    // Restore the transform
    ctx.restore();
}

function onClickEvent(isRun) {
    if (isRun) {
        if (!isRunning) {
            graphControl = setInterval(() => {
                clear();
                start();
            }, graphControl_Speed);            
            isRunning = true;
            warnings.style.color = 'Green';
            warnings.innerText = "Started :)";
        } else {
            warnings.style.color = 'brown';
            warnings.innerText = "Already walking !!!";
        }
    } else {
        if (isRunning) {
            clearInterval(graphControl);
            isRunning = false;
            warnings.style.color = 'red';
            warnings.innerText = "Stopped :(";
        } else {
            warnings.style.color = 'blue';
            warnings.innerText = "Nothing Running Anyway ?o.o?";
        }
    }

}