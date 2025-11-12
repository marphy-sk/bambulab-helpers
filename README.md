// ...existing code...
# bambulab-helpers

Small collection of helper scripts for Bambu Lab printers.

Files
- [bambu_steram_start.sh](bambu_steram_start.sh)  
  Starts a background stream process that uses the local Bambu camera tools and ffmpeg. Logs are written to `/tmp/bambu_stream.log`. Edit the embedded path and replace `<user_name>` before running.

- [bambu-mqtt-reader.js](bambu-mqtt-reader.js)  
  Simple MQTT client that connects to the printer and writes a plain-text status summary to `./bambu_stats.txt`. Configure connection details in the [`config`](bambu-mqtt-reader.js) object. The running MQTT client instance is created as [`client`](bambu-mqtt-reader.js).

Quick usage

1. Configure:
   - Edit [bambu-mqtt-reader.js](bambu-mqtt-reader.js) and set the fields in [`config`](bambu-mqtt-reader.js) (host, password, serial).
   - Edit [bambu_steram_start.sh](bambu_steram_start.sh) to fix the camera path and username.

2. Install dependencies for the MQTT reader:
```sh
npm install mqtt
```