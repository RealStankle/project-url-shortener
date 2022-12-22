const express = require('express');
const cors = require('cors');
const validator = require('validator');
const { randomUUID } = require('node:crypto');
const { getUrls, saveUrl } = require('./url.controller');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/shorturl', (req, res) => {
  const url = req.body.url;
  const isValidURL = validator.isURL(url, {
    require_protocol: true,
  });

  if (isValidURL) {
    const urlID = randomUUID().slice(0, 8);

    saveUrl(url, urlID);

    res.json({
      original_url: url,
      short_url: urlID,
    });
  } else {
    res.json({ error: 'invalid url' });
  }
});

app.get('/api/shorturl/:urlID', (req, res) => {
  const urlID = req.params.urlID;
  const urls = getUrls();

  if (urls && Object.keys(urls).includes(urlID)) {
    res.redirect(urls[urlID]);
  } else {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
