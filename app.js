const express = require("express");
const cors = require('cors');
const adminRoutes =require("./Routes/AdminRoutes");
const userRoutes =require("./Routes/UserRoutes");
const authenticate =require("./Routes/AuthenticationRoutes");
const base =require("./Routes/Base");
const cookieParser =require("cookie-parser");

const app = express();
const port = 3000;

const corsOptions = {
  origin: ['http://localhost:3000','http://localhost:5173', 'https://jop-board.vercel.app'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use('/api',adminRoutes);
app.use('/api',userRoutes);
app.use('/api',authenticate);
app.use('',base);




require("./config/conn");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
