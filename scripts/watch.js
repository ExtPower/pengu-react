const fs = require('fs-extra');
const path = require('path');
copyToStatic()
function copyToStatic() {
    fs.copySync(path.join(__dirname, "../build"), path.join(__dirname, "../server/static"));
    fs.rename(path.join(__dirname, "../server/static/index.html"), path.join(__dirname, "../server/static/website.html"), function () {


        console.log("done");
    })
}