const { processHtml } = require('../update_footer');

describe('update_footer', () => {
    test('updates logo and quick links', () => {
        const input = `<h4>Bloom Interiors</h4>
        <p style="font-size:14px;color:#bbb;margin-bottom:14px;">Making homes beautiful</p>
        <i data-lucide="layout-dashboard"></i>
        aria-label="Pinterest"
        <h4>Quick Links</h4>
        <ul>
          <li><a href="old.html">Old</a></li>
        </ul>
        <h4>Contact</h4>
        <ul><li>Something</li></ul>`;
        
        const result = processHtml(input);
        expect(result).toContain('<img src="../assets/images/logo.svg"');
        expect(result).toContain('<li><a href="pricing.html">Pricing</a></li>');
        expect(result).toContain('<li style="display:flex;align-items:center;gap:10px;">Something</li>');
        expect(result).toContain('<i data-lucide="youtube"></i>');
    });
});
