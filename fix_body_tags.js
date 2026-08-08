const fs = require('fs');
const path = require('path');

['404.html', 'coming-soon.html'].forEach(file => {
    const filePath = path.join(__dirname, 'pages', file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add back the missing </body>
    if (!content.includes('</body>')) {
        content = content.replace('</html>', '</body>\n</html>');
    }

    // Remove duplicated header blocks if they exist (happened in 404.html)
    const duplicateBlock = '<link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">\r\n<meta name="description" content="The page you were looking for could not be found. Return to the Bloom Interiors homepage.">\r\n<link rel="stylesheet" href="../assets/css/style.css">\r\n<link rel="stylesheet" href="../assets/css/responsive.css">\r\n<link rel="stylesheet" href="../assets/css/animation.css">\r\n';
    
    if (content.indexOf(duplicateBlock) !== content.lastIndexOf(duplicateBlock)) {
        content = content.replace(duplicateBlock, ''); // replace only the first occurrence
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned up ${file}`);
});
