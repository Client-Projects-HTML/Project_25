# bulk_update_pages.ps1
# Updates footer, nav and script tags for all remaining Bloom Interiors pages
# Run from: d:\Project_25

$pagesDir = ".\pages"

# ── Standard footer ──────────────────────────────────────────
$standardFooter = @'
<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-logo-col">
        <a href="index.html" class="footer-logo"><img src="../assets/images/logo.svg" alt="Bloom Interiors">Bloom<span>Interiors</span></a>
        <p class="footer-tagline">Making homes beautiful, one room at a time. Expert painting, wallpaper &amp; decor since 2012.</p>
        <div class="footer-newsletter">
          <form id="newsletterForm" novalidate>
            <div class="form-group"><label for="newsletterEmail">Get design tips by email</label><input type="email" id="newsletterEmail" name="newsletterEmail" placeholder="you@example.com" required><span class="field-error"></span></div>
            <button type="submit" class="btn">Subscribe</button>
            <div class="form-message" id="newsletterFormMessage"></div>
          </form>
        </div>
        <div class="social-icons">
          <a href="#" aria-label="Facebook"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
          <a href="#" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
          <a href="#" aria-label="YouTube"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></a>
        </div>
      </div>
      <div><h4>Quick Links</h4><ul><li><a href="about.html">About Us</a></li><li><a href="services.html">Services</a></li><li><a href="gallery.html">Gallery</a></li><li><a href="projects.html">Projects</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="contact.html">Contact</a></li></ul></div>
      <div><h4>Services</h4><ul><li><a href="painting.html">Painting</a></li><li><a href="wallpaper.html">Wallpaper</a></li><li><a href="furniture.html">Furniture</a></li><li><a href="curtains.html">Curtains &amp; Blinds</a></li><li><a href="lighting.html">Lighting</a></li><li><a href="faq.html">FAQ</a></li></ul></div>
      <div><h4>Contact Us</h4>
        <div class="footer-contact-item"><i data-lucide="map-pin"></i><span>12 MG Road, Hyderabad, Telangana, India</span></div>
        <div class="footer-contact-item"><i data-lucide="phone"></i><span>+91 98765 43210</span></div>
        <div class="footer-contact-item"><i data-lucide="mail"></i><span>hello@bloominteriors.com</span></div>
        <div class="footer-contact-item"><i data-lucide="clock"></i><span>Mon&ndash;Sat: 9 AM &ndash; 7 PM</span></div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2026 Bloom Interiors. All rights reserved. | <a href="privacy-policy.html">Privacy Policy</a> | <a href="terms.html">Terms</a></span>
      <div class="footer-credit"><span>Developed by <strong>Abhivorn Technologies Pvt Ltd</strong></span></div>
    </div>
  </div>
</footer>
'@

# ── Standard header/nav ───────────────────────────────────────
$standardHeader = @'
<header id="mainHeader">
  <div class="container navbar">
    <a href="index.html" class="logo"><img src="../assets/images/logo.svg" alt="Bloom Interiors logo">Bloom<span>Interiors</span></a>
    <nav class="nav-links" id="navLinks" aria-label="Primary navigation">
      <div class="dropdown">
        <a href="index.html" class="dropdown-toggle" aria-haspopup="true" aria-expanded="false">Home <i data-lucide="chevron-down" class="dropdown-arrow"></i></a>
        <div class="dropdown-menu"><a href="index.html">Home 1</a><a href="Home-2.html">Home 2</a></div>
      </div>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="gallery.html">Gallery</a>
      <a href="projects.html">Projects</a>
      <a href="faq.html">FAQ</a>
      <a href="contact.html">Contact</a>
      <a href="consultation.html" class="btn nav-mobile-cta">Book Consultation</a>
    </nav>
    <div class="utility-toggles">
      <button class="toggle-btn" id="themeToggle" aria-label="Toggle dark mode"><i data-lucide="moon"></i></button>
      <button class="toggle-btn" id="dirToggle" aria-label="Toggle right-to-left layout"><i data-lucide="arrow-right-left"></i></button>
    </div>
    <a href="consultation.html" class="btn">Book Consultation</a>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false"><span></span><span></span><span></span></button>
  </div>
</header>
'@

# ── Standard scripts ─────────────────────────────────────────
$standardScripts = @'
<script src="../assets/js/main.js"></script>
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<script>lucide.createIcons();</script>
'@

# ── OG tag block to insert after <meta name="description"> ───
$ogBlock = @'
<meta property="og:image" content="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
'@

# ── Pages to update ──────────────────────────────────────────
$pagesToUpdate = @(
  'consultation.html',
  'gallery.html',
  'projects.html',
  'faq.html',
  'blog.html',
  'blog-details.html',
  'painting.html',
  'wallpaper.html',
  'furniture.html',
  'curtains.html',
  'lighting.html',
  'pricing.html',
  'testimonials.html',
  'enquiry.html',
  'privacy-policy.html',
  'terms.html'
)

foreach ($page in $pagesToUpdate) {
  $filePath = Join-Path $pagesDir $page
  if (-not (Test-Path $filePath)) {
    Write-Host "SKIP (not found): $page"
    continue
  }

  $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

  # 1. Replace <footer>...</footer> with standard footer
  $content = [regex]::Replace($content, '(?s)<footer>.*?</footer>', $standardFooter.Trim())

  # 2. Replace <header id="mainHeader">...</header> with standard header
  $content = [regex]::Replace($content, '(?s)<header id="mainHeader">.*?</header>', $standardHeader.Trim())

  # 3. Update logo link inside header (ensure logo is correct)
  $content = $content -replace 'style="display:flex;align-items:center;"', ''
  $content = $content -replace 'style="height:32px; width:auto; margin-right:8px;"', ''
  $content = $content -replace 'style="margin-left:14px;"', ''

  # 4. Fix old script tag (replace old lucide CDN with minified version)
  $content = $content -replace 'https://unpkg\.com/lucide@latest"', 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"'

  # 5. Replace the old script block entirely
  $content = [regex]::Replace($content, '(?s)<script src="\.\./assets/js/main\.js"></script>.*?</body>', $standardScripts.Trim() + "`n</body>")

  # 6. Add OG tags after description meta if not already present
  if ($content -notmatch 'property="og:image"') {
    $content = $content -replace '(<meta name="description"[^>]+>)', "`$1`n$ogBlock"
  }

  # 7. Fix page-banner: add background image style if it only has bg-primary color
  # (CSS handles this now via .page-banner class)

  # 8. Fix FAQ toggle arrow class for CSS rotation animation
  $content = $content -replace 'class="faq-toggle"', 'class="faq-toggle"'

  [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
  Write-Host "Updated: $page"
}

Write-Host "`nAll pages updated successfully."
