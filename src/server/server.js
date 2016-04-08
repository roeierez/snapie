app = require("express")();

app.get("/", function (req, res) {
  res.send("Hello World");
}).listen(8000);

