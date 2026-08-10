const { processHtml } = require('../add_contact_nav');

describe('add_contact_nav', () => {
    test('adds contact link if missing', () => {
        const input = `<a href="faq.html">Faq</a>`;
        const result = processHtml(input);
        expect(result).toContain('<a href="contact.html">Contact</a>');
    });

    test('does not add contact link if already present twice', () => {
        const input = `<a href="faq.html">Faq</a>\n<a href="contact.html">Contact</a>\n<footer><a href="contact.html">Contact</a></footer>`;
        const result = processHtml(input);
        // It shouldn't change the Faq string since it already has >= 2 Contacts
        expect(result).toBe(input);
    });
});
