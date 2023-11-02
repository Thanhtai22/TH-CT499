const ApiError = require("../api-error");
const ContactService = require("../services/contact.sevice");
// const ContactService = require("../services/contact.sevice");    
// const ContactService = require("../services/contact.sevice");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "name can not be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, " an error occurred while creating the contact")
        );
    }
};
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await contactService.findByName(name);

        } else {
            documents = await contactService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, " An error occoured while retrivieving contacts")
        );
    }
    return res.send(documents);
}
exports.delete = async (req, res, next) => {

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "contact not found"));
        }
        return res.send({message:"Contacts was deleted successfully"});

    } catch (error) {
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not  be empty"));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "contact not found"));

        }
        return res.send({ message: "contacts was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id= ${req.params.id}`)
        );
    }
}
exports.findALlFavorite = async (req,res,next)=>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.findALlFavorite();
        return res.send(documents)
    }catch (error){
        return next (
            new ApiError(
                500,
                "An error occured while retrieting favorite contacts" 
                )
        );
    }
}
exports.deleteAll = async (req,res,next)=>{
    try{
        const contactService = new ContactService(MongoDB.client);
        const documents = await contactService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully` ,
        });
    }catch (error){
        return next (
            new ApiError(
                500,
                "An error occured while remove all contacts" 
                )
        );
    }
}

exports.create = (req, res) => {
    res.send({ message: "Create handler" });
};
exports.findAll = (req, res) => {
    res.send({ message: "findAll handler" });
};
exports.findOne = (req, res) => {
    res.send({ message: "findOne handler" });
};
exports.update = (req, res) => {
    res.send({ message: "update handler" });
};
exports.delete = (req, res) => {
    res.send({ message: "delete handler" });
};
exports.deleteAll = (req, res) => {
    res.send({ message: "deleteAll handler" });
};
exports.findALlFavorite = (req, res) => {
    res.send({ message: "findALlFavorite handler" });
};

