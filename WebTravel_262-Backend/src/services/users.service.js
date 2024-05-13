const mongoose = require("mongoose");
const { schema } = require('../schemas/users.schema');
const user = mongoose.model("user", schema);

async function create(fName, lName, Username, Password) {

    return await user.create({
        firstName: fName,
        lastName: lName,
        username: Username,
        password: Password,
        role: 'user',
    })
}

async function getByID(id) {

    let users = await user.findById(id);
    return users;
}

async function getAll() {

    let users = await user.find();
    return users;
}

async function update(id, fName, lName, Username, Password) {
    if (!mongoose.isValidObjectId(id)) {
        return null;
    }

    return await user.findByIdAndUpdate(id, {
        firstName: fName,
        lastName: lName,
        username: Username,
        password: Password,
    }, {
        new: true
    });
}

async function remove(id) {

    if (mongoose.isValidObjectId(id)) {
        return await user.findByIdAndDelete(id);
    }

    return null;
}

async function loginUser(username, pass){
    if(username == undefined || pass == undefined){
        return;
    }
    return await user.findOne({username: username, password: pass});
}

async function changeUserStatus(id, isActive) {
        if (!mongoose.isValidObjectId(id)) {
            return null;
        }
    
        return await user.findByIdAndUpdate(id, { status: isActive }, { new: true });
    }

module.exports.create = create;
module.exports.getByID = getByID;
module.exports.getAll = getAll;
module.exports.update = update;
module.exports.delete = remove;
module.exports.loginUser = loginUser;
module.exports.changeUserStatus = changeUserStatus;