const { processHtml, correctServices } = require('../fix_footer_services');

describe('fix_footer_services', () => {
    test('replaces old services list with correct services', () => {
        const input = `<h4>Services</h4>
        <ul>
          <li><a href="something.html">Old</a></li>
        </ul>`;
        const result = processHtml(input);
        expect(result).toContain('<li><a href="painting.html">Painting</a></li>');
        expect(result).not.toContain('Old');
    });

    test('replaces social icons with svgs', () => {
        const input = `<i data-lucide="facebook"></i>`;
        const result = processHtml(input);
        expect(result).not.toContain('<i data-lucide="facebook"></i>');
        expect(result).toContain('<svg');
    });
});
