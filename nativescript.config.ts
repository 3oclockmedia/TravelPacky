import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.threeoclockmedia.travelpacky',
  appPath: 'app',
  appResourcesPath: '../../tools/assets/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
    package: 'com.threeoclockmedia.travelpacky',
    versionCode: 1,
    versionName: '1.0.0',
    minSdkVersion: 23,
    targetSdkVersion: 33
  }
} as NativeScriptConfig;