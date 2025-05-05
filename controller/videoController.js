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

const getAllVideos = async (_args, context)=> {
    try {
        const user = context.user;
        const videos = await Video.find({ adminId: user.adminId });
        return videos;
    }catch (err) {
        console.error("Error to get videos:", err);
        throw new Error("Videos no found.");
    }
}

const searchVideo = async ({ restrictedUserId, playlistId, text }) => {
    try {
        const playlist = await PlayList.findOne({ _id: playlistId, restrictedUsers: restrictedUserId });

        if (!playlist) {
            throw new Error("La playlist no pertenece al usuario restringido.");
        }

        const query = {
            playLists: playlistId
        };

        if (text) {
            query.$or = [
                { name: { $regex: text, $options: "i" } },
                { description: { $regex: text, $options: "i" } }
            ];
        }

        const videos = await Video.find(query);

        return videos;
    } catch (error) {
        console.error("Error al obtener los videos:", error);
        throw new Error("No se pudieron obtener los videos.");
    }
}

module.exports = {
    getVideoById,
    getAllVideos,
    searchVideo
}