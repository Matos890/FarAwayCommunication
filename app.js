const express = require("express");
const path = require("path");
const viewRoute = require("./routes/viewRoute");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configurare la directory dei file statici
app.use(express.static(path.join(__dirname, "public")));

// Utilizzare la rotta definita
app.use("/", viewRoute);

// Avviare il server sulla porta 2000
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
