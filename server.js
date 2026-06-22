// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // reads .env

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'pulse-desktop.html'), 'utf8');
  const envScript = `<script>window.__ENV__ = ${JSON.stringify({
    ADMIN_USER: process.env.ADMIN_USER || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'pulse2026',
    TWELVE_DATA_API_KEY: process.env.TWELVE_DATA_API_KEY || ''
  })};</script>`;
  html = html.replace('<!-- INJECT_ENV -->', envScript);
  res.send(html);
});

app.listen(PORT, () => console.log(`Serving on http://localhost:${PORT}`));