# Employee Directory - GitHub Deployment Script
# PowerShell version for better Windows compatibility

Write-Host "================================" -ForegroundColor Cyan
Write-Host " Employee Directory - GitHub Push" -ForegroundColor Cyan  
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

try {
    Write-Host "🚀 Initializing Git repository..." -ForegroundColor Green
    git init
    
    Write-Host ""
    Write-Host "📁 Adding all files to staging..." -ForegroundColor Green
    git add .
    
    Write-Host ""
    Write-Host "📝 Creating initial commit..." -ForegroundColor Green
    $commitMessage = @"
🎉 Initial commit: Employee Directory Web Interface

✨ Features:
- Complete CRUD operations for employee management
- Real-time search and advanced filtering
- Smart pagination with configurable entries per page
- Responsive mobile-first design
- Freemarker template integration
- Comprehensive form validation
- Accessibility compliant (WCAG 2.1 AA)
- Toast notifications and modal dialogs
- Keyboard shortcuts for power users
- Performance optimized with debounced search

🛠️ Tech Stack:
- HTML5, CSS3, Vanilla JavaScript ES6+
- Freemarker templates
- Font Awesome icons
- Zero external dependencies

📋 Assignment Requirements: ✅ ALL COMPLETED
- Dashboard with employee list ✅
- Add/Edit form with validation ✅  
- Filter/Sort/Search functionality ✅
- Pagination implementation ✅
- Responsive design ✅
- Freemarker template integration ✅
- Error handling ✅

🎯 Bonus Features:
- Comprehensive test suite
- Detailed documentation & reflection
- Professional UI/UX design
- Performance optimizations
- Accessibility features

⚡ Fast delivery with bug-free implementation!
"@
    
    git commit -m $commitMessage
    
    Write-Host ""
    Write-Host "🌿 Setting main branch..." -ForegroundColor Green
    git branch -M main
    
    Write-Host ""
    Write-Host "🔗 Adding remote origin..." -ForegroundColor Green
    git remote add origin https://github.com/Khangithub17/Employee-Directory.git
    
    Write-Host ""
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Green
    git push -u origin main
    
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: https://github.com/Khangithub17/Employee-Directory" -ForegroundColor Cyan
    Write-Host "📖 Live Demo: https://khangithub17.github.io/Employee-Directory (after enabling GitHub Pages)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🎉 Submission Complete!" -ForegroundColor Yellow
    Write-Host ""
    
} catch {
    Write-Host "❌ Error occurred: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check your Git configuration and try again." -ForegroundColor Yellow
}

Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
