const express =require("express");
const api =express.Router();
const {postApplications,getUserApplications} = require("../Controllers/UserControllers");

api.post("/addApplication",postApplications);
api.get("/getUserApplication",getUserApplications);



module.exports = api;