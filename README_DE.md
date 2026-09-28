# P5.js: Image Recognition

[English](readme.md)

Klassifiziert ein Live-Videobild mit dem Image Classifier von ml5.js
(Darknet-Modell) und listet die erkannten Labels mit ihrer Konfidenz neben
dem Video auf. Funktioniert mit der Webcam oder einem MJPEG-Netzwerkstream.
Ein Ausgangspunkt, um auf Objekte vor einer Kamera zu reagieren.

## Installation

Voraussetzungen: eine Webcam (oder ein MJPEG-Stream) und eine
Internetverbindung – das Modell wird beim ersten Start heruntergeladen.

Optional, MJPEG-Stream statt Webcam: `videoSrc` auf die Stream-URL und
`useWebcam = false` setzen (`true`, der Standard, verwendet die Webcam).
Der Stream braucht einen Proxy (siehe Server).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet), ml5.js 1.2.2.

## Server

Nur für den MJPEG-Stream nötig (`useWebcam = false`): `stream-proxy` aus
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi)
(HTTP, Port 5000), auf einem Raspberry Pi im selben Netzwerk wie dein
Computer. Zuerst im Ordner mit `bash run.sh` (oder `python server.py`)
starten. Er holt den Kamerastream und reicht ihn mit CORS-Headern weiter,
damit der Classifier seine Pixel lesen kann. In `sketch.js` `proxyUrl` auf
`http://<pi-ip>:5000/stream?url=` setzen.

## Ausführen

1. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
2. Den Zugriff auf die Webcam erlauben. Oben links erscheint das
   Webcam-Bild, rechts die Klassifizierungsergebnisse.

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
