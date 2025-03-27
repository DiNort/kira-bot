const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = "8130860758:AAFgqI0X26irI1-yturVhY9zCqFuqymCRAE";
const TELEGRAM_CHAT_ID = "@KiraSignalsBot"; // или chat_id если не username

app.post("/webhook", async (req, res) => {
  const { signal, ticker, timeframe, price } = req.body;

  const message = `🚨 Signal: *${signal}*\nTicker: ${ticker}\nTF: ${timeframe}\nPrice: ${price}`;
  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    });
    res.sendStatus(200);
  } catch (e) {
    console.error("Failed to send alert:", e.message);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`KIRA Webhook running on port ${PORT}`));
