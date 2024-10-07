let admin = null;

function setAdmin(newAdmin) {
    admin = newAdmin;
}

function getAdmin() {
    return admin;
}

module.exports = {
    setAdmin,
    getAdmin
};