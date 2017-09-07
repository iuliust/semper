'use strict';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { enableProdMode } from '@angular/core';
import { ServerAppModule } from '../src/main.server';

enableProdMode();

function angularRouter(req, res) {

  res.render('index', {
    req,
    res,
    providers: [{
      provide: 'serverUrl',
      useValue: `${req.protocol}://${req.get('host')}`
    }]
  });

}

const app = express();

app.get('/', angularRouter);

app.use(express.static(`${__dirname}/../dist`));

app.get('/api', (req, res) => {
  res.json({ data: 'Content from HTTP request.' });
});

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'dist');

app.get('*', angularRouter);

app.listen(5000, () => {
  console.log(`Listening on http://localhost:5000`);
});
