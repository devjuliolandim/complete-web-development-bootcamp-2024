/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer'
import qr from 'qr-image';
import fs from 'fs';

const questions = [
    {
        type: 'input',
        name: 'name', 
        message: 'what is the URL?'
    }
];

inquirer.prompt(questions).then(answers =>{
    const url = answers.name;
    console.log(url);

    const qrCode = qr.imageSync(url, {type: 'png'});

    fs.writeFileSync('qrcode.png', qrCode);

    console.log('QRCode saved!');
})
