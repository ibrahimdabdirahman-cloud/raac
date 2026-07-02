#!/bin/sh
# Fetch the Capacitor xcframeworks for the local SPM package (ios/spm-local).
# SwiftPM's own URLSession download of these release assets hangs on some
# networks, so we vendor them via curl and verify against the upstream pins.
set -e
DIR="$(dirname "$0")/../ios/spm-local/capacitor-swift-pm"
VER="8.4.1"
CAP_SHA="04665ab264967643e092a71740b0d619b087bc8949e71dacd410d10cc5e34f08"
COR_SHA="76172be2ff6f09c05b3fdd6e48b08f79f070d1c50c108a4539f31b24f3b3c838"

cd "$DIR"
for name in Capacitor Cordova; do
  curl -sL -O "https://github.com/ionic-team/capacitor-swift-pm/releases/download/$VER/$name.xcframework.zip"
done
echo "$CAP_SHA  Capacitor.xcframework.zip" | shasum -a 256 -c -
echo "$COR_SHA  Cordova.xcframework.zip" | shasum -a 256 -c -
unzip -qo Capacitor.xcframework.zip
unzip -qo Cordova.xcframework.zip
rm -f Capacitor.xcframework.zip Cordova.xcframework.zip
echo "xcframeworks ready in $DIR"
