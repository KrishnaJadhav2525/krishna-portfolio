const fs = require('fs');
const pdfModule = require('pdf-parse');
const pdf = pdfModule.default || pdfModule;

let dataBuffer = fs.readFileSync('e:\\krishna-portfolio\\Krishna_Jadhav_Resume_Final.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(err => console.error(err));
