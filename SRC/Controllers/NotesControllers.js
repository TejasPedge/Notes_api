const {Notes_Model} = require('../Model/NotesModel');


const GET_Notes = async (req,res) => {

    try {

        const {name,id,iat} = req.payload;

        const data = await Notes_Model.find({userId : id});

        console.log(data)

        if(data.length === 0) {

            return res.send({"msg" : "You have not created any note"});

        }
        console.log(data);
        res.send(data);
        console.log(req.payload);
    } catch (error) {
        console.log(error);
        res.status(500).send({err : error});
    }

    
}


const POST_AddNotes = async (req, res) => {

    try {

        const {title,body} = req.body;

        // user details who is making post request //

        const  {name,id,iat} = req.payload;

        const data_to_post = {title,body,author : name,userId : id};

        const adding_data = Notes_Model(data_to_post);

        await adding_data.save();

        res.send({"msg" : "Notes added successfully"})

    } catch (error) {
        console.log(error);
        res.send({err : error});
    }

};


const DELETE_Notes = async (req,res) => {

    try {
        let id = req.params.id;

        const data = await Notes_Model.findOne({_id : id});

        if(!data) {
            return res.status(404).send({err : "data not found"});
        }

        const userId = data.userId;
        const loggedInUser_id = req.payload.id;

        if(userId != loggedInUser_id) {
            return res.send({message : "You are not authorized to do this operation."})
        }

        const deleted_data = await Notes_Model.findByIdAndDelete(id);

        res.send({msg : 'data deleted successfully'});

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

}

const PATCH_UpdateNotes = async(req,res) =>{ 

    try {

        let id = req.params.id;

        const datatoupdate = req.body;

        const data = await Notes_Model.findOne({_id : id});

        if(!data) {
            return res.status(404).send({err : "data not found"});
        }

        const userId = data.userId;
        const loggedInUser_id = req.payload.id;

        if(userId != loggedInUser_id) {
            return res.send({message : "You are not authorized to do this operation."})
        }

        const updated_data = await Notes_Model.findByIdAndUpdate(id,datatoupdate,{new : true});

        res.send({msg : 'data Updated successfully', data : updated_data });

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }



} 

module.exports = {GET_Notes,POST_AddNotes,DELETE_Notes,PATCH_UpdateNotes}