'use strict';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import * as ngUniversal from '@nguniversal/express-engine';
import * as appServer from '../dist-server/main.bundle';

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

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: appServer['AppServerModuleNgFactory']
}));

app.set('view engine', 'html');
app.set('views', 'dist');

app.get('*', angularRouter);

app.listen(5000, () => {
  console.log(`Listening on http://localhost:5000`);
});
