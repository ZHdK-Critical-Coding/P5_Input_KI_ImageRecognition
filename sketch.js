// ============================================
// MJPEG Stream Viewer with Real-time Classification
// p5.js + ml5.js
// © uh 2025
// ============================================

// URL of the MJPEG video stream
const videoSrc = 'http://153.169.104.107:8080/?action=stream';  

// Optional proxy URL to bypass CORS issues
const proxyUrl = 'http://192.168.138.96:5000/stream?url='; 

const useWebcam = false

// Flags and variables
let videoReady = false; // Indicates whether the video is ready to display
let imageStream;        // p5.Image element for streaming
let classifier;         // ml5.js image classifier instance
let label = [{label: "Model Loading…"}]; // Initial label placeholder

// ============================================
// p5.js preload function
// ============================================
function preload() {
  // Load the Darknet classifier (YOLO-based) before setup
  classifier = ml5.imageClassifier("darknet");
}

// ============================================
// p5.js setup function
// ============================================
function setup() {
  createCanvas(windowWidth, windowHeight); // Full-window canvas
  background(0);

  // Construct proxy URL to fetch MJPEG stream safely
  const proxy = `${proxyUrl}${encodeURIComponent(videoSrc)}`;
  console.log(proxy);

  // Create the HTML <img> element that streams MJPEG video
  if (useWebcam) {
    imageStream = createImg(proxy, '', 'anonymous', (e) => {
        // Callback when image element is loaded
        imageStream.hide(); // Hide the HTML element; we draw it on canvas manually
        videoReady = true;  // Mark video as ready
      });    
  } else {
    imageStream = createCapture(VIDEO);
    imageStream.size(640, 480);
    imageStream.hide();
    videoReady = true;    // Mark as ready when loaded
  }



  // Start classification in streaming mode
  // classifier.classifyStart continuously analyzes incoming frames
  classifier.classifyStart(imageStream, (result) => {
    label = result; // Update label with classification result
  });
}

// ============================================
// p5.js draw function
// ============================================
function draw() {
  background(255); // Clear canvas each frame

  // Display video if ready
  if (videoReady) {
    try {
      // Draw the video stream onto the canvas
      image(imageStream, 10, 10, width / 2 - 20, height / 2 - 20);
    } catch (e) {
      console.warn('Error drawing video frame:', e);
    }
  } else {
    // Show waiting text until the video is ready
    wait();
  }

  // Display classification results as text
  // Maps each label to a string with optional confidence
  text(
    label.map(l => `${l.label}${l.confidence ? ` ${round(l.confidence,1)},` : ''}`).join('\n'), 
    width / 2 + 10, 20
  );
}

// ============================================
// Helper function: display waiting message
// ============================================
function wait() {
  fill(255);
  textSize(10);
  text(`⏳ ${videoSrc}`, 10, 20);
}

// ============================================
// p5.js window resize handler
// ============================================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}