const fs = require('node:fs');
const path = require('node:path');

const FILE_PATH = path.resolve('./urls.json');

function isFileExist() {
  return fs.existsSync(FILE_PATH);
}

function getUrls() {
  return isFileExist() ? JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8')) : null;
}

function saveUrl(url, id) {
  if (isFileExist()) {
    const urls = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

    fs.writeFileSync(FILE_PATH, JSON.stringify({ ...urls, [id]: url }));
  } else {
    fs.writeFileSync(FILE_PATH, JSON.stringify({ [id]: url }));
  }
}

module.exports = { getUrls, saveUrl };
