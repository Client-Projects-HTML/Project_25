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

        const quickLinksRegex = /<h4>Quick Links<\/h4>\s*<ul>.*?<\/ul>/s;
        
        let newQuickLinks = `<h4>Quick Links</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="404.html">Packages</a></li>
          <li><a href="coming-soon.html">Lookbook</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>`;

        const updatedContent = content.replace(quickLinksRegex, newQuickLinks);

        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated quick links in ${file}`);
        }
    });
});
