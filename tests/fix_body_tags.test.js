const { processHtml } = require('../fix_body_tags');

describe('fix_body_tags', () => {
    test('adds missing body closing tag', () => {
        const input = `<html>\n</html>`;
        const result = processHtml(input);
        expect(result).toContain('</body>\n</html>');
    });

    test('does not add body closing tag if already present', () => {
        const input = `<html>\n</body>\n</html>`;
        const result = processHtml(input);
        expect(result).toBe(input);
    });

    test('removes duplicated link tags in head', () => {
        const duplicateBlock = '<link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">\\n<meta name="description" content="The page you were looking for could not be found. Return to the Bloom Interiors homepage.">\\n<link rel="stylesheet" href="../assets/css/style.css">\\n<link rel="stylesheet" href="../assets/css/responsive.css">\\n<link rel="stylesheet" href="../assets/css/animation.css">\\n'.replace(/\\n/g, '\n');
        
        const input = duplicateBlock + '\n' + duplicateBlock;
        const result = processHtml(input);
        
        // it should remove one block
        const occurences = result.split('<link rel="icon"').length - 1;
        expect(occurences).toBe(1);
    });
});
