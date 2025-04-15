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

const searchVideo = async ({ restrictedUserId, playlistId, text }) => {
    try {
        // Verificar que la playlist le pertenece al usuario restringido
        const playlist = await PlayList.findOne({ _id: playlistId, restrictedUsers: restrictedUserId });

        if (!playlist) {
            throw new Error("La playlist no pertenece al usuario restringido.");
        }

        // Crear query base para los videos relacionados a la playlist
        const query = {
            playLists: playlistId
        };

        // Si se proporciona texto, agregar búsqueda por nombre o descripción
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
    getVideoByPlayList,
    getAllVideos,
    searchVideo
}