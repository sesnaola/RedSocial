const Users = (user) => {
    user.id = String;
    user.name = String;
    user.surname = String;
    user.password = String;
    user.mail = String;
    user.photo = String;
    user.admin = Boolean;
    user.creationDate = Number;
}

module.exports = { Users }