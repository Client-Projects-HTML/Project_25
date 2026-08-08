const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    
    files.forEach(function (file) {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Check if Contact is already there to avoid duplicates
        if (!content.includes('<a href="contact.html">Contact</a>') || 
            (content.match(/<a href="contact\.html">Contact<\/a>/g) || []).length < 2) { 
            // the footer has one contact link. So if length < 2, it's missing in nav.

            // Let's just insert it right after the faq.html line.
            content = content.replace(/<a href="faq\.html">Faq<\/a>/g, '<a href="faq.html">Faq</a>\n      <a href="contact.html">Contact</a>');
            
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Added contact link to ${file}`);
        }
    });
});
