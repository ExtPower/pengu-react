const fs = require('fs-extra');
const path = require('path');
copyToStatic()
function copyToStatic() {
    fs.copySync(path.join(__dirname, "../build"), path.join(__dirname, "../server/static"));
    console.log("done");
}