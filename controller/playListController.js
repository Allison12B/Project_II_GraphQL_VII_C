const PlayList = require("../models/playList");
const RestrictedUser = require("../models/retrictedUser");
const AdminUser = require("../models/adminUser"); 
//const mongoose = require('mongoose'); 

const getPlayListByRestrictedUser = async ({ id }) => {
    try {
        //const playLists = await PlayList.find({restrictedUsers: new mongoose.Types.ObjectId(id)});
        const playLists = await PlayList.find({ restrictedUsers: id }).populate("restrictedUsers").populate("adminId");;
        return playLists;
    }catch (err) {
        console.error("Error to get restricted user:", err);
        throw new Error("Restricted user Id not fount.");
    }
}

module.exports = {
    getPlayListByRestrictedUser
}