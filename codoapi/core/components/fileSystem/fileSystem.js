const fs = require("fs");

//TODO: use only this module to interact with file system
const fileSystem = {
    mkdir(path) {
        try {
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
        } catch (err) {
            console.error(err)
        }
    },
    rmir(path) {
        try {
            if (fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }
        } catch (err) {
            console.error(err)
        }
    },
    listOfFiles(path) {
        fs.readdir(path, (err, files) => {
            if (err) return;

            files.forEach(file => {
                console.log(file);
            });
        });
    }
}

module.exports = fileSystem;

