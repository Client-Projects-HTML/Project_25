# remove_page_banners.ps1
$pagesDir = ".\pages"
$files = Get-ChildItem "$pagesDir\*.html"

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
  $before  = $content
  $content = [regex]::Replace($content, '(?s)[\r\n]*<section class="page-banner">.*?</section>', '')
  if ($content -ne $before) {
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
    Write-Host "Removed banner: $($file.Name)"
  } else {
    Write-Host "No banner: $($file.Name)"
  }
}
Write-Host "Complete."
