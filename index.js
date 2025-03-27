const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 10000;
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const data = req.body;

  const message = `
📡 *${data.direction.toUpperCase()} Signal*
🧠 Strategy: KIRA
📈 Symbol: ${data.symbol}
🕰 Interval: ${data.interval}
💰 Price: ${data.price}
`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    res.status(200).send('Sent to Telegram');
  } catch (err) {
    console.error('Telegram error', err);
    res.status(500).send('Telegram error');
  }
});

app.listen(port, () => {
  console.log(`KIRA Webhook listening on port ${port}`);
});
