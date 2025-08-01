// File generated by FlutterFire CLI.
// ignore_for_file: type=lint
import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        return macos;
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyCVrDTDAQT2xEchRuIdLroilAQgulVyArY',
    appId: '1:776452919172:web:b4fffc60e2a144e25bd7d1',
    messagingSenderId: '776452919172',
    projectId: 'kerigo-21a0b',
    authDomain: 'kerigo-21a0b.firebaseapp.com',
    storageBucket: 'kerigo-21a0b.firebasestorage.app',
    measurementId: 'G-TZ9CEQ92G2',
  );

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyCR7sHzyUGMWjY4VUf9wTr39RSeD-Uc_uY',
    appId: '1:776452919172:android:e023b80cf039014a5bd7d1',
    messagingSenderId: '776452919172',
    projectId: 'kerigo-21a0b',
    storageBucket: 'kerigo-21a0b.firebasestorage.app',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAA_VOIvzPigkwALkVbx78uVNmuLTct9jo',
    appId: '1:776452919172:ios:9a474824ee7fc2045bd7d1',
    messagingSenderId: '776452919172',
    projectId: 'kerigo-21a0b',
    storageBucket: 'kerigo-21a0b.firebasestorage.app',
    iosBundleId: 'com.ridy.taxi.rider',
  );

  static const FirebaseOptions macos = FirebaseOptions(
    apiKey: 'AIzaSyAA_VOIvzPigkwALkVbx78uVNmuLTct9jo',
    appId: '1:776452919172:ios:04732dd7f3f594d65bd7d1',
    messagingSenderId: '776452919172',
    projectId: 'kerigo-21a0b',
    storageBucket: 'kerigo-21a0b.firebasestorage.app',
    iosBundleId: 'com.gotaxi.taxi.riderFlutter',
  );
}
