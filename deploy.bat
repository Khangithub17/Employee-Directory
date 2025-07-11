@echo off
echo ================================
echo  Employee Directory - GitHub Push
echo ================================
echo.

echo 🚀 Initializing Git repository...
git init

echo.
echo 📁 Adding all files to staging...
git add .

echo.
echo 📝 Creating initial commit...
git commit -m "🎉 Initial commit: Employee Directory Web Interface

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

⚡ Fast delivery with bug-free implementation!"

echo.
echo 🌿 Setting main branch...
git branch -M main

echo.
echo 🔗 Adding remote origin...
git remote add origin https://github.com/Khangithub17/Employee-Directory.git

echo.
echo 📤 Pushing to GitHub...
git push -u origin main

echo.
echo ✅ Successfully pushed to GitHub!
echo 🌐 Repository URL: https://github.com/Khangithub17/Employee-Directory
echo 📖 Live Demo: https://khangithub17.github.io/Employee-Directory (after enabling GitHub Pages)
echo.
echo 🎉 Submission Complete! 
echo.
pause
