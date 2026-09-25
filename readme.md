# P5 -> Image Recognition

A p5.js sketch that classifies a live video image with the ml5.js image
classifier (Darknet model) and lists the recognised labels with their
confidence next to the video.

## How to Use

1. Start Live Server (click **Go Live** in the VS Code status bar).
2. Allow webcam access. The webcam image appears top left, the
   classification results on the right. The model is downloaded on first
   start, so an internet connection is required.
3. Optional, MJPEG stream instead of webcam: set `videoSrc` to the stream URL
   and `proxyUrl` to a proxy that forwards the stream with CORS headers
   (not included; it is called as `<proxyUrl><encoded videoSrc>`). The source
   is switched with the `useWebcam` constant; note that the logic is inverted:
   `false` (default) uses the webcam, `true` uses the stream.

## How it Works

`ml5.imageClassifier("darknet")` is loaded in `preload()`.
`classifyStart()` then classifies the incoming frames continuously and updates
the label list, which `draw()` prints as text.

## Libraries

- p5.js 1.10.0, p5.sound 1.0.1, ml5.js 1.x (in `libraries/`)
