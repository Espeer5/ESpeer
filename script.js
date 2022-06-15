function drawMenu() {
  var canvas = document.getElementById('menucan');
  var ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0,1);
  ctx.lineTo(20,1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0,10);
  ctx.lineTo(20,10);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0,19);
  ctx.lineTo(20,19);
  ctx.stroke();
}

drawMenu();