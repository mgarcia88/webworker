const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

/*ctx.globalCompositeOperation = 'xor';*/

ctx.fillStyle = 'green';
ctx.fillRect(10, 30, 250, 250);

ctx.fillStyle = 'purple';
ctx.fillRect(20,20,300,300);


ctx.font = '30px serif';
ctx.fillStyle = '#000';
ctx.fillText('Hello world', 50, 90);

ctx.strokeRect(250, 250, 200, 200);

ctx.fillStyle = 'red';
ctx.beginPath();
ctx.arc(375, 375, 50, 0, Math.PI * 2, true); // Outer circle
ctx.moveTo(310, 275);
ctx.arc(375, 375, 35, 0, Math.PI, false);  // Mouth (clockwise)
ctx.moveTo(365, 365);
ctx.arc(360, 365, 5, 0, Math.PI * 2, true);  // Left eye
ctx.moveTo(395, 365);
ctx.arc(390, 365, 5, 0, Math.PI * 2, true);  // Right eye
ctx.stroke();

/*ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(20, 20);
ctx.lineTo(400, 20);
ctx.stroke();

ctx.rotate(180);
ctx.fillStyle = 'red';
ctx.fillRect(200, 0, 200, 200);*/
