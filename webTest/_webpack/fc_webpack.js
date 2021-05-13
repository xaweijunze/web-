const fs = require('fs')

function creatAsset(fileName){
    const conent = fs.readFileSync(fileName ,"utf-8");

    console.log(conent);
}
creatAsset("./src/index.js")