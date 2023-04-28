const {User_Model} = require('../Model/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const GET_Users = async(req,res) => {

    try {
        const data = await User_Model.find();
        res.send( data ); 
    } catch (error) {
        console.log(error);
        res.status(500).send({err : error});
    }

};

const POST_AddUsers = async(req,res) => {

    try {
        let {email,name,password} = req.body;

        const hashed_password = await bcrypt.hash(password,10);

        password = hashed_password;

        const posting_data = new User_Model({name,email,password});

        await posting_data.save();

        res.send({"msg" : "Data saved successfully"});

        const indexes = await User_Model.listIndexes();
        console.log(indexes);

        console.log(hashed_password);

    } catch (error) {
        console.log(error)
        res.status(500).send({err : error});
    }

}; 

const POST_LoginUsers = async (req, res) => {

    try {

        const {email,password} = req.body;
        const data = await User_Model.findOne({email});

        if(!data){
            return res.send('Data not found');
        }

        bcrypt.compare(password,data.password,(err,result) =>{

            if(!result) {
                return res.send('Please enter the correct password');
            }

            const PRIVATE_KEY = process.env.PRIVATE_KEY;
            const token = jwt.sign({name : data.name, id : data._id},PRIVATE_KEY);
            res.send({token : token});
        })

    } catch (error) {
        console.log(error);
        res.send(error);
    }





}


module.exports = {GET_Users,POST_AddUsers,POST_LoginUsers};