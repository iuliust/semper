import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as compression from 'compression';
import * as main from '../dist-server/main.bundle';

const LAZY_MODULE_MAP = main['LAZY_MODULE_MAP'];
const ServerAppModuleNgFactory = main['ServerAppModuleNgFactory'];
console.log(`voici les routes de l'application : ${Object.keys(LAZY_MODULE_MAP)}`);

const projectRoot = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.resolve(projectRoot, 'src', 'index.html'), 'utf8');
const app = express();
const port = 5000;
const viewEngine = ngExpressEngine({
  bootstrap: ServerAppModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
});

function renderFrontendApplication(req, res) {
  console.log(`GET ${req.url}`);
  res.render('index', {req, res});
}

app.engine('html', viewEngine);
app.use(compression());
app.set('view engine', 'html');
app.set('views', path.resolve(projectRoot, 'dist'));

app.get('/api', (req, res) => {
  return res.json({ data: 'Content from HTTP request.' });
});

app.get('/', renderFrontendApplication);

app.use('/', express.static(path.resolve(projectRoot, 'dist')));

app.get('*', renderFrontendApplication);

app.listen(port, () => {
  console.log(`Listening on http://localhost:5000`);
});

