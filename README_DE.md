# P5.js: Image Recognition

[English](readme.md)

Klassifiziert ein Live-Videobild mit dem Image Classifier von ml5.js
(Darknet-Modell) und listet die erkannten Labels mit ihrer Konfidenz neben
dem Video auf. Funktioniert mit der Webcam oder einem MJPEG-Netzwerkstream.
Ein Ausgangspunkt, um auf Objekte vor einer Kamera zu reagieren.

## Installation

Voraussetzungen: eine Webcam (oder ein MJPEG-Stream) und eine
Internetverbindung – das Modell wird beim ersten Start heruntergeladen.

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Den Zugriff auf die Webcam erlauben. Oben links erscheint das
   Webcam-Bild, rechts die Klassifizierungsergebnisse.

Optional, MJPEG-Stream statt Webcam: `videoSrc` auf die Stream-URL setzen
und `proxyUrl` auf einen Proxy, der den Stream mit CORS-Headern
weiterleitet (nicht enthalten; er wird als `<proxyUrl><encoded videoSrc>`
aufgerufen). Die Quelle wird mit der Konstante `useWebcam` umgeschaltet.
Achtung, die Logik ist verkehrt: `false` (Standard) verwendet die Webcam,
`true` den Stream.

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet), ml5.js 1.2.2.

## Coding-Hilfe

- **Konfiguration oben in `sketch.js`**: `videoSrc` (MJPEG-Stream-URL),
  `proxyUrl` (CORS-Proxy) und `useWebcam` (Umschalter für die Quelle, siehe
  oben).
- **`preload()`**: lädt den Classifier mit `ml5.imageClassifier("darknet")`.
  Andere Modelle (z. B. `"MobileNet"`) lassen sich hier setzen.
- **`setup()`**: erstellt eine fensterfüllende Zeichenfläche und entweder
  die Webcam-Aufnahme (640 × 480) oder ein `<img>`-Element mit dem Stream
  über den Proxy. Danach klassifiziert `classifier.classifyStart()` die
  eingehenden Bilder laufend und schreibt das Ergebnis-Array in `label`.
- **`draw()`**: zeichnet das Video ins obere linke Viertel und schreibt
  jeden Eintrag von `label` (`label` und `confidence`) rechts als Text hin.
  Um auf ein bestimmtes Objekt zu reagieren, hier z. B. `label[0].label`
  prüfen.
- **`wait()`**: zeigt die Stream-URL an, solange der Stream noch nicht
  bereit ist.
