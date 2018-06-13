const fs = require('fs');

class Tool{
    static moment(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth().toString().length>1?date.getMonth():'0'+date.getMonth();
        let day = date.getDate().toString().length>1?date.getDate():'0'+date.getDate();

        return `${year}${month}${day}`;
    }
    static mkdirFolder(path){
        if(!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
    }
    static mkdirFile(path,data){
        if(fs.existsSync(path)){
            fs.writeFileSync(`${path}/data.json`, JSON.stringify(data));
        }
    }
    static emptyFolder(path){
        if(fs.existsSync(path)){
            let files = fs.readdirSync(path);
            files.forEach(function(file){
                var curPath = path + "/" + file;
                fs.unlinkSync(curPath);
            });
        }
    }
}

module.exports = Tool;