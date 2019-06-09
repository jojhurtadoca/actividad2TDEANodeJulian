var fs = require('fs');
const path = require('path');
const add = (path1, courseData,msg ,errormsg) =>{
    try {
        fs.writeFileSync(path.join(__dirname,path1), JSON.stringify(courseData),'utf8');
        return msg;
    } catch(err) {
        return errormsg;
    }
}

const list = (path1, errormsg) =>{
    try{
        if(fileExists(path.join(__dirname,path1))){
            try{
                return require(path.join(__dirname,path1));
            }catch(err){
                return null;
            }
        }else{
            return null;
        }
    }catch(error){
        return errormsg;
    }
}

module.exports = {
    add,
    list
}

function fileExists(filePath)
{
    try
    {
        return fs.statSync(filePath).isFile();
    }
    catch (err)
    {
        return false;
    }
}