// swift-tools-version: 5.9
import PackageDescription

// NOTE: normally managed by Capacitor CLI (`cap sync` regenerates it).
// Local changes for this environment (re-apply after a sync):
//  - capacitor-swift-pm resolves from ../../spm-local (URLSession artifact
//    downloads hang on this network; xcframeworks vendored, checksums verified)
//  - CapacitorGeolocation is omitted on iOS: its IONGeolocationLib dependency
//    fails module resolution under legacy -target builds, and the app's JS
//    falls back to WKWebView's built-in navigator.geolocation (same OS prompt
//    via NSLocationWhenInUseUsageDescription).
let package = Package(
    name: "CapApp-SPM",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapApp-SPM",
            targets: ["CapApp-SPM"])
    ],
    dependencies: [
        .package(name: "capacitor-swift-pm", path: "../../spm-local/capacitor-swift-pm")
    ],
    targets: [
        .target(
            name: "CapApp-SPM",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ]
        )
    ]
)
