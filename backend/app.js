const express = require("express");
var cors = require("cors");
const connectToMongo = require("./db");

try {
  connectToMongo();
} catch (e) {
  console.log(e);
}
const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/auth", require("./routes/auth"));
app.use("/api/v1/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
