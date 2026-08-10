const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');

function processHtml(content) {
    if (!content.includes('<a href="contact.html">Contact</a>') || 
        (content.match(/<a href="contact\.html">Contact<\/a>/g) || []).length < 2) { 
        content = content.replace(/<a href="faq\.html">Faq<\/a>/g, '<a href="faq.html">Faq</a>\n      <a href="contact.html">Contact</a>');
    }
    return content;
}

if (require.main === module) {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        
        files.forEach(function (file) {
            if (!file.endsWith('.html')) return;
            const filePath = path.join(directoryPath, file);
            let content = fs.readFileSync(filePath, 'utf8');

            let updatedContent = processHtml(content);

            if (content !== updatedContent) {
                fs.writeFileSync(filePath, updatedContent, 'utf8');
                console.log(`Added contact link to ${file}`);
            }
        });
    });
}

module.exports = { processHtml };
