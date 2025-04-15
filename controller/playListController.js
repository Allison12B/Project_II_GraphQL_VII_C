const PlayList = require("../models/playList");
const RestrictedUser = require("../models/retrictedUser");
const AdminUser = require("../models/adminUser"); 
//const mongoose = require('mongoose'); 

const getPlayListByRestrictedUser = async ({ id }) => {
    try {
        //const playLists = await PlayList.find({restrictedUsers: new mongoose.Types.ObjectId(id)});
        const playLists = await PlayList.find({ restrictedUsers: id }).populate("restrictedUsers").populate("adminId");
        return playLists;
    }catch (err) {
        console.error("Error to get play list of this restricted user:", err);
        throw new Error("Play list of restricted user Id not fount.");
    }
}

const getPlayListByAdminUser = async ({ id }) => {
    try {
        const playlists = await PlayList.find({ adminId: id }).populate("restrictedUsers").populate("adminId");
        return playlists;
    }catch (err) {
        console.error("Error to get play list by admin user:", err);
        throw new Error("Play list of the admin user Id not fount.");
    }
}

const getPlayListById = async ({ id }) => {
    try {
        const playlist = await PlayList.findById(id).populate("restrictedUsers").populate("adminId");
        return playlist;
    }catch (err) {
        console.error("Error to get a play list by id:", err);
        throw new Error("Play list not fount.");
    }
}

module.exports = {
    getPlayListByRestrictedUser,
    getPlayListByAdminUser,
    getPlayListById
}