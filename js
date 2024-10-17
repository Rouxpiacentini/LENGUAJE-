cualquier qr que no sea el que espera da rojo
let video;
let qrDetected = false;
let expectedQR = "http://en.m.wikipedia.org"; // El qr que da verde
let qrResult = "";
let lastDetectionTime = 0;  // Tiempo de detección
let inactivityLimit = 4000;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Iniciar la captura de video
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  
  lastDetectionTime = millis(); 
}

function draw() {
  image(video, 0, 0, width, height);

  if (frameCount % 10 === 0) {
    detectQR();
  }

 
  if (millis() - lastDetectionTime > inactivityLimit) {
    resetQRState();
  }

  // Cambia el fondo según el QR detectado
  if (qrDetected) {
    if (qrResult.startsWith(expectedQR)) {
      background(0, 255, 0); 
    } else {
      background(255, 0, 0); // Rojo si es cualquier otro
    }
  }
}

function detectQR() {

  let videoImage = video.get();
  
 
  let imageData = videoImage.canvas.getContext('2d').getImageData(0, 0, videoImage.width, videoImage.height);
  
  
  let qrCode = jsQR(imageData.data, videoImage.width, videoImage.height);
  
  if (qrCode) {
    console.log("QR Code detected: ", qrCode.data);
    qrResult = qrCode.data;
    qrDetected = true;
    lastDetectionTime = millis(); // Reinicia el temporizador de inactividad
  }
}

function resetQRState() {
 
  qrDetected = false;
  qrResult = "";
  background(255);  
  lastDetectionTime = millis(); 
}

function keyPressed() {
  // Reset manual al presionar 'r'
  if (key == 'r' || key == 'R') {
    resetQRState();
  }
}
