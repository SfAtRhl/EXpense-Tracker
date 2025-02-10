The first one is generating the Android App Bundle file (.aab). This is the Android publishing format compatible with Google Play. Run this command for this:

npx react-native build-android --mode=release
The output will be placed in android folder: /android/app/build/outputs/bundle/release/app-release.aab

The another one is generating the APK. So you can run these commands for this:

./gradlew clean //just for cleaning build folder

./gradlew assembleRelease //for generating the apk

The output will be placed in android folder: android/app/build/outputs/apk/release/app-release.apk

use npx expo prebuild to generate android folder go inside that folder and run:

./gradlew assembleRelease: to create .apk.
./gradlew bundleRelease: to create .aab.

npx expo run:android --no-build-cache
npx expo prebuild --clean

eas build -p android --profile preview --clear-cache
