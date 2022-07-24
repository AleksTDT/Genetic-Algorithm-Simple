const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
setUpFont();


function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drowCity(name, x, y) {
    typeText(name,x - 15, y - 15);
    drowCircle(x, y);
}

function typeText(text, x, y) {
    ctx.fillText(text, x, y);
}

function setUpFont() {
    ctx.font = '18px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
}

function drowCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, 2 * Math.PI, false); // full circle
    ctx.fill();
}

function drowLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}