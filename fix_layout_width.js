const fs = require('fs');
const path = require('path');

let comingSoonPath = path.join(__dirname, 'pages', 'coming-soon.html');
let comingSoon = fs.readFileSync(comingSoonPath, 'utf8');
comingSoon = comingSoon.replace('<section class="hero" style="padding:160px 0;">', '<section class="hero" style="padding:160px 0; width:100%;">');
fs.writeFileSync(comingSoonPath, comingSoon, 'utf8');

let errorPath = path.join(__dirname, 'pages', '404.html');
let errorHtml = fs.readFileSync(errorPath, 'utf8');
errorHtml = errorHtml.replace('<section class="section" style="text-align:center;padding:120px 0;">', '<section class="section" style="text-align:center;padding:120px 0; width:100%;">');
fs.writeFileSync(errorPath, errorHtml, 'utf8');
