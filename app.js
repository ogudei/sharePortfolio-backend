const express = require("express");

const userRouter = require("./routes/user");
const shareRouter = require("./routes/share");
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const requestValidate = require("./middleware/validation/validates/request").validate

const db = require("./init/db");

app.use(cors());

app.use(bodyParser.json());
app.use(requestValidate)
app.use(userRouter);
app.use(shareRouter);

app.listen(port, () => {
  console.log(`Twitter app listening at http://localhost:${port}`);
});
