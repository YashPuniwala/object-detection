export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction.bbox;
    const text = `${prediction.class} ${Math.round(prediction.score * 100)}%`;

    // Box
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // Label background
    ctx.fillStyle = "red";
    const textWidth = ctx.measureText(text).width;
    ctx.fillRect(x, y - 20, textWidth + 10, 20);

    // Label text
    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.fillText(text, x + 5, y - 5);
  });
};