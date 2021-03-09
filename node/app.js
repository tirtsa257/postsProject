const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
app.use(morgan('dev'));
const mongoose = require("mongoose");
const UserRouter = require("./api/routers/userRouter")
const ImgeRouter = require("./api/routers/imageRouter")
const env = require("dotenv");
env.config();

app.use(bodyParser.json());
app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methodes", "PUT, POST, PATCH ,DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.listen(5000, () => {
    console.log("application is running in port 5000")
})

app.get('/', (req, res) => {
    res.send("hello");
})
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({
    extended: false,
}));
app.use("/users", UserRouter);
app.use("/Images", ImgeRouter);
const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}
mongoose.connect(process.env.DB_CONNECT, connectionParams).then(() => {
    console.log("connected DB");
}).catch((err) => console.log(err));
