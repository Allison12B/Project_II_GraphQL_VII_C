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
        throw new Error("Video no found.");
    }
}

const getVideoByPlayList = async ({ id }) => {
    try{
        const videos = await Video.find({ playLists: id }).populate("playLists");
        return videos;
    }catch (err) {
        console.error("Error to get video of the play list:", err);
        throw new Error("Videos no found.");
    }
}

const getAllVideos = async ()=> {
    try {
        const videos = await Video.find();
        return videos;
    }catch (err) {
        console.error("Error to get videos:", err);
        throw new Error("Videos no found.");
    }
}

module.exports = {
    getVideoById,
    getVideoByPlayList,
    getAllVideos
}