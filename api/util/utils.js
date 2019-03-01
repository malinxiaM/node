const config = require("../config");

let util = {
    log : function(msg){
        if(config.debug){
            console.log(msg);
        }
    },
}

module.exports = util;