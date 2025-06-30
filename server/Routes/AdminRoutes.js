const express =require("express");
const api =express.Router();
const {PostJob, getAllJobs, getJobByID, updateJobs, deletJobs,getApplicationForJob} = require("../Controllers/AdminControllers");

api.post("/addJob",PostJob);
api.get("/getAllJob",getAllJobs);
api.get("/jobs/:id",getJobByID);
api.put("/updateJob",updateJobs);
api.delete("/deletJob",deletJobs);
api.get("/applicationForJob",getApplicationForJob);



module.exports = api;