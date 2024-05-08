import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const questions = [
{
    type: 'input',
    name: 'url',
    message: 'What is the url you want to save?'
}
];

inquirer.prompt(questions).then((answers)=>{
    const ans = answers.url;
    console.log(ans);

    const qr_png = qr.image(ans);
    qr_png.pipe(fs.createWriteStream('qr-img001.png'));

    fs.writeFile('URL-002.txt', ans, (err)=>{
        if(err) throw err;
        console.log('FILE SAVED!');
    })
})