const RestrictedUser = require("../models/retrictedUser");
const AdminUser = require("../models/adminUser"); 

const getRestrictedUserByAdmin = async ({ id }) => {
    try {
        const restrictedUsers = await RestrictedUser.find({ adminId: id }).populate('adminId'); // ahora sí puede hacer populate
        return restrictedUsers;
    } catch (err) {
        console.error("Error al obtener los usuarios restringidos:", err);
        throw new Error("No se pudieron obtener los usuarios restringidos.");
    }
};

const getRestrictedUserById = async ({ id }) => {
    try {
        const restrictedUser = await RestrictedUser.findById(id);
        return restrictedUser;
    } catch (err) {
        console.error("Error when try to get restricted user by Id:", err);
        throw new Error("Id not found.");
    }
};

module.exports = {
    getRestrictedUserByAdmin,
    getRestrictedUserById
}
