const express = require("express");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log("Received signal:", req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 KIRA bot listening on port ${PORT}`);
});
