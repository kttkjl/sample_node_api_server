const express = require("express");
const bodyParser = require("body-parser");
const port = 56081;
const app = express();
// const sqlUtils = require("./utils/sqlUtils"); // not needed for now
const workersRouter = require("./routes/workers");
const ordersRouter = require("./routes/orders");

// bodyParser middleware
app.use(bodyParser.json());

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: "application/vnd.custom-type" }));

// parse an HTML body into a string
app.use(bodyParser.text({ type: "text/html" }));

app.use("/api/workers", workersRouter);
app.use("/api/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port} ... `);
});
