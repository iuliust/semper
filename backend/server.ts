import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as compression from 'compression';
import * as proxy from 'http-proxy-middleware';
import * as main from '../dist/dist-server/main.bundle';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import { renderModuleFactory } from '@angular/platform-server';
const {LAZY_MODULE_MAP, ServerAppModuleNgFactory} = main;

const dirnamePath = path.resolve(__dirname);
const rootPath = path.resolve(dirnamePath, '..');
const projectHtmlPath = path.resolve(rootPath, 'dist/dist-browser/index.html');

const template = fs.readFileSync(projectHtmlPath).toString();

const app = express();
const port = 4200;

app.engine('html', (_, options, callback) => {
  const opts = {};
  renderModuleFactory(ServerAppModuleNgFactory, {
    document: template,
    url: options.req.url,
    extraProviders: [provideModuleMap(LAZY_MODULE_MAP)],
  }).then(html => callback(null, html));
});

function renderFrontendApplication(req, res) {
  console.log(`GET ${req.url}`);
  res.render('index', {req, res});
}

app.use(compression());
app.set('view engine', 'html');
app.set('views', path.resolve(rootPath, 'dist', 'dist-browser'));

app.use('/api', proxy({
  target: 'http://localhost:5000',
  pathRewrite: {
    "^/api": ""
  }
}));

app.get('/', renderFrontendApplication);

app.use('/', express.static(path.resolve(rootPath, 'dist', 'dist-browser')));

app.get('*', renderFrontendApplication);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
