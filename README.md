# SWAPI Characters

React Native (Expo + TypeScript) app that lists Star Wars characters from [swapi.info](https://swapi.info) and shows the details of each one. The last successful fetch is cached, so the list still loads when the app is opened offline.

## Requirements

- Node.js LTS
- Expo Go on an Android phone, or an Android emulator

## Run

```sh
npm install
npx expo start
```

Then open the app on one of these:

- Phone: install Expo Go and scan the QR code in the terminal. The phone and computer must be on the same network.
- Android emulator: start one (see Expo's [Android emulator guide](https://docs.expo.dev/workflow/android-studio-emulator/)), then press `a` in the terminal. Expo Go installs on the emulator automatically.

## Offline and error states

Expo Go loads the app from the dev server, so airplane mode also cuts it off from the server. On an emulator or a USB-connected Android phone, tunnel the server over adb first:

```sh
adb reverse tcp:8081 tcp:8081
adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8081"
```

- Cached data: load the list once, turn on airplane mode, then close and reopen the app. The list shows with an offline banner.
- Error state: clear Expo Go's storage (Settings > Apps > Expo Go > Storage), turn on airplane mode, then reopen the app. A full-screen error with Retry shows.
- Turning airplane mode off reloads the list.

## Test

```sh
npm test
npm run lint
```
