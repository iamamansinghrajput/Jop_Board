const Application =require("../Models/Application");

async function postApplications(req,res){
    try {
        let { userName,jobId, firstName, lastName, email, number, dob,qualification,skills} = req.body;
        const ckeck = await Application.findOne({jobId,userName}) ;
        if(ckeck){
            return res.json("Application all ready post");
        }

        let newApplication = new Application({
           userName,
            jobId,
           firstName,
           lastName,
            email,
            number,
             dob,
            qualification,
             skills
        });
        await newApplication.save();
        res.status(201).json("job created succesfully");
    } catch (error) {
    res.json(error);
    res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getUserApplications(req, res) {
    try {
        const { userName } = req.body; 

        const getUser = await Application.find({ userName });

        if (!getUser || getUser.length === 0) {
            return res.status(404).json({ message: "No applications found" });
        }

        res.status(200).json(getUser); 
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}


module.exports={postApplications,getUserApplications};