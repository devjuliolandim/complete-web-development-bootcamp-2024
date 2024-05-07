const fs =  require("fs");
/*
fs.writeFile('message02.txt', 'Hi, its me again!!!', (err)=>{
    if(err) throw err;
    console.log("The file has been saved!");
})*/



fs.readFile('message02.txt','utf8',(err,data)=>{
    if(err) throw err;
    console.log(data);
})