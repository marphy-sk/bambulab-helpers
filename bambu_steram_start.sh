#!/bin/bash

# Zabij staré procesy
killall bambu_source 2>/dev/null
killall ffmpeg 2>/dev/null
sleep 1

# Prejdi do cameratools
cd ~/Library/Application\ Support/BambuStudio/cameratools/

# Spusti na pozadí
nohup bash -c './bambu_source "bambu:///camera//Users/<user_name>/Library/Application%20Support/BambuStudio/cameratools/url.txt" | ./ffmpeg -fflags nobuffer -flags low_delay -analyzeduration 10 -probesize 3200 -f h264 -i pipe: -vcodec copy -an -f rtp -sdp_file ffmpeg.sdp rtp://127.0.0.1:1234' > /tmp/bambu_stream.log 2>&1 &

echo "Bambu stream started! Check status: ps aux | grep bambu_source"
