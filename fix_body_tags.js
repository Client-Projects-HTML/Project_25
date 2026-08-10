const fs = require('fs');
const path = require('path');

function processHtml(content) {
    // Add back the missing </body>
    if (!content.includes('</body>')) {
        content = content.replace('</html>', '</body>\n</html>');
    }

    // Remove duplicated header blocks if they exist (happened in 404.html)
    const duplicateBlock = '<link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">\r\n<meta name="description" content="The page you were looking for could not be found. Return to the Bloom Interiors homepage.">\r\n<link rel="stylesheet" href="../assets/css/style.css">\r\n<link rel="stylesheet" href="../assets/css/responsive.css">\r\n<link rel="stylesheet" href="../assets/css/animation.css">\r\n';
    
    // Add \n fallback for unix-style lines
    const duplicateBlockUnix = '<link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">\n<meta name="description" content="The page you were looking for could not be found. Return to the Bloom Interiors homepage.">\n<link rel="stylesheet" href="../assets/css/style.css">\n<link rel="stylesheet" href="../assets/css/responsive.css">\n<link rel="stylesheet" href="../assets/css/animation.css">\n';
    
    if (content.indexOf(duplicateBlock) !== content.lastIndexOf(duplicateBlock)) {
        content = content.replace(duplicateBlock, ''); // replace only the first occurrence
    } else if (content.indexOf(duplicateBlockUnix) !== content.lastIndexOf(duplicateBlockUnix)) {
        content = content.replace(duplicateBlockUnix, '');
    }

    return content;
}

if (require.main === module) {
    ['404.html', 'coming-soon.html'].forEach(file => {
        const filePath = path.join(__dirname, 'pages', file);
        let content = fs.readFileSync(filePath, 'utf8');

        let updatedContent = processHtml(content);
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Cleaned up ${file}`);
        }
    });
}

module.exports = { processHtml };
