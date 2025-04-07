/* Theme Switcher for Windows 98 Portfolio
 * Save this file as 'theme-switcher.js' in your project folder
 */

// Theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initTheme();
    
    // Add theme selector to the page
    addThemeSelector();
});

// Initialize theme from localStorage or default
function initTheme() {
    // Check if a theme is saved in localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
        // Apply saved theme
        document.body.className = savedTheme;
    }
    // Default is Windows 98 (no class needed)
}

// Add theme selector dropdown to the page
function addThemeSelector() {
    // Create theme selector container
    const selectorContainer = document.createElement('div');
    selectorContainer.className = 'theme-selector';
    
    // Create label and dropdown
    const selectorHTML = `
        <label for="theme-select">Theme: </label>
        <select id="theme-select">
            <option value="">Windows 98</option>
            <option value="theme-xp">Windows XP</option>
            <option value="theme-dvd">DVD Bounce</option>
        </select>
    `;
    
    selectorContainer.innerHTML = selectorHTML;
    
    // Add selector to the page
    document.body.appendChild(selectorContainer);
    
    // Set the dropdown to the current theme
    const savedTheme = localStorage.getItem('portfolio-theme') || '';
    document.getElementById('theme-select').value = savedTheme;
    
    // Add event listener for theme change
    document.getElementById('theme-select').addEventListener('change', function() {
        // Get selected theme
        const selectedTheme = this.value;
        
        // Remove all theme classes
        document.body.className = '';
        
        // Add selected theme class if not default
        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
        }
        
        // Save theme to localStorage
        localStorage.setItem('portfolio-theme', selectedTheme);
    });
}
