const express = require("express");
const adminRoutes =require("./Routes/AdminRoutes");
const userRoutes =require("./Routes/UserRoutes");
const authenticate =require("./Routes/AuthenticationRoutes");
const base =require("./Routes/Base");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use('/api',adminRoutes);
app.use('/api',userRoutes);
app.use('/api',authenticate);
app.use('',base);




require("./config/conn");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
