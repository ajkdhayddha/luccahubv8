const express = require('express');
const app = express();
const fetch = require('node-fetch');

// Chave secreta opcional
const SECRET_KEY = 'SUA_CHAVE_SECRETA_AQUI';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/meuscript', async (req, res) => {
  const ua = (req.get('User-Agent') || '').toLowerCase();
  const key = req.query.key || '';

  const isRoblox = ua.includes('roblox');
  const hasKey = key === SECRET_KEY;

  if (!isRoblox && !hasKey) {
    return res.status(403).type('text/plain').send('Acesso Negado');
  }

  try {
    const gistUrl = 'https://gist.githubusercontent.com/ajkdhayddha/24c3a0ff2f9eefbbe244597e5810cc47/raw/31db26d3fc9a7e1dae87d5294f26581697fa7318/luccahubv7.lua';
    const response = await fetch(gistUrl);
    const luaScript = await response.text();
    res.type('text/plain').send(luaScript);
  } catch (err) {
    res.status(500).send('Erro ao carregar script.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
