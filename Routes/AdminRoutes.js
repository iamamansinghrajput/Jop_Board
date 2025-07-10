const express =require("express");
const api =express.Router();
const {PostJob, getAllJobs, getJobByID, updateJobs, deletJobs,getApplicationForJob,changeRloes,getJobByAdmin} = require("../Controllers/AdminControllers");
const userAuthenticate =require("../Middileware/UserMiddleware");

api.post("/addJob",PostJob);
api.get("/getAllJob",getAllJobs);
api.get("/jobs/:id",getJobByID);
api.put("/updateJob",updateJobs);
api.delete("/deletJob",deletJobs);
api.get("/applicationForJob",getApplicationForJob);
api.post("/changeRloe",changeRloes);
api.get("/getAdminJobs",userAuthenticate,getJobByAdmin);



module.exports = api;