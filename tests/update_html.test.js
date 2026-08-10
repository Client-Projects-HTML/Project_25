const { processHtml } = require('../update_html');

describe('update_html', () => {
    test('adds favicon if missing', () => {
        const input = `<head>\n  <title>Bloom</title>\n</head>`;
        const result = processHtml(input);
        expect(result).toContain('<link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">');
    });

    test('replaces old logo with new logo html', () => {
        const input = `<div><a href="index.html" class="logo">Bloom<span>Interiors</span></a></div>`;
        const result = processHtml(input);
        expect(result).toContain('class="logo" style="display:flex;align-items:center;"');
        expect(result).toContain('<img src="../assets/images/logo.svg"');
    });

    test('replaces FontAwesome with Lucide', () => {
        const input = `<i class="fa-solid fa-moon"></i>\n<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">`;
        const result = processHtml(input);
        expect(result).toContain('<i data-lucide="moon"></i>');
        expect(result).not.toContain('all.min.css');
    });
});
