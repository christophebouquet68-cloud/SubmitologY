#!/usr/bin/env bash
# audio.sh — re-encode the background track from the master in tools/audio-src/
#
# The master is 320 kbps stereo, 2:44, 6.3 MB. That is seven times the weight
# of the entire rest of the site, for something that plays quietly under
# reading and is off by default. 96 kbps stereo is transparent at this volume
# and lands at 1.9 MB.
#
# The file is still only fetched when somebody turns sound on — SoundToggle
# sets preload="none" and does not even construct the <audio> element until
# the first click — so the default page weight is unchanged either way. The
# re-encode is for the people who DO turn it on.
#
# Run:  bash tools/audio.sh
set -euo pipefail
cd "$(dirname "$0")/.."

SRC="tools/audio-src/SubmitologY-master.mp3"
OUT="src/audio/submitology-loop.mp3"

[ -f "$SRC" ] || { echo "missing master: $SRC" >&2; exit 1; }
command -v ffmpeg >/dev/null || { echo "ffmpeg not found" >&2; exit 1; }

mkdir -p "$(dirname "$OUT")"
# -map_metadata -1 strips ID3 tags: they are dead weight in a background loop
# and can carry names and paths from whatever produced the master.
ffmpeg -v error -y -i "$SRC" -codec:a libmp3lame -b:a 96k -ar 44100 -map_metadata -1 "$OUT"

echo "master $(du -h "$SRC" | cut -f1)  ->  $OUT $(du -h "$OUT" | cut -f1)"
