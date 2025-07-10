const job = require("../Models/Job");
const Application =require("../Models/Application");
const Userr = require("../Models/User");
//
async function PostJob(req, res) {
    try {
        let {userName, title, company, location, category, description } = req.body;
        let newjob = new job({
            userName,
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
//
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
//
const getJobByID = async (req, res) => {
  try {
    const jobs = await job.findById(req.params.id);
    if (!jobs) {
      return res.status(404).json({ message: 'Job not found' }); // Return early
    }

    return res.status(200).json(jobs); // Return job if found
  } catch (error) {
    console.error('Error in getJobByID:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

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
//
async function changeRloes(req,res){
    const{userName}=req.body;
    try {
        const changeRole=await Userr.findOne({userName});
        if(changeRole.role==="admin"){
            return res.josn("user is also admin")
        }
       changeRole.role="admin";
       await changeRole.save();
       res.json("user change to admin")
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

async function getJobByAdmin(req,res){
    const{userName}=req.user;
    try {
        const Getjobbyadmin= await job.find({userName});
        if(Getjobbyadmin.length===0){
            return res.status(404).json("jop are not found");
        }
        res.status(200).json(Getjobbyadmin);
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
    getApplicationForJob,
    changeRloes,
    getJobByAdmin
};
