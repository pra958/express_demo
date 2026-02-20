const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const logger = require('./middleware/logger');
const members = require('./routes/members');
const home = require('./routes/home');
const cors = require('cors');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // Default

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(helmet());
app.use('/members', members);
app.use('/', home);

// NODE_ENV=production npm test
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('Morgan enabled...');
}

app.use(logger);

// PORT=5000 node app.js
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
