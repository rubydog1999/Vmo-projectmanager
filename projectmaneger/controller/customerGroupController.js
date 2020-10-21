const { array } = require('joi');
const CustomerGroup = require('../model/customerGroupModel')
const createNewCustomerGroup = async (req, res) => {
    try {
        const CustomerGroupExit = await CustomerGroup.findOne({ name: req.body.name });
        if (CustomerGroupExit) return res.status(404).send({
            status: 404,
            code: 'PROJECT_STATUS_EXIT',
            error: true,
        })
        //create data
        const newCustomerGroup = await CustomerGroup.create({
            name: req.body.name,
            description: req.body.description,
            priority : req.body.priority,
            status: req.body.status
        });
        if (newCustomerGroup) return res.status(200).send({
            status: 200,
            code: 'CREATE_NEW_PROJECT_STATUS_SUCCESS',
            error: false,
            data: newCustomerGroup._id,
        })
    } catch (err) {
        res.status(400).send(err);
    }
};


const getCustomerGroup = async (req, res) => {
    try {
        const CustomerGroupExit = await CustomerGroup.findOne({ _id: req.params.id });
        if (!CustomerGroupExit) return res.status(404).send({
            status: 404,
            message: 'PROJECT_STATUS_IS_NOT_FOUND'
        })
        res.send(CustomerGroupExit);
    } catch (err) {
        res.status(400).send(err);  
    }
};
const  getListCustomerGroup  =  async (req,res)=>{  
    try{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const result= await CustomerGroup.find().skip(startIndex).limit(endIndex)
        res.send(result)  
    }
    catch (err){
        res.status(400).send(err);  
    }
}

const updateCustomerGroup = async (req, res) => {
    try {
        const getCustomerGroup = await CustomerGroup.updateOne({ _id: req.params.id },
            {
            $set:{
                name: req.body.name,
                description: req.body.description,
                priority: req.body.priority,
                status:req.body.status
            }
            },
        );
        res.status(200).send(
            {   
                status:200,
                message: "Update access",
                data: getCustomerGroup
            })
        return;
    }
    catch (err) {
        res.status(400).send(err);
    }
}
const deleteCustomerGroup = async (req,res) => {
    try {
      const CustomerGroupDelete = await CustomerGroup.findOne({ _id: req.params.id });
      if (!CustomerGroupDelete) {
        res.status(404).send({
          status: 404,
          code: 'PROJECT_STATUS_IS_NOT_FOUND',
          error: true,
        });
      }
    await CustomerGroup.remove({ _id: req.params.id })
    res.status(200).send( {
        status: 200,
        code: 'PROJECT_STATUS_DELETE_SUCCESS',
        error: false,
      });
    }catch( err ){
        res.status(400).send(err);
    }
  };

module.exports.createNewCustomerGroup = createNewCustomerGroup
module.exports.getCustomerGroup = getCustomerGroup
module.exports.getListCustomerGroup = getListCustomerGroup  
module.exports.updateCustomerGroup = updateCustomerGroup
module.exports.deleteCustomerGroup = deleteCustomerGroup