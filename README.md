# Raac — ride hailing for the Somali world

Live web app: **https://raac-ride.vercel.app** (`/` landing · `/app` booking · `/driver` driver signup)

One codebase, three targets: the static web app (deployed to Vercel) is wrapped with
[Capacitor](https://capacitorjs.com) into native iOS and Android apps.

## Structure

```
index.html / app.html / driver.html   the site (flat, Vercel cleanUrls)
assets/                                css, js, i18n, icons
tools/build-mobile.mjs                 assembles www/ for Capacitor (clean-URL dirs, no SW)
capacitor.config.json                  appId com.masul.raac
ios/  android/                         generated native projects (committed)
resources/                             icon-only.png + logo.png sources for native icons/splash
```

Bookings and driver applications POST to the shared Masul forms backend
(`masul-forms-backend.vercel.app`, siteId `raac`, types `ride` and `driver`).

## Web

Deploy: `npx vercel --prod` (project `masul-s-projects/raac-ride`).

## Mobile

```bash
npm install
npm run sync          # rebuild www/ + cap sync both platforms
npm run ios           # sync + open Xcode
npm run android       # sync + open Android Studio
npm run assets        # regenerate native icons/splash from resources/
```

### iOS (needs Xcode)

```bash
cd ios/App
xcodebuild -project App.xcodeproj -scheme App -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 17' build
```

For a device/App Store build, open in Xcode and set your signing team.
Location permission string is in `ios/App/App/Info.plist`.

### Android (needs JDK 21 + Android SDK)

```bash
cd android && ./gradlew assembleDebug
# → android/app/build/outputs/apk/debug/app-debug.apk
```

For Play Store: `./gradlew bundleRelease` with a signing config.
Location permissions are in `android/app/src/main/AndroidManifest.xml`.

### After editing web files

Run `npm run sync` so the native shells pick up the changes, then rebuild.
