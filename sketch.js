let facemesh;
let video;
let predictions = [];

function setup() {
  createCanvas(400, 400);

  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  console.log(video); // 確認 video 是否成功初始化

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", (results) => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  console.log("draw running"); // 確認 draw 是否執行
  background(220);
  image(video, 0, 0, width, height);

  noFill();
  stroke(255, 0, 0); // 紅色線條
  strokeWeight(5); // 線條粗度

  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    // 繪製嘴唇
    drawLines(keypoints, [
      409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 375, 291,
      76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 11, 72, 73, 74, 184,
    ]);
  }
}

function drawLines(keypoints, indices) {
  for (let i = 0; i < indices.length - 1; i++) {
    const [x1, y1] = keypoints[indices[i]];
    const [x2, y2] = keypoints[indices[i + 1]];
    line(x1, y1, x2, y2);
  }
}