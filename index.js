const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers');

const app = express();

app.use(bodyParser.json());
app.use(router);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
