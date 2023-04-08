require("dotenv").config();

const express = require("express");

const cors = require("cors");
const { connect } = require("./Config/db");
const userRoute = require("./Routes/user.routes");
const postRoute = require("./Routes/post.routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use('/users' , userRoute)
app.use('/posts' , postRoute)

app.get("/", (req, res) => {
   res.send('Hello welcome in Adove Test Api Server')
});


app.listen(process.env.PORT, async () => {
  try {
    await connect();
    console.log("connected to database");
  } catch (err) {
    console.log("Failed connecting to database", err.message);
  }
  console.log(`http://localhost:${process.env.PORT}`);
});
