const express = require("express");
const adminRoutes =require("./Routes/AdminRoutes");
const userRoutes =require("./Routes/UserRoutes");
const authenticate =require("./Routes/AuthenticationRoutes");

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api',adminRoutes);
app.use('/api',userRoutes);
app.use('/api',authenticate);



require("./config/conn");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
