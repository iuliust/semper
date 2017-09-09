#SEMPER FIdelis

Ce dépôt a pour but de faire la démonstration de bon nombre dse capacités de
mon framework/plateforme favori Angular côté front avec un backend du feu de diou !

Côté front :
[ ] Angular 5
[ ] Angular Material
[ ] Lazy Loading
[ ] tree shaking
[ ] server-side rendering (Angular Universal)
[ ] i18n/l10n
[ ] aria
[ ] http2
[ ] graphQL
[ ] apollo
[ ] nestJS 4
[ ] express 5
[ ] ngrx/rxjs
[ ] AOT
[ ] peut-être Nativescript
[ ] JSON web Token
[ ] Angular 4 animations
[ ] Flex-Layout
[ ] hot module reloading
[ ] compression brotli/broccoli
[ ] webworkers (@angular/platform-webworker)
[ ] utiliser JSONP i/of JSON
[ ] s'amuser avec webRTC, webBluetooth, webUSB…

## Getting started

```bash
npm install
npm start
```

## Angular server-side rendering in Node

You need to use `@angular/cli` >= 1.3.0. Direct `npm update` of CLI often causes problems, if any : delete `node_modules` and `package-lock.json` and `npm install` again.

Compared to an empty project created with CLI, new or modified files are :

- `.angular-cli.json` (modified with a second app config)
- `src/tsconfig.server.json` (new)
- `src/main.server.ts` (new)
- `src/app/app.server.module.ts` (new)
- `src/app/app.module.ts` (modified with serverTransition)
- `server.js` (new)
- `.gitignore` (modified)
- `package.json` (modified with new scripts and new packages)

[Blog post with details](https://medium.com/@cyrilletuzi/angular-server-side-rendering-in-node-with-express-universal-engine-dce21933ddce)

## HttpInterceptor for Universal Express engine

Angular server-side rendering via `@angular/platform-server` requires absolute URLs in HTTP requests.

To automate this, an HttpClient interceptor catches all HttpClient requests and, if we're on server-side and server provided an absolute path, automatically prepend the URL.

HttpInterceptor is in `src/app/universal.interceptor.ts`.

Absolute path is provided in `server.js` :

```js
res.render('index', {
  req,
  res,
  providers: [{
    provide: 'serverUrl',
    useValue: `${req.protocol}://${req.get('host')}`
  }]
});
```

Note : you need to use the new `HttpClient` from Angular 4.3. It won't work on requests done with the previous `Http` API.
