const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');

fs.readdir(directoryPath, function (err, files) {
    if (err) return console.log('Unable to scan directory: ' + err);
    
    files.forEach(function (file) {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let updatedContent = content;

        // Revert to natural sounding template names
        updatedContent = updatedContent.replace(/>404 Page<\/a>/g, '>Packages</a>');
        updatedContent = updatedContent.replace(/>Coming Soon<\/a>/g, '>Lookbook</a>');

        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated link names in ${file}`);
        }
    });
});
