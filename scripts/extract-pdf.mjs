import fs from 'fs';
import pdfParse from 'pdf-parse';

let dataBuffer = fs.readFileSync('e:\\krishna-portfolio\\Krishna_Jadhav_Resume_Final.pdf');

(pdfParse.default || pdfParse)(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(err => console.error(err));
