import 'package:better_localization/country_code/country_code.dart';
import 'package:flutter_common/gen/assets.gen.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:generic_map/interfaces/place.dart';
import 'package:latlong2/latlong.dart';

class Env {
  static final String serverUrl = dotenv.maybeGet('BASE_URL') ?? "";
  static final String gqlEndpoint = '${serverUrl}graphql';
  static String appName = dotenv.maybeGet('APP_NAME') ?? "";
  static String companyName = dotenv.maybeGet('COMPANY_NAME') ?? "";
  static String firebaseMessagingVapidKey = dotenv.maybeGet('FIREBASE_MESSAGING_VAPID_KEY') ?? "";
  static String defaultCurrency = dotenv.maybeGet('DEFAULT_CURRENCY') ?? "";
  static CountryCode defaultCountry =
      CountryCode.parseByIso(dotenv.maybeGet('DEFAULT_COUNTRY')) ?? CountryCode.parseByIso("IN")!;
  static String defaultLanguage = dotenv.maybeGet('DEFAULT_LANGUAGE') ?? "en";
  static Place defaultLocation = Place(
    LatLng(
      double.parse(dotenv.maybeGet('DEFAULT_LATITUDE') ?? ""),
      double.parse(dotenv.maybeGet('DEFAULT_LONGITUDE') ?? ""),
    ),
    "",
    "",
  );
  static int placeSearchSearchRadius = 100000;
  static double desktopNavigationBarHeight = 96;
  static String defaultAvatar = dotenv.maybeGet('DEFAULT_AVATAR') ?? Assets.avatars.a1.path;
}
