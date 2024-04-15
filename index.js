const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors"); 
const cookieParser = require("cookie-parser");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const  makeConnection  = require('./Configure/database')
const adRoutes = require("./Routes/adRoute");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);
// app.use("/api/v1/branch", BranchRoutes);
// app.use("/api/v1/auth", AuthRoutes);
makeConnection();

app.use("/api/v1",adRoutes);
app.listen(PORT, () => {
  console.log("App is running live on port", PORT);
});
app.get("/",(req, res)=>{
    res.send("Server Live Url Copy Krlo")
})