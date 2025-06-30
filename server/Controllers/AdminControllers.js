const job = require("../Models/Job");
const Application =require("../Models/Application");

async function PostJob(req, res) {
    try {
        let { title, company, location, category, description } = req.body;
        let newjob = new job({
            title,
            company,
            location,
            category,
            description
        });
        await newjob.save();
        res.status(201).json("job created succesfully");
    } catch (error) {
    res.json(error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getAllJobs(req,res){
    try {
        const getAllJob = await job.find();
        if(getAllJob.length===0){
            return res.json("any job are not created")
        }
        res.json(getAllJob);
    } catch (error) {
        res.json(error);
         res.status(500).json({ message: "Internal Server Error" });
    }
}
async function getJobByID(req,res){
    try {
        const {id} =req.body;
        const getByID = await job.findById(id);
        if(!getByID){
            return res.json("job is not find");
        }
        res.json(getByID);
    } catch (error) {
        res.json(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function updateJobs(req, res) {
    try {
        let {id, title, company, location, category, description } = req.body;

         const updateJob = await job.findById(id);
         if(!updateJob){
            return res.json("job is not find");
        }
        updateJob.title = title;
        updateJob.company =company;
        updateJob.location= location;
        updateJob.category =category;
        updateJob.description =description;

        await updateJob.save();
        res.status(201).json("job updated succesfully");
    } catch (error) {
         res.json(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function deletJobs(req,res){
    try {
        const {id} =req.body;
        const deletJob = await job.findById(id);
            if(!deletJob){
                return res.json("job is not find");
            }
        await job.deleteOne({ _id: id });
            res.json("Deleted Successfully");
    } catch (error) {
        res.json(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getApplicationForJob(req, res) {
    try {
        const { jobId } = req.body;

        const applications = await Application.find({ jobId });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: "No applications found for this job" });
        }

        return res.status(200).json(applications); 
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = {
    PostJob,
    getAllJobs,
    getJobByID,
    updateJobs,
    deletJobs,
    getApplicationForJob
};
