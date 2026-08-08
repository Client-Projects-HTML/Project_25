const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'pages');

const oldFooter = `      <div>
        <h4>Bloom Interiors</h4>
        <p style="font-size:14px;color:#bbb;margin-bottom:14px;">Making homes beautiful, one room at a time.</p>
        <form id="newsletterForm" novalidate>
          <div class="form-group" style="margin-bottom:8px;">
            <label for="newsletterEmail" style="color:#ddd;">Get design tips by email</label>
            <input type="email" id="newsletterEmail" name="newsletterEmail" placeholder="you@example.com" required>
            <span class="field-error"></span>
          </div>
          <button type="submit" class="btn" style="padding:9px 18px;font-size:13px;">Subscribe</button>
          <div class="form-message" id="newsletterFormMessage"></div>
        </form>
        <div class="social-icons" style="margin-top:16px;">
          <a href="#" aria-label="Facebook"><i data-lucide="facebook"></i></a>
          <a href="#" aria-label="Instagram"><i data-lucide="instagram"></i></a>
          <a href="#" aria-label="Pinterest"><i data-lucide="layout-dashboard"></i></a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="gallery.html">Gallery</a></li>

          <li><a href="contact.html">Contact</a></li>
          <li><a href="404.html">Packages</a></li>
          <li><a href="coming-soon.html">Lookbook</a></li>
        </ul>`;

const newFooter = `      <div>
        <a href="index.html" class="logo" style="display:flex;align-items:center;margin-bottom:16px;font-size:20px;"><img src="../assets/images/logo.svg" alt="Bloom Interiors" style="height:28px; width:auto; margin-right:8px;">Bloom<span style="font-weight:400;">Interiors</span></a>
        <p style="font-size:14px;color:var(--text-muted);margin-bottom:14px;">Making homes beautiful, one room at a time.</p>
        <form id="newsletterForm" novalidate>
          <div class="form-group" style="margin-bottom:8px;">
            <label for="newsletterEmail" style="color:var(--dark-text);">Get design tips by email</label>
            <input type="email" id="newsletterEmail" name="newsletterEmail" placeholder="you@example.com" required>
            <span class="field-error"></span>
          </div>
          <button type="submit" class="btn" style="padding:9px 18px;font-size:13px;">Subscribe</button>
          <div class="form-message" id="newsletterFormMessage"></div>
        </form>
        <div class="social-icons" style="margin-top:16px;">
          <a href="#" aria-label="Facebook"><i data-lucide="facebook"></i></a>
          <a href="#" aria-label="Instagram"><i data-lucide="instagram"></i></a>
          <a href="#" aria-label="Youtube"><i data-lucide="youtube"></i></a>
        </div>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="pricing.html">Pricing Packages</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>`;

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    
    files.forEach(function (file) {
        if (!file.endsWith('.html')) return;
        const filePath = path.join(directoryPath, file);
        let content = fs.readFileSync(filePath, 'utf8');

        // Regex approach since white space might vary slightly between files
        let updatedContent = content;
        
        // 1. Replace <h4>Bloom Interiors</h4> with Logo and remove inline colors
        updatedContent = updatedContent.replace(
            /<h4>Bloom Interiors<\/h4>\s*<p style="font-size:14px;color:#bbb;margin-bottom:14px;">/g, 
            `<a href="index.html" class="logo" style="display:flex;align-items:center;margin-bottom:16px;font-size:24px;font-weight:600;color:var(--dark-text);text-decoration:none;"><img src="../assets/images/logo.svg" alt="Bloom Interiors" style="height:32px; width:auto; margin-right:8px;">Bloom<span style="font-weight:400;">Interiors</span></a>\n        <p style="font-size:14px;color:var(--text-muted);margin-bottom:14px;">`
        );
        
        updatedContent = updatedContent.replace(
            /color:#ddd;/g,
            `color:var(--dark-text);`
        );

        updatedContent = updatedContent.replace(
            /<i data-lucide="layout-dashboard"><\/i>/g,
            `<i data-lucide="youtube"></i>`
        );
        updatedContent = updatedContent.replace(
            /aria-label="Pinterest"/g,
            `aria-label="Youtube"`
        );

        // Replace Quick links block entirely using regex to match from <h4>Quick Links</h4> to </ul>
        const quickLinksRegex = /<h4>Quick Links<\/h4>\s*<ul>\s*<li>.*?<\/ul>/s;
        updatedContent = updatedContent.replace(quickLinksRegex, `<h4>Quick Links</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="pricing.html">Pricing</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="blog.html">Blog</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>`);
        
        // Let's add gap to the Contact ul li items for the icons to look nicer
        const contactRegex = /<h4>Contact<\/h4>\s*<ul>(.*?)<\/ul>/s;
        const contactMatch = updatedContent.match(contactRegex);
        if (contactMatch) {
            let listContent = contactMatch[1];
            listContent = listContent.replace(/<li>/g, '<li style="display:flex;align-items:center;gap:10px;">');
            updatedContent = updatedContent.replace(contactRegex, `<h4>Contact</h4>\n        <ul>${listContent}</ul>`);
        }
        
        if (content !== updatedContent) {
            fs.writeFileSync(filePath, updatedContent, 'utf8');
            console.log(`Updated footer in ${file}`);
        }
    });
});
