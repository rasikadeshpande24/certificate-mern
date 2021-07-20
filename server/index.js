import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// const corsOptions = {
//   // origin: "https://certificates-mern.netlify.app/",
//   origin: "https://localhost:5000/posts",
//   credentials: "true", //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
app.use(cors());

// app.all("/", function (req, res) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
// });

app.use("/posts", postRoutes);
app.get("/", (req, res) => {
  res.send("Certificate API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
//"start": "nodemon index.js"

// "dev": "react-scripts start",
//     "start": "serve -s build",
//     "build": "react-scripts build",
//     "test": "react-scripts test --env=jsdom",
//     "eject": "react-scripts eject",
//     "heroku-postbuild": "npm run build"

//
