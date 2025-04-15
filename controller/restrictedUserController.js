const RestrictedUser = require("../models/retrictedUser") // Importar el modelo de usuario restringidos

const getRestrictedUserByAdmin = async ({ id }) => {
    try {
        const restrictedUsers = await RestrictedUser.find({ adminId: id }).populate('adminId');
        return restrictedUsers;
    } catch (err) {
        console.error("Error al obtener los usuarios restringidos:", err);
        throw new Error("No se pudieron obtener los usuarios restringidos.");
    }
};

module.exports = {
    getRestrictedUserByAdmin
}
