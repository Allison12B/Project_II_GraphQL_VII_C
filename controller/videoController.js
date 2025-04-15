const Video = require("../models/video");
const PlayList = require("../models/playList");
const RestrictedUser = require("../models/retrictedUser");
const AdminUser = require("../models/adminUser"); 

const getVideoById = async ({ id }) => {
    try{
        const video = await Video.findById(id);
        return video;
    }catch (err) {
        console.error("Error to get video:", err);
        throw new Error("Video no foound.");
    }
}

module.exports = {
    getVideoById
}