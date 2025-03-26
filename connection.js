const mongoose = require('mongoose');

async function mongodbConnect(url) {
    return mongoose.connect(url);
}

module.exports= {mongodbConnect};