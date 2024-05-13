const mongoose = require("mongoose");
const { schema } = require('../schemas/destinations.schema');
const dest = mongoose.model("destination", schema);
const User = require('../schemas/users.schema');
const ObjectId = mongoose.Types.ObjectId;

async function create(City, Country, Description, ImgURL, Review, Category) {

    return await dest.create({
        city: City,
        country: Country,
        description: Description,
        imageURL: ImgURL,
        review: Review,
        categories: Category
    })
}

async function getAll() {

    let destinations = await dest.find();
    return destinations;
}

async function getByID(id) {

    let destinations = await dest.findById(id);
    return destinations;
}

async function update(id, City, Country, Description, ImgURL, Review, Category) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await dest.findByIdAndUpdate(id, {
        city: City,
        country: Country,
        description: Description,
        imageURL: (ImgURL !== "" ? ImgURL : destination.ImgURL),
        review: Review,
        categories: Category
    }, {
        new: true
    });
}

async function remove(id) {

    if (mongoose.isValidObjectId(id)) {
        return await dest.findByIdAndDelete(id);
    }

    return null;
}

async function addComment(destinationId, comment) {
    try {
        const user = await User.findById(comment.user);
        if (!user) {
            throw new Error('Korisnik nije pronađen.');
        }

        const commentWithUsername = { 
            user: comment.user, 
            username: user.username, 
            message: comment.message 
        };

        const updatedDestination = await dest.findByIdAndUpdate(destinationId, {
            $push: { comments: commentWithUsername }
        }, { new: true });

        return updatedDestination;
    } catch (error) {
        console.error('Greška prilikom dodavanja komentara:', error);
        throw error;
    }
}

async function getAllWithComments() {
    return await dest.find().populate('comments.user', 'username');
}

async function updateWithComment(destinationId, commentId, message) {
    return await dest.findOneAndUpdate(
        { _id: destinationId, 'comments._id': commentId },
        { $set: { 'comments.$.message': message } },
        { new: true }
    );
}

async function getDestinationWithComments(id) {
    return await Destination.findById(id).populate('comments.user', 'username');
}

async function deleteComment(destinationId, commentId) {
    return await dest.findByIdAndUpdate(destinationId, {
        $pull: { comments: { _id: commentId } }
    });
}

module.exports.create = create;
module.exports.getAll = getAll;
module.exports.getByID = getByID;
module.exports.update = update;
module.exports.delete = remove;
module.exports.addComment = addComment;
module.exports.getAllWithComments = getAllWithComments;
module.exports.updateWithComment = updateWithComment;
module.exports.getDestinationWithComments = getDestinationWithComments;
module.exports.deleteComment = deleteComment;