# P5.js: Image Recognition

[Deutsch](README_DE.md)

Classifies a live video image with the ml5.js image classifier (Darknet
model) and lists the recognised labels with their confidence next to the
video. Works with the webcam or an MJPEG network stream. A starting point
for reacting to objects in front of a camera.

## Installation

Requirements: a webcam (or an MJPEG stream) and an internet connection –
the model is downloaded on first start.

Optional, MJPEG stream instead of webcam: set `videoSrc` to the stream URL
and `useWebcam = false` (`true`, the default, uses the webcam). The stream
needs a proxy (see Server).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used), ml5.js 1.2.2.

## Server

Only needed for the MJPEG stream (`useWebcam = false`): `stream-proxy` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(HTTP, port 5000), running on a Raspberry Pi in the same network as your
computer. Start it first with `bash run.sh` (or `python server.py`) in its
folder. It fetches the camera stream and passes it on with CORS headers,
so the classifier can read its pixels. Set `proxyUrl` in `sketch.js` to
`http://<pi-ip>:5000/stream?url=`.

## How to Run

1. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
2. Allow webcam access. The webcam image appears top left, the
   classification results on the right.

## Coding Help

- **Config at the top of `sketch.js`**: `videoSrc` (MJPEG stream URL),
  `proxyUrl` (CORS proxy) and `useWebcam` (source switch, see above).
- **`preload()`**: loads the classifier with
  `ml5.imageClassifier("darknet")`. Other models (e.g. `"MobileNet"`) can be
  set here.
- **`setup()`**: creates a full-window canvas and either the webcam capture
  (640 × 480) or an `<img>` element with the proxied stream. Then
  `classifier.classifyStart()` classifies the incoming frames continuously
  and writes the result array into `label`.
- **`draw()`**: draws the video into the top left quarter and prints each
  entry of `label` (`label` and `confidence`) as text on the right. To
  react to a specific object, check e.g. `label[0].label` here.
- **`wait()`**: shows the stream URL while the stream is not ready yet.
