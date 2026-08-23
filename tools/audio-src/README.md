# tools/audio-src/

`tools/audio.sh` reads **`SubmitologY-master.mp3`** from this folder and writes
the 96 kbps loop the site actually ships to `src/photo/../audio/`.

**The master is not in this archive.** At 320 kbps / 2:44 it is 6.3 MB, and
including it pushed the delivery zip past the transfer limit. It is the file
you supplied, unchanged — drop it back in here as
`SubmitologY-master.mp3` and `bash tools/audio.sh` regenerates
`src/audio/submitology-loop.mp3` byte-for-byte.

Nothing in the build depends on it: `src/audio/submitology-loop.mp3` is
committed and is what webpack bundles. The master is only needed if you want to
re-encode at a different bitrate.
