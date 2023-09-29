const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

let baseUrl = "/api/v1/"

app.use(baseUrl, require("./routes/AccessCodeRouter"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
