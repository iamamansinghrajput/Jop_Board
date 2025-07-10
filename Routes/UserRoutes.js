const express =require("express");
const api =express.Router();
const {postApplications,getUserApplications,getUserData} = require("../Controllers/UserControllers");
const userAuthenticate =require("../Middileware/UserMiddleware");

api.post("/addApplication",postApplications);
api.get("/getUserApplication",userAuthenticate,getUserApplications);
api.get("/getUser",userAuthenticate,getUserData);



module.exports = api;