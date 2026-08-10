const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');

const correctServices = `<h4>Services</h4>
        <ul>
          <li><a href="painting.html">Painting</a></li>
          <li><a href="wallpaper.html">Wallpaper</a></li>
          <li><a href="furniture.html">Furniture</a></li>
          <li><a href="curtains.html">Curtains &amp; Blinds</a></li>
          <li><a href="lighting.html">Lighting</a></li>
        </ul>`;

const fbSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>`;
const igSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>`;
const ytSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>`;


function processHtml(content) {
    let updatedContent = content;

    // Fix Services links
    const servicesRegex = /<h4>Services<\/h4>\s*<ul>.*?<\/ul>/s;
    updatedContent = updatedContent.replace(servicesRegex, correctServices);

    // Fix social icons
    updatedContent = updatedContent.replace(/<i data-lucide="facebook"><\/i>/g, fbSvg);
    updatedContent = updatedContent.replace(/<i data-lucide="instagram"><\/i>/g, igSvg);
    updatedContent = updatedContent.replace(/<i data-lucide="youtube"><\/i>/g, ytSvg);

    return updatedContent;
}

if (require.main === module) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) return console.log('Unable to scan directory: ' + err);
        
        files.forEach(function (file) {
            if (!file.endsWith('.html')) return;
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');
            
            let updatedContent = processHtml(content);

            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Updated footer services/icons in ${file}`);
            }
        });
    });
}

module.exports = { processHtml, correctServices, fbSvg, igSvg, ytSvg };
