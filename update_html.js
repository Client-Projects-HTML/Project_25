const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');

const faToLucideMap = {
    'fa-chevron-down': 'chevron-down',
    'fa-moon': 'moon',
    'fa-right-left': 'arrow-right-left',
    'fa-paint-roller': 'paint-roller',
    'fa-swatchbook': 'palette',
    'fa-clock': 'clock',
    'fa-shield-halved': 'shield-check',
    'fa-location-dot': 'map-pin',
    'fa-phone': 'phone',
    'fa-envelope': 'mail',
    'fa-arrow-up': 'arrow-up',
    'fa-facebook-f': 'facebook',
    'fa-instagram': 'instagram',
    'fa-pinterest-p': 'layout-dashboard', // fallback for pinterest
    'fa-stripe-s': 'credit-card',
    'fa-paypal': 'wallet',
    'fa-magnifying-glass': 'search',
    'fa-check': 'check',
    'fa-play': 'play',
    'fa-xmark': 'x'
};

function processHtml(content) {
    // 1. Add Favicon
    if (!content.includes('favicon.svg')) {
        content = content.replace('</title>', '</title>\n<link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">');
    }

    // 2. Add Logo image to the text logo
    content = content.replace(/class="logo">Bloom<span>Interiors<\/span><\/a>/g, 'class="logo" style="display:flex;align-items:center;"><img src="../assets/images/logo.svg" alt="Bloom Interiors" style="height:32px; width:auto; margin-right:8px;">Bloom<span>Interiors</span></a>');

    // 3. Replace FontAwesome CSS with Lucide JS
    content = content.replace(/<link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.1\/css\/all\.min\.css">/g, '');

    // 4. Add Lucide script if not present
    if (!content.includes('unpkg.com/lucide@latest')) {
        content = content.replace('</body>', '<script src="https://unpkg.com/lucide@latest"></script>\n<script>lucide.createIcons();</script>\n</body>');
    }

    // 5. Replace FontAwesome icons with Lucide
    content = content.replace(/<i class="fa-[a-z]+ fa-([a-z-]+)"(?: aria-hidden="true")?><\/i>/g, (match, iconName) => {
        let lucideIcon = faToLucideMap['fa-' + iconName] || iconName;
        return `<i data-lucide="${lucideIcon}"></i>`;
    });
    
    // Handle dropdown-arrow class and faq-toggle class if they were attached to the <i>
    content = content.replace(/<i class="fa-solid fa-chevron-down dropdown-arrow"><\/i>/g, '<i data-lucide="chevron-down" class="dropdown-arrow"></i>');
    content = content.replace(/<i class="fa-solid fa-chevron-down faq-toggle" aria-hidden="true"><\/i>/g, '<i data-lucide="chevron-down" class="faq-toggle"></i>');

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

            content = processHtml(content);

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${file}`);
        });
    });
}

module.exports = { processHtml, faToLucideMap };
