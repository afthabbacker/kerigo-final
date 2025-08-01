// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `project.json`.

export const environment = {
  production: false,
  root: 'http://localhost:3004/',
  wsEndpoint: 'ws://localhost:3004/graphql',
  // root: 'https://demo-admin.ridy.io:4001/',
  // wsEndpoint: 'wss://demo-admin.ridy.io:4001/graphql',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
