# SWAPI Characters

React Native (Expo + TypeScript) app that lists Star Wars characters from [swapi.info](https://swapi.info) and shows the details of each one. The last successful fetch is cached, so the list still loads when the app is opened offline.

## Requirements

- Node.js LTS
- An Android emulator or device with Expo Go

## Run

```sh
npm install
npx expo start
```

Press `a` to open the app in Expo Go on a running Android emulator.

## Test

```sh
npm test
npm run lint
```

## Build an APK

The `preview` profile builds a standalone APK on EAS, which is the easiest way to try a cold start without a network connection.

```sh
npx eas-cli@latest build -p android --profile preview
adb install <downloaded-file>.apk
```
